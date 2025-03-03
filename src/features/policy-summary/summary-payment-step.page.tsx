'use client'
import React, { useRef } from 'react'
import { Card, CardContent } from '@/shared/components/ui/card'
import PolicySummary from './policy-summary'
import StepNextButton from '@/shared/components/ui/step-next-button'
import PaymentSummaryCard from './components/payment-summary-card'
import PaymentSummaryCardMobile from './components/payment-summary-card-mobile'
import { useScopedI18n } from '@/shared/locales/client'
import PaymentSection from './components/payment-section'
import useGetQuoteQuery from '../quotations/quotes-list/resources/use-get-quote.query'
import PageRecoverState from '@/shared/ui-states/page-recover-state'
import PolicySummarySkeleton from './policy-summary-skeleton'
import FailedAlert from '@/shared/components/ui/failed-alert'
import AlertTriangle from '@/shared/components/icons/alert-triangle-filled.svg'
import useClientQueryString from '@/shared/hooks/use-client-query-string'

const SummaryPaymentStepPage = () => {
  const t = useScopedI18n('application.paymentDetails')
  const formRef = useRef<HTMLButtonElement | null>(null)
  const { isLoading, refetch, isRefetching, isError, isSuccess } =
    useGetQuoteQuery()
  const handleNextStep = () => {
    formRef?.current?.click()
  }

  const clientQs = useClientQueryString()
  const paymentRef = clientQs.getByKey('status')

  if (isError)
    return (
      <PageRecoverState
        title='Something went wrong'
        retry={refetch}
        isLoading={isRefetching}
      />
    )

  if (isLoading) {
    return <PolicySummarySkeleton />
  }

  return (
    isSuccess && (
      <div>
        <div className='flex gap-6'>
          <div className='w-full lg:w-3/4'>
            {paymentRef && (
              <div className='mb-6'>
                <FailedAlert
                  description={t('payment_failed')}
                  startIcon={<AlertTriangle />}
                />
              </div>
            )}
            <p className='mb-3 text-lg font-bold'>
              {t('summary.policy_summary')}
            </p>
            <Card className='mb-6 w-full p-0 px-4 pb-4 pt-1'>
              <CardContent>
                <PolicySummary />
              </CardContent>
            </Card>

            <PaymentSection ref={formRef} />
          </div>
          <div className='hidden w-1/4 lg:block'>
            <PaymentSummaryCard />
          </div>
        </div>
        <div className='mt-8 hidden border-t border-neutral-3 lg:block '></div>
        <PaymentSummaryCardMobile onClick={handleNextStep} />

        <StepNextButton
          label={t('proceed_to_payment')}
          className='mb-16 mt-6 hidden lg:flex'
          onClick={handleNextStep}
        />
      </div>
    )
  )
}

export default SummaryPaymentStepPage
