import useClientApi from '@/shared/hooks/use-client-api'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generateQuotesQueryKey } from './quotations.helpers'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import { QuotesStreamData } from '../../resources/quotation.types'

export type GetQuotesPayload = {
  quoteRequestReference: string
  enabled?: boolean
}

const normalizeData = (data: QuotesStreamData[]) => {
  return data.reduce(
    (acc, item) => {
      acc[item.reference] = item
      return acc
    },
    {} as Record<string, QuotesStreamData>
  )
}

export const useGetQuotesQuery = ({
  quoteRequestReference,
  enabled = true,
}: GetQuotesPayload) => {
  const { API } = useClientApi()
  const params = generateQueryString([
    { key: 'quoteRequestReference', value: quoteRequestReference },
  ])

  const quotesGetRequest = async () => {
    const response = await API.get<QuotesStreamData[]>(`/api/quotes${params}`)
    return { data: normalizeData(response.data) }
  }

  return useAppQuery({
    queryKey: generateQuotesQueryKey(quoteRequestReference),
    queryFn: quotesGetRequest,
    enabled: !enabled,
  })
}
