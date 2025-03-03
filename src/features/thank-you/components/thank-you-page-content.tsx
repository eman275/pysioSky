'use client'
import { usePolicyQuery } from '../resources/policies.query'

import PageRecoverState from '@/shared/ui-states/page-recover-state'
import ThankYouStatus from './status-section/thank-you-status'
import ThankYouPaymentDetails from './payment-section/thank-you-payment-details'
import ThankYouPolicyDetails from './policy-section/thank-you-policy-details'
import ThankYouPageSkeleton from './skeletons/thank-you-page-skeleton'
type Props = {
  refId: string
}
const ThankYouPageContent = ({ refId }: Props) => {
  const { data, isError, isRefetching, refetch, isLoading } = usePolicyQuery()

  if (isLoading) return <ThankYouPageSkeleton />

  if (isError)
    return (
      <PageRecoverState
        description='Failed to load Policy'
        title='Something went wrong'
        retry={refetch}
        isLoading={isRefetching}
      />
    )
  return (
    data && (
      <>
        <ThankYouStatus refId={refId} />
        <ThankYouPolicyDetails />
        <ThankYouPaymentDetails refId={refId} />
      </>
    )
  )
}

export default ThankYouPageContent
