'use client'
import PageRecoverState from '@/shared/ui-states/page-recover-state'
import useGetQuoteQuery from '../quotes-list/resources/use-get-quote.query'
import QuoteRequestLoader from '../quotes-list/components/quote-request-loader'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import { useScopedI18n } from '@/shared/locales/client'
import useDisclosure from '@/shared/hooks/use-disclosure'
import RasanInformation from '../quotes-list/components/rasan-information'
import VehicleCustomizationSection from './components/vehicle-customization-section'
import PolicySummaryCard from './components/policy-summary-card'
import PolicySummaryDrop from './components/policy-summary-drop'
import PolicySummaryActions from './components/policy-summary-actions'
import ResetCustomizationModal from '../components/shared-components/reset-customization-modal'

const QuoteCustomizationPage = () => {
  const { isLoading, refetch, isRefetching, isError, isSuccess } =
    useGetQuoteQuery()

  const { isXL } = useScreenSize()
  const t = useScopedI18n('application.quotations')
  const { isOpened, setIsOpened } = useDisclosure()
  const resetHandler = () => {
    setIsOpened(false)
  }

  if (isError)
    return (
      <PageRecoverState
        description='Failed to load quote details'
        title='Something went wrong'
        retry={refetch}
        isLoading={isRefetching}
      />
    )

  if (isLoading) {
    return (
      <section className='pb-14 pt-0'>
        <QuoteRequestLoader />
      </section>
    )
  }

  return (
    isSuccess && (
      <section className='mb-28'>
        <RasanInformation />
        <p className='mb-3 text-lg font-bold'>{t('vehicles_customization')}</p>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-[1fr,340px]'>
          <VehicleCustomizationSection />
          {isXL && <PolicySummaryCard />}
          {!isXL && <PolicySummaryDrop />}
        </div>
        {isXL && <PolicySummaryActions />}

        <ResetCustomizationModal
          isOpened={isOpened}
          setIsOpened={resetHandler}
        />
      </section>
    )
  )
}

export default QuoteCustomizationPage
