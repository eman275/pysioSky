import useClientApi from '@/shared/hooks/use-client-api'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generateAvailableQuotesQueryKey } from './user-account.helpers'
import { MetaData } from '@/features/fleet-details/resources/types'
import { AvailableQuoteType } from './types'
import { AVAILABLE_QUOTES_PAGE_SIZE } from '@/shared/lib/constants'

export type AvailableQuotesResponse = {
  items: AvailableQuoteType[]
  metadata: MetaData
  correlationId: string
}

type QueryAvailableQuotesPayload = {
  userId: number
  pageIndex: number
}

export const useAvailableQuotesQuery = (
  payload?: QueryAvailableQuotesPayload
) => {
  const { API } = useClientApi()

  const params = generateQueryString([
    { key: 'UserId', value: payload?.userId },
    { key: 'pageSize', value: AVAILABLE_QUOTES_PAGE_SIZE },
    { key: 'pageIndex', value: payload?.pageIndex },
  ])

  const getAvailableQuotesRequest = async () => {
    const response = await API.get<AvailableQuotesResponse>(
      `/api/dashboard/quotes/${params}`
    )
    return response.data
  }

  const query = useAppQuery({
    queryKey: generateAvailableQuotesQueryKey(payload?.pageIndex),
    queryFn: getAvailableQuotesRequest,
    retry: 3,
  })

  return query
}
