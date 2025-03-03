import QuoteHeader from '@/features/quotations/components/shared-components/quote-header'
import useSingleQuoteStore from '@/features/quotations/quotes-list/hooks/use-single-quote-store'
import { cn, formatDate, formatThousandsSeparators } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'

const PolicyDetailTab = () => {
  const t = useScopedI18n('application.quotations')
  const tTab = useScopedI18n('application.paymentDetails')
  const tUnit = useScopedI18n('common.units')
  const {
    compCount,
    tplCount,
    insuranceCompany,
    policyEffectiveDate,
    policyExpiryDate,
    totalCompTaxableAmount,
    totalTplTaxableAmount,
    totalDeductibleAmount,
    totalCompVatAmount,
    totalTplVatAmount,
  } = useSingleQuoteStore(
    ({
      compCount,
      tplCount,
      insuranceCompany,
      policyEffectiveDate,
      policyExpiryDate,
      totalCompTaxableAmount,
      totalTplTaxableAmount,
      totalDeductibleAmount,
      totalTplVatAmount,
      totalCompVatAmount,
    }) => ({
      compCount,
      tplCount,
      insuranceCompany,
      policyEffectiveDate,
      policyExpiryDate,
      totalCompTaxableAmount,
      totalTplTaxableAmount,
      totalDeductibleAmount,
      totalTplVatAmount,
      totalCompVatAmount,
    })
  )

  const policyDetailsInfo = [
    ...(compCount
      ? [
          {
            title: t('vehicles_comp', { total: compCount || 0 }),
            value: totalCompTaxableAmount + totalCompVatAmount,
          },
        ]
      : []),

    ...(tplCount
      ? [
          {
            title: t('vehicles_tpl', { total: tplCount || 0 }),
            value: totalTplTaxableAmount + totalTplVatAmount,
          },
        ]
      : []),
    {
      title: tTab('policy_total_price'),
      value: totalDeductibleAmount,
    },
  ]

  const gridColumns =
    policyDetailsInfo.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'

  return (
    <div>
      <div className='mb-4 flex flex-col justify-between lg:flex-row'>
        {insuranceCompany && (
          <QuoteHeader company={insuranceCompany} isSubtitle={false} />
        )}
        <div className='lg: mt-3 flex flex-row justify-between text-end lg:mt-0 lg:flex-col lg:justify-normal'>
          <p className='text-xs'>
            {tTab('policy_effective_date')}
            <span className='text-sm font-bold text-success-6'>
              {policyEffectiveDate &&
                formatDate(new Date(policyEffectiveDate), 'forClient')}
            </span>
          </p>
          <p className='text-xs'>
            {tTab('till_date')}
            <span className='text-sm font-bold text-error-6'>
              {policyExpiryDate &&
                formatDate(new Date(policyExpiryDate), 'forClient')}
            </span>
          </p>
        </div>
      </div>
      <div className={cn('grid grid-cols-2 gap-6', gridColumns)}>
        {policyDetailsInfo?.map(({ title, value }, index) => (
          <div
            className='flex flex-col items-center justify-center rounded-lg border border-neutral-2 p-3'
            key={index}
          >
            <p className='text-sm text-neutral-5'>{title}</p>
            <p className='text-sm text-base-black'>
              {formatThousandsSeparators(value, true)} {tUnit('SAR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PolicyDetailTab
