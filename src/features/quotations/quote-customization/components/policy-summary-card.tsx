'use client'
import { Card, CardTitle } from '@/shared/components/ui/card'
import { useScopedI18n } from '@/shared/locales/client'
import DeductiblesContent from '../../quotes-list/components/deductibles-content'
import PolicyPremiumFeatures from '../../quotes-list/components/policy-premium-features'
import QuoteHeader from '../../components/shared-components/quote-header'
import CostSectionDetails from '../../components/shared-components/cost-section-details'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store'
import useAppParam from '@/shared/hooks/use-app-params'

const PolicySummaryCard = () => {
  const t = useScopedI18n('application.quotations')
  const { quoteReference } = useAppParam()
  const {
    vatPercentage,
    compCount,
    tplCount,
    tplFeatures,
    compFeatures,
    isModified,
    insuranceCompany,
    originalTotalAmount,
    totalDeductibleAmount,
    totalCompTaxableAmount,
    totalVatAmount,
    totalTplTaxableAmount,
  } = useSingleQuoteStore(
    ({
      vatPercentage,
      compCount,
      tplCount,
      tplFeatures,
      compFeatures,
      isModified,
      insuranceCompany,
      originalTotalAmount,
      totalDeductibleAmount,
      totalCompTaxableAmount,
      totalVatAmount,
      totalTplTaxableAmount,
    }) => ({
      vatPercentage,
      compCount,
      tplCount,
      tplFeatures,
      compFeatures,
      isModified,
      insuranceCompany,
      originalTotalAmount,
      totalDeductibleAmount,
      totalCompTaxableAmount,
      totalVatAmount,
      totalTplTaxableAmount,
    })
  )

  const deductiblesData = [
    {
      title: t('vehicles_comp', { total: compCount }),
      value: totalCompTaxableAmount,
    },
    {
      title: t('vehicles_tpl', { total: tplCount }),
      value: totalTplTaxableAmount,
    },
    {
      title: t('vat', { percentage: vatPercentage * 100 }),
      value: totalVatAmount,
    },
  ]

  const CollapsibleContent = (
    <div className='flex flex-col gap-4'>
      <div className='mt-3'>
        {deductiblesData.map((item, index) => (
          <DeductiblesContent
            key={index}
            color='gray'
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
      <div className='w-full border border-neutral-2'></div>
      <PolicyPremiumFeatures
        tplFeatures={tplFeatures}
        compFeatures={compFeatures}
        compVehicleNumber={compCount}
        tplVehicleNumber={tplCount}
        isTitle
        isModified={isModified}
      />
    </div>
  )

  return (
    <div className='fixed inset-x-0 bottom-0 z-10 flex w-full rounded-lg border border-solid border-gray-300 bg-base-white shadow-nextBtn xl:relative xl:h-auto xl:items-start xl:justify-end xl:border-none xl:bg-transparent xl:px-0 xl:shadow-none'>
      <Card className='flex h-fit w-full flex-col gap-4 px-4 pb-8 pt-4 xl:w-[340px]'>
        <CardTitle className='m-0 flex justify-between'>
          <p className='w-fit text-xxl font-bold'>{t('policy_summary')}</p>
        </CardTitle>
        {insuranceCompany && <QuoteHeader company={insuranceCompany} />}

        {originalTotalAmount > 0 && (
          <CostSectionDetails
            subQuoteReference={quoteReference}
            originalDeductibles={originalTotalAmount}
            totalDeductibles={totalDeductibleAmount}
            className='xl:w-[300px]'
            isCollapsible={false}
          >
            {CollapsibleContent}
          </CostSectionDetails>
        )}
      </Card>
    </div>
  )
}

export default PolicySummaryCard
