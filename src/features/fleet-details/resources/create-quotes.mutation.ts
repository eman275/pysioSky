import { generateCreateQuotesMutationKey } from '@/features/quotations/quotes-list/resources/quotations.helpers'
import useClientApi from '@/shared/hooks/use-client-api'
import { ERROR_CODES } from '@/shared/lib/constants'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import useFleetListStore from '../fleet-list/hooks/use-fleet-list-store'
import useAppParam from '@/shared/hooks/use-app-params'

export type CreateQuotesResponse = {
  quoteRequestReference: string
  canStream: boolean
  canStreamForSeconds: number
  canStreamUntil: string
  correlationId: string
  createdOn: string
  errors: null
  expiresInMinutes: number
  expiresOn: string
  isNewRequest: boolean
  status: boolean
  quoteRequestCode: string
}

export type CreateQuotesPayload = {
  forceNew?: boolean
  deleteActiveQuotes?: boolean
  getExistingQuote?: boolean
}

export const useCreateQuotesMutation = () => {
  const { API } = useClientApi()
  const { applicationReference, correlationId } = useAppParam()
  const { setActiveContent, toggleDialog } = useFleetListStore()
  const createQuotesRequest = async (payload: CreateQuotesPayload) => {
    return await API.post<CreateQuotesResponse>(`/api/quotes`, {
      ...payload,
      applicationReference,
      correlationId,
    })
  }

  return useAppMutation({
    mutationKey: generateCreateQuotesMutationKey(),
    mutationFn: createQuotesRequest,

    onError(e) {
      if (
        e.response?.data.errorCode ===
        String(ERROR_CODES.ACTIVE_QUOTE_LIST_EXISTS)
      ) {
        setActiveContent('previous-quote-list-exist')
        toggleDialog(true)
      }
    },
  })
}
