import useClientApi from '@/shared/hooks/use-client-api'
import { useMutation } from '@tanstack/react-query'
import { generateQuoteCustomizationMutationKey } from './quote-customization.helpers'
export type CustomizationPayload = {
  vehicles: {
    quoteVehicleReference: string
    selectedDeductibleReference: string
  }[]
  correlationId: string
}
export const useQuoteCustomizationMutation = () => {
  const { API } = useClientApi()

  const quoteCustomizationRequest = async (payload: CustomizationPayload) => {
    const response = await API.put('/api/quotes', payload)
    return response.data
  }

  return useMutation({
    mutationKey: generateQuoteCustomizationMutationKey(),
    mutationFn: quoteCustomizationRequest,
  })
}
