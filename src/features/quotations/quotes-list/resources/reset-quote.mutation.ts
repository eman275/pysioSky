import useClientApi from '@/shared/hooks/use-client-api'
import { useMutation } from '@tanstack/react-query'
import { generateResetQuoteMutationKey } from './quotations.helpers'

export type QuoteResetPayload = {
  subQuoteResponseReference: string
  correlationId: string
}

export const useQuoteResetMutation = () => {
  const { API } = useClientApi()

  const quoteResetRequest = async (payload: QuoteResetPayload) => {
    const response = await API.put('/api/quotes/reset', payload)
    return response.data
  }

  return useMutation({
    mutationKey: generateResetQuoteMutationKey(),
    mutationFn: quoteResetRequest,
  })
}
