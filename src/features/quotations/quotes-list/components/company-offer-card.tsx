import React from 'react'
import CostSectionDetails from '../../components/shared-components/cost-section-details'
import WarningCardAlert from '../../components/shared-components/warning-card-alert'
import PolicyPremiumFeatures from './policy-premium-features'
import DeductiblesContent from './deductibles-content'
import { useScopedI18n } from '@/shared/locales/client'
import CostSectionActions from '../../components/shared-components/cost-section-actions'
import { QuoteDetails } from '../../resources/quotation.types'

type CompanyOfferCardProps = {
  quoteDetail: QuoteDetails
}

const CompanyOfferCard: React.FC<CompanyOfferCardProps> = ({ quoteDetail }) => {
  const t = useScopedI18n('application.quotations')

  const {
    vehicleCount: compVehicleCount = 0,
    taxableAmount: compTaxableAmount = 0,
    features: compFeatures = [],
  } = quoteDetail.compDetails || {}

  const {
    vehicleCount: tplVehicleCount = 0,
    taxableAmount: tplTaxableAmount = 0,
    features: tplFeatures = [],
  } = quoteDetail.tplDetails || {}

  const {
    vatPercentage,
    vatAmount,
    originalTotalAmount,
    totalAmount,
    isModified,
    reference,
  } = quoteDetail

  const deductiblesData = [
    {
      title: t('vehicles_comp', { total: compVehicleCount }),
      value: compTaxableAmount,
    },
    {
      title: t('vehicles_tpl', { total: tplVehicleCount }),
      value: tplTaxableAmount,
    },
    {
      title: t('vat', { percentage: vatPercentage * 100 }),
      value: vatAmount,
    },
  ]

  return (
    <>
      {isModified && <WarningCardAlert title='modified' />}
      <div className='flex flex-col justify-between gap-3 p-3 lg:flex-row lg:gap-8'>
        <PolicyPremiumFeatures
          tplVehicleNumber={tplVehicleCount}
          compVehicleNumber={compVehicleCount}
          tplFeatures={tplFeatures}
          compFeatures={compFeatures}
          isModified={isModified}
          isCollapsible
        />
        <div className='my-auto flex w-full flex-col border-t-2 border-dashed border-neutral-3 pt-3 lg:my-0 lg:w-auto lg:flex-row lg:border-l-2 lg:border-t-0 lg:pl-8 lg:pt-0'>
          <CostSectionDetails
            actions={<CostSectionActions subQuoteReference={reference} />}
            subQuoteReference={reference}
            totalDeductibles={totalAmount}
            originalDeductibles={originalTotalAmount}
            isCollapsible
            className='lg:w-[300px]'
          >
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
          </CostSectionDetails>
        </div>
      </div>
    </>
  )
}

export default CompanyOfferCard
