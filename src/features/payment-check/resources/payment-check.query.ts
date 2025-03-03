import useClientApi from '@/shared/hooks/use-client-api'
import { generatePaymentCheckQueryKey } from './payment-check.helpers'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'

export type PaymentCheckResponse = {
  invoiceReference: string
  status: number
  isPending: boolean
  isSuccessful: boolean
  isFailed: boolean
  applicationReference: string
  entityReference: string
  entityCrNumber: number
  quoteRequestReference: string
  subQuoteRequestReference: string
  correlationId: string
}

export const usePaymentCheckQuery = () => {
  const { API } = useClientApi()
  const clientQs = useClientQueryString()
  const paymentReference = clientQs.getByKey('refId') as string

  const payload = {
    invoiceReference: paymentReference,
  }

  const paymentCheckRequest = async () => {
    const response = await API.post<PaymentCheckResponse>(
      '/api/payments/status',
      payload
    )
    return response.data
  }

  return useAppQuery({
    queryKey: generatePaymentCheckQueryKey(paymentReference),
    queryFn: paymentCheckRequest,
  })
}
