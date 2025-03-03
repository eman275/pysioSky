import { QueryClient, dehydrate } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { apiService } from '@/shared/lib/helpers/resources/api.server'
import { PoliciesResponse } from '../resources/policy.types'
import { generateGetPoliciesQueryKey } from '../resources/policies.helpers'

type Props = {
  refId: string
  children: ReactNode
}

export default async function LoadSuccessfulPaymentServerController({
  refId,
  children,
}: Props) {
  const queryClient = new QueryClient()

  const getPolicyDetailsRequest = async () => {
    const data = await apiService.post<PoliciesResponse>({
      endpoint: '/api/policies',
      payload: { invoiceReference: refId },
    })
    return data
  }

  await queryClient.prefetchQuery({
    queryKey: generateGetPoliciesQueryKey(refId),
    queryFn: getPolicyDetailsRequest,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
