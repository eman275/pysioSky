'use client'
import { Card } from '@/shared/components/ui/card'
import { useScopedI18n } from '@/shared/locales/client'
import { usePaymentCheckQuery } from './resources/payment-check.query'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
const PaymentCheckPage = () => {
  const t = useScopedI18n('application.paymentDetails')
  const tWords = useScopedI18n('common.words')
  const router = useRouter()
  const { data } = usePaymentCheckQuery()

  useEffect(() => {
    if (data?.isSuccessful) {
      router.push(
        generateAppPath({
          invoiceReference: data.invoiceReference,
        }).POLICY_SUCCESS
      )
    }
    if (data?.isFailed) {
      router.push(
        generateAppPath({
          crNumber: String(data.entityCrNumber),
          entityReference: data.entityReference,
          applicationReference: data.applicationReference,
          quoteRequestReference: data.quoteRequestReference,
          quoteReference: data.subQuoteRequestReference,
          correlationId: data.correlationId,
          paymentStatus: true,
        }).POLICY_SUMMARY_URL
      )
    }
  }, [data, router])

  return (
    <Card className='flex-center h-[400px] max-h-dvh w-full flex-col text-center'>
      <div className='text-sm font-bold'>
        {t('payment_processing')}
        {', '}
        <span className='animate-pulse text-sm font-bold text-primary-6'>
          {tWords('please_wait')}
        </span>
      </div>
    </Card>
  )
}

export default PaymentCheckPage
