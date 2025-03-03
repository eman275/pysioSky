import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generatePurposeLookupQueryKey } from './contact-us.helpers'
import useClientApi from '@/shared/hooks/use-client-api'

export default function useGetPurposeLookupQuery() {
  const { API } = useClientApi()

  return useAppQuery({
    queryKey: generatePurposeLookupQueryKey(),
    queryFn: async () => {
      const res = await API.get('/api/lookups/contact-purpose')
      return res.data
    },
  })
}
