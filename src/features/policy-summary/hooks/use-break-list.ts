import useSingleQuoteStore from '@/features/quotations/quotes-list/hooks/use-single-quote-store'
import { formatThousandsSeparators } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'

const useBreakdownsList = () => {
  const t = useScopedI18n('application.paymentDetails.aside')
  const {
    totalCompTaxableAmount,
    totalTplTaxableAmount,
    totalDeductibleAmount,
    vatPercentage,
    totalVatAmount,
  } = useSingleQuoteStore()

  const breakdownsList = [
    {
      breakdownName: t('policy_price_amount'),
      amount: formatThousandsSeparators(totalDeductibleAmount, true),
    },
    {
      breakdownName: t('base_premium'),
      amount: formatThousandsSeparators(
        totalCompTaxableAmount + totalTplTaxableAmount,
        true
      ),
    },
    {
      breakdownName: t('vAT', { percentage: vatPercentage * 100 }),
      amount: formatThousandsSeparators(totalVatAmount, true),
    },
  ]

  return { breakdownsList }
}
export default useBreakdownsList
