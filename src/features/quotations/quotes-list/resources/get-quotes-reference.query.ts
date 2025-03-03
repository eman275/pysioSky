import {
  CreateQuotesPayload,
  CreateQuotesResponse,
} from '@/features/fleet-details/resources/create-quotes.mutation'
import { generateCreateQuotesQueryKey } from '@/features/quotations/quotes-list/resources/quotations.helpers'
import useAppParam from '@/shared/hooks/use-app-params'
import useClientApi from '@/shared/hooks/use-client-api'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'

export const useGetQuoteRequestQuery = (payload?: CreateQuotesPayload) => {
  const { API } = useClientApi()
  const { applicationReference, correlationId, quoteRequestReference } =
    useAppParam()
  const createQuotesRequest = async () => {
    const response = await API.post<CreateQuotesResponse>(`/api/quotes`, {
      ...(payload ?? {}),
      correlationId,
      applicationReference,
    })

    return response.data
  }

  return useAppQuery({
    queryKey: generateCreateQuotesQueryKey(quoteRequestReference),
    queryFn: createQuotesRequest,
  })
}
