import useClientApi from '@/shared/hooks/use-client-api'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import { useMutation } from '@tanstack/react-query'
import { generateTermsAndConditionsMutationKey } from './user-account.helpers'

export type TermsAndConditionsResponse = {
  url: string
}

export const useTermsAndConditionsLookUpMutation = (
  insuranceCompanyId: number,
  correlationId: string | undefined,
  quotationDate: string
) => {
  const { API } = useClientApi()
  const params = generateQueryString([
    { key: 'InsuranceCompanyId', value: insuranceCompanyId },
    { key: 'CorrelationId', value: correlationId },
    { key: 'QuotationDate', value: quotationDate },
  ])

  const TermsAndConditionsRequest = async () => {
    const response = await API.get<TermsAndConditionsResponse>(
      `/api/download/terms-and-conditions${params}`
    )
    return response.data
  }

  return useMutation({
    mutationKey: generateTermsAndConditionsMutationKey(insuranceCompanyId),
    mutationFn: TermsAndConditionsRequest,
  })
}
