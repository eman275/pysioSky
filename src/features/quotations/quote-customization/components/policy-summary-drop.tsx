'use client'
import { Card } from '@/shared/components/ui/card'
import { useScopedI18n } from '@/shared/locales/client'
import PolicySummaryActions from './policy-summary-actions'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import useDisclosure from '@/shared/hooks/use-disclosure'
import PrimarySummaryArrows from '../../components/shared-components/primary-summary-arrows'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/shared/components/layout/collapsible'
import CollapsibleMotion from '@/shared/components/layout/motion/collapsible-motion'
import PriceResetFlag from '../../components/shared-components/price-reset-flag'
import DeductiblesContent from '../../quotes-list/components/deductibles-content'
import PolicyPremiumFeatures from '../../quotes-list/components/policy-premium-features'
import OriginalPriceContent from '../../components/shared-components/original-price-content'
import PriceDetailsContent from '../../components/shared-components/price-details-content'
import { formatThousandsSeparators } from '@/shared/lib/utils'
import useAppParam from '@/shared/hooks/use-app-params'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store'

const PolicySummaryDrop = () => {
  const t = useScopedI18n('application.quotations')
  const { quoteReference } = useAppParam()
  const {
    vatPercentage,
    compCount,
    tplCount,
    tplFeatures,
    compFeatures,
    isModified,
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

  const isNewPrice =
    formatThousandsSeparators(originalTotalAmount, true) !==
    formatThousandsSeparators(totalDeductibleAmount, true)

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

  const { isOpened, onToggle } = useDisclosure()

  const CollapsibleContentSection = (
    <div className='flex flex-col gap-3'>
      <div className='mt-3'>
        {deductiblesData.map((item, index) => (
          <DeductiblesContent
            color='gray'
            key={index}
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

  const PolicySummaryDropContent = (title?: string) => (
    <Card className='fixed bottom-0 flex h-fit w-full flex-col gap-4 px-4 pb-8 pt-4'>
      <Collapsible open={isOpened} onOpenChange={onToggle}>
        <CollapsibleTrigger className='w-full'>
          <div className='flex flex-row'>
            <div className='flex w-full flex-col gap-4'>
              {<p className='w-fit text-xl font-bold'>{title}</p>}
              {isNewPrice && (
                <OriginalPriceContent totalDeductibles={originalTotalAmount} />
              )}
              <PriceDetailsContent
                isNewPrice={isNewPrice}
                totalDeductibles={totalDeductibleAmount}
              />
            </div>
            <PrimarySummaryArrows isOpened={isOpened} />
          </div>
        </CollapsibleTrigger>
        {isNewPrice && <PriceResetFlag subQuoteReference={quoteReference} />}
        <CollapsibleContent asChild>
          <CollapsibleMotion isOpened={isOpened}>
            {CollapsibleContentSection}
          </CollapsibleMotion>
        </CollapsibleContent>
      </Collapsible>
      <PolicySummaryActions />
    </Card>
  )

  return (
    <div className='fixed inset-x-0 bottom-0 z-20 flex w-full rounded-lg border border-solid border-gray-300 bg-base-white shadow-nextBtn'>
      {!isOpened && PolicySummaryDropContent()}
      <Dialog open={isOpened} onOpenChange={onToggle}>
        <DialogContent
          className={
            'fixed inset-x-0 bottom-0 w-screen p-0 md:rounded-lg md:p-0'
          }
        >
          {PolicySummaryDropContent(t('policy_summary'))}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PolicySummaryDrop
