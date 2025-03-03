import useClientApi from '@/shared/hooks/use-client-api'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generateQuotesExpirationQueryKey } from './quotations.helpers'
import useAppParam from '@/shared/hooks/use-app-params'

export type GetQuoteExpirationResponse = {
  expiresInSeconds: number
}

export const useGetQuoteExpirationQuery = () => {
  const { API } = useClientApi()
  const { quoteRequestReference } = useAppParam()

  const quotesExpirationRequest = async () => {
    const response = await API.get<GetQuoteExpirationResponse>(
      `/api/quotes/expiration/${quoteRequestReference}`
    )
    return response.data
  }

  return useAppQuery({
    queryKey: generateQuotesExpirationQueryKey(quoteRequestReference),
    queryFn: quotesExpirationRequest,
    retry: 1,
  })
}
