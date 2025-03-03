import useClientApi from '@/shared/hooks/use-client-api'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generateGetPoliciesQueryKey } from './policies.helpers'
import useAppParam from '@/shared/hooks/use-app-params'
import { PolicyDetails } from './policy.types'

export type PoliciesResponse = {
  details: PolicyDetails
  correlationId: string
}

export const usePolicyQuery = () => {
  const { API } = useClientApi()
  const { refId } = useAppParam()

  const payload = {
    invoiceReference: refId,
  }

  const getPolicyDataRequest = async () => {
    const response = await API.post<PoliciesResponse>('/api/policies', payload)
    return response.data
  }

  return useAppQuery({
    queryKey: generateGetPoliciesQueryKey(refId),
    queryFn: getPolicyDataRequest,
  })
}
