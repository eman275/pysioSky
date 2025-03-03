import useClientApi from '@/shared/hooks/use-client-api'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generatePurchasedPoliciesVehicleListQueryKey } from './user-account.helpers'
import { PoliciesVehicleType } from './types'

export type PurchasedPoliciesVehiclesListResponse = {
  tplVehiclesCount: number
  compVehiclesCount: number
  totalVehicleCount: number
  tplVehicles: PoliciesVehicleType[]
  compVehicles: PoliciesVehicleType[]

  correlationId: string
}

type QueryPurchasedPoliciesResponseVehiclesListPayload = {
  policyReference: string
  correlationId: string | undefined
}

export const useGetPurchasedPoliciesResponseVehiclesListQuery = (
  payload?: QueryPurchasedPoliciesResponseVehiclesListPayload
) => {
  const { API } = useClientApi()

  const params = generateQueryString([
    { key: 'PolicyReference', value: payload?.policyReference },
    { key: 'CorrelationId', value: payload?.correlationId },
  ])

  const getPurchasedPoliciesResponseVehicleListRequest = async () => {
    const response = await API.get<PurchasedPoliciesVehiclesListResponse>(
      `/api/dashboard/policy-vehicles/${params}`
    )
    return response.data
  }

  const query = useAppQuery({
    queryKey: generatePurchasedPoliciesVehicleListQueryKey(
      payload?.policyReference
    ),
    queryFn: getPurchasedPoliciesResponseVehicleListRequest,
  })

  return query
}
