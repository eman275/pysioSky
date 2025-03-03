import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import RegisteredOwnersSection from './components/registered-owners-section'
import { generateGetCrOwnersQueryKey } from './resources/additional-details.helpers'
import { AppParams } from '@/shared/types/routing.types'
import { apiService } from '@/shared/lib/helpers/resources/api.server'
import { GetCrOwnersResponseContract } from './resources/use-get-cr-owners.query'

type PageProps = {
  params: AppParams
}
export default async function AdditionalDetailsPage(pageProps: PageProps) {
  const { entityId, correlationId } = pageProps.params
  const queryClient = new QueryClient()
  const getCrOwnersRequest = () => {
    return apiService.get<GetCrOwnersResponseContract>({
      endpoint: '/api/entities/cr-owners',
      queries: [
        { key: 'EntityReference', value: entityId },
        { key: 'CorrelationId', value: correlationId },
      ],
    })
  }

  await queryClient.prefetchQuery({
    queryKey: generateGetCrOwnersQueryKey(entityId, correlationId),
    queryFn: getCrOwnersRequest,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RegisteredOwnersSection />
    </HydrationBoundary>
  )
}
