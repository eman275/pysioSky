import useClientApi from '@/shared/hooks/use-client-api'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import { useQuery } from '@tanstack/react-query'
import { generatePolicyPaperQueryKey } from './user-account.helpers'
import { useCurrentLocale } from '@/shared/locales/client'

export const usePolicyPaperLookUpQuery = (policyReference: string) => {
  const locale = useCurrentLocale()
  const culture = locale == 'en' ? 2 : 1

  const { API } = useClientApi()
  const params = generateQueryString([
    { key: 'policyReference', value: policyReference },
    { key: 'culture', value: culture },
  ])

  const PolicyPaperRequest = async () => {
    const response = await API.get(`/api/download/policy-paper${params}`, {
      headers: {
        accept: 'application/octet-stream',
      },
      responseType: 'blob',
    })

    const filename = 'policy-paper.pdf'

    return { data: response.data, filename }
  }

  return useQuery({
    queryKey: generatePolicyPaperQueryKey(policyReference),
    queryFn: PolicyPaperRequest,
    enabled: false,
  })
}
