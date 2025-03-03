import useAppParam from '@/shared/hooks/use-app-params'
import useClientApi from '@/shared/hooks/use-client-api'
import { FLEET_LIST_PAGE_SIZE } from '@/shared/lib/constants'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { useEffect } from 'react'
import { VehicleItem } from '../fleet-details.types'
import useFleetListStore from '../fleet-list/hooks/use-fleet-list-store'
import { generateVehiclesListQueryKey } from './fleet-details.helpers'
import { MetaData } from './types'

export type VehicleListResponse = {
  applicationReference: string
  items: VehicleItem[]
  metadata: MetaData
  correlationId: string
  totalInvalidVehicles: number
}

export interface ListVehiclesPayload {
  pageIndex?: number
}

export const useGetVehiclesListQuery = (payload?: ListVehiclesPayload) => {
  const { applicationReference } = useAppParam()
  const { setVehiclesList } = useFleetListStore()

  const { pageIndex = 1 } = payload ?? {}

  const { API } = useClientApi()

  const params = generateQueryString([
    { key: 'pageSize', value: FLEET_LIST_PAGE_SIZE },
    { key: 'pageIndex', value: pageIndex },
  ])

  const getVehicleListRequest = async () => {
    const response = await API.get<VehicleListResponse>(
      `/api/application-vehicles/${applicationReference}${params}`
    )
    return response.data
  }

  const query = useAppQuery({
    queryKey: generateVehiclesListQueryKey(pageIndex),
    queryFn: getVehicleListRequest,
  })

  const { data } = query
  const { items, totalInvalidVehicles = 0 } = data ?? {}

  useEffect(() => {
    if (items) {
      setVehiclesList(items, totalInvalidVehicles)
    }
  }, [items, totalInvalidVehicles, setVehiclesList])

  return query
}
