import useClientApi from '@/shared/hooks/use-client-api'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generatePurchasedPoliciesQueryKey } from './user-account.helpers'
import { MetaData } from '@/features/fleet-details/resources/types'
import { PurchasedPoliciesType } from './types'
import { PURCHASED_POLICIES_PAGE_SIZE } from '@/shared/lib/constants'
import useClientQueryString from '@/shared/hooks/use-client-query-string'

export type PurchasedPoliciesResponse = {
  items: PurchasedPoliciesType[]
  metadata: MetaData
  correlationId: string
}

type QueryPurchasedPoliciesPayload = {
  userId: number
  pageIndex: number
}

export const usePurchasedPoliciesQuery = (
  payload?: QueryPurchasedPoliciesPayload
) => {
  const { API } = useClientApi()
  const clientQs = useClientQueryString()
  const policyStatus = clientQs.getByKey('policy-status')
  const params = generateQueryString([
    { key: 'UserId', value: payload?.userId },
    { key: 'PolicyStatus', value: String(policyStatus) },
    { key: 'PageIndex', value: payload?.pageIndex },
    { key: 'PageSize', value: PURCHASED_POLICIES_PAGE_SIZE },
  ])

  const getPurchasedPoliciesRequest = async () => {
    const response = await API.get<PurchasedPoliciesResponse>(
      `/api/dashboard/policies${params}`
    )
    return response.data
  }

  const query = useAppQuery({
    queryKey: generatePurchasedPoliciesQueryKey(
      payload?.pageIndex,
      String(policyStatus)
    ),
    queryFn: getPurchasedPoliciesRequest,
  })

  return query
}
