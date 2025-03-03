'use client'
import { Card } from '@/shared/components/ui/card'
import PrintIcon from '@/shared/components/icons/print-payment.svg'
import { useScopedI18n } from '@/shared/locales/client'
import PaymentHeader from './payment-header'
import PolicyAction from '../policy-section/policy-actions'
import PaymentReference from './payment-reference'
import PaymentDetailsCard from './payment-details-card'
import { usePolicyQuery } from '../../resources/policies.query'
import { formatThousandsSeparators } from '@/shared/lib/utils'
import { useFilePrint } from '../../../../shared/hooks/use-file-print'

export type PaymentDetail = {
  title: string
  value: string
}
type Props = {
  refId: string
}

const ThankYouPaymentDetails = ({ refId }: Props) => {
  const t = useScopedI18n('thank-you.payment_section')
  const { data } = usePolicyQuery()
  const { printHandler, isFetching } = useFilePrint(refId)
  const details = data?.details
  if (!details) return null

  const { payment } = details
  const paymentDetails: PaymentDetail[] = [
    {
      title: t('details_card.policy_price'),
      value: `SAR ${formatThousandsSeparators(details.taxableAmount)}`,
    },
    {
      title: t('details_card.policy_price_vat', { vat: details.vatPercentage }),
      value: `SAR ${formatThousandsSeparators(details.vatAmount)}`,
    },
    {
      title: t('details_card.policy_price_grand_total'),
      value: `SAR ${formatThousandsSeparators(details.totalAmount)}`,
    },
  ]

  return (
    <Card className='flex w-full flex-col gap-6 p-4'>
      <div className='flex items-center justify-between gap-2'>
        <PaymentHeader url={payment.method.imageUrl} title={t('title')} />
        <PolicyAction
          icon={<PrintIcon />}
          title={t('print_btn')}
          onClick={printHandler}
          isLoading={isFetching}
        />
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <PaymentReference
          referenceNo={payment.merchantTransactionId}
          title={t('payment_reference')}
        />
        <PaymentDetailsCard paymentDetails={paymentDetails} />
      </div>
    </Card>
  )
}

export default ThankYouPaymentDetails
