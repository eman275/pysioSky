import useClientApi from '@/shared/hooks/use-client-api'
import { generateTermsAndConditionsMutationKey } from './quotations.helpers'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import { useMutation } from '@tanstack/react-query'

export type TermsAndConditionsResponse = {
  url: string
}

export type TermsAndConditionsPayload = {
  insuranceCompanyId: number
}

export const useTermsAndConditionsLookUpMutation = (
  insuranceCompanyId: number
) => {
  const { API } = useClientApi()
  const params = generateQueryString([
    { key: 'InsuranceCompanyId', value: insuranceCompanyId },
  ])

  const termsAndConditionsRequest = async () => {
    const response = await API.get<TermsAndConditionsResponse>(
      `/api/download/terms-and-conditions${params}`
    )
    return response.data
  }

  return useMutation({
    mutationKey: generateTermsAndConditionsMutationKey(insuranceCompanyId),
    mutationFn: termsAndConditionsRequest,
  })
}
