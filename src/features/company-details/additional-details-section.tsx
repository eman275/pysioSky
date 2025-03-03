import CompanyInfoBar from '@/shared/components/layout/company-info-bar/company-info-bar'
import AdditionalDetailsForm from './additional-details-form'
import LoadCompanyDetailsServerController from '@/shared/components/layout/company-info-bar/load-company-details-server.controller'
import { Suspense } from 'react'
import CompanyDetailsPageSkeleton from './company-details-page-skeleton'

type PageProps = {
  params: {
    crNumber: string
  }
}

async function AdditionDetails(pageProps: PageProps) {
  return (
    <Suspense fallback={<CompanyDetailsPageSkeleton />}>
      <LoadCompanyDetailsServerController crNumber={pageProps.params.crNumber}>
        <CompanyInfoBar />
        <AdditionalDetailsForm />
      </LoadCompanyDetailsServerController>
    </Suspense>
  )
}
export default AdditionDetails
