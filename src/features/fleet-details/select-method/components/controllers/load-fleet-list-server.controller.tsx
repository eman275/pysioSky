import { generateVehiclesListQueryKey } from '@/features/fleet-details/resources/fleet-details.helpers'
import { VehicleListResponse } from '@/features/fleet-details/resources/get-vehicles-list'
import { FLEET_LIST_PAGE_SIZE } from '@/shared/lib/constants'
import { apiService } from '@/shared/lib/helpers/resources/api.server'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & Omit<
  {
    applicationReference: string
    pageIndex: number
  },
  'pageSize'
>

export default async function LoadFleetListServerController({
  applicationReference,
  pageIndex,
  children,
}: Props) {
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryKey: generateVehiclesListQueryKey(pageIndex),
    queryFn: () =>
      apiService.get<VehicleListResponse>({
        endpoint: `/api/application-vehicles/${applicationReference}`,
        queries: [
          { key: 'pageSize', value: FLEET_LIST_PAGE_SIZE },
          { key: 'pageIndex', value: pageIndex },
        ],
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
