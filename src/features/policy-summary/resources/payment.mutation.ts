import useClientApi from '@/shared/hooks/use-client-api'
import { useMutation } from '@tanstack/react-query'
import { generatePaymentMutationKey } from './payment.helpers'

export type PaymentResponse = {
  paymentUrl: string
}
export type PaymentPayload = {
  quoteRequestReference: string
  subQuoteResponseReference: string
  correlationId: string
  iban: string
  culture: number
}

export const usePaymentMutation = () => {
  const { API } = useClientApi()

  const paymentRequest = async (payload: PaymentPayload) => {
    const response = await API.post<PaymentResponse>('/api/payments', payload)
    return response.data
  }

  return useMutation({
    mutationKey: generatePaymentMutationKey(),
    mutationFn: paymentRequest,
  })
}
