import { QueryClient } from '@tanstack/react-query'
import { generateGetCrNumberDataQueryKey } from './cr-number-details.helpers'
import { apiService } from '@/shared/lib/helpers/resources/api.server'
import { QueryCrNumberResponse } from './cr-number.mutation'

type Args = {
  crNumber: string
}
export default async function prefetchCrDetails({ crNumber }: Args) {
  const queryClient = new QueryClient()
  const getCrDetailsRequest = async () => {
    const data = await apiService.post<QueryCrNumberResponse>({
      endpoint: '/api/entities',
      queries: [{ key: 'crNumber', value: crNumber }],
    })
    return {
      ...data,
      crNumber,
    }
  }

  await queryClient.prefetchQuery({
    queryKey: generateGetCrNumberDataQueryKey(crNumber as string),
    queryFn: getCrDetailsRequest,
  })
  return { queryClient }
}
