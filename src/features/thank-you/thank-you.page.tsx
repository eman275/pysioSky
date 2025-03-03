import { Suspense } from 'react'
import ThankYouPageSkeleton from './components/skeletons/thank-you-page-skeleton'
import ThankYouPageContent from './components/thank-you-page-content'
import LoadSuccessfulPaymentServerController from './controllers/LoadSuccessfulPaymentServerController'

type PageProps = {
  params: {
    refId: string
  }
}

export default async function ThankYouPage({ params: { refId } }: PageProps) {
  return (
    <Suspense fallback={<ThankYouPageSkeleton />}>
      <LoadSuccessfulPaymentServerController refId={refId}>
        <ThankYouPageContent refId={refId} />
      </LoadSuccessfulPaymentServerController>
    </Suspense>
  )
}
