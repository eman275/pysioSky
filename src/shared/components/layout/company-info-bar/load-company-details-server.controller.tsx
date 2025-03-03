import { apiService } from '@/shared/lib/helpers/resources/api.server'
import { generateGetCrNumberDataQueryKey } from '@/shared/resources/application/cr-number-details.helpers'
import { QueryCrNumberResponse } from '@/shared/resources/application/cr-number.mutation'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { ReactNode } from 'react'

type Props = {
  crNumber: string
  children: ReactNode
}
export default async function LoadCompanyDetailsServerController({
  crNumber,
  children,
}: Props) {
  const queryClient = new QueryClient()
  const getCrDetailsRequest = async () => {
    const data = await apiService.post<QueryCrNumberResponse>({
      endpoint: '/api/entities',
      queries: [{ key: 'crNumber', value: crNumber }],
      options: {
        next: {
          tags: generateGetCrNumberDataQueryKey(crNumber as string),
        },
      },
    })

    return {
      ...data,
      crNumber,
    }
  }

  await queryClient.prefetchQuery({
    queryKey: generateGetCrNumberDataQueryKey(crNumber as string),
    queryFn: getCrDetailsRequest,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
