import useClientApi from '@/shared/hooks/use-client-api'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import { useQuery } from '@tanstack/react-query'
import { generateReceiptsQueryKey } from './user-account.helpers'
import { useCurrentLocale } from '@/shared/locales/client'

export const useReceiptLookUpQuery = (policyReference: string) => {
  const locale = useCurrentLocale()
  const culture = locale == 'en' ? 2 : 1

  const { API } = useClientApi()
  const params = generateQueryString([
    { key: 'policyReference', value: policyReference },
    { key: 'culture', value: culture },
  ])

  const ReceiptRequest = async () => {
    const response = await API.get(`/api/download/invoice${params}`, {
      headers: {
        accept: 'application/octet-stream',
      },
      responseType: 'blob',
    })

    const filename = 'invoice.pdf'

    return { data: response.data, filename }
  }

  return useQuery({
    queryKey: generateReceiptsQueryKey(policyReference),
    queryFn: ReceiptRequest,
    enabled: false,
  })
}
