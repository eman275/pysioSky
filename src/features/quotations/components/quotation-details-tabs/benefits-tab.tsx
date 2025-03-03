import React from 'react'
import PolicyPremiumFeatures from '../../quotes-list/components/policy-premium-features'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store'

const BenefitsTab = () => {
  const { isModified, tplFeatures, compFeatures, compCount, tplCount } =
    useSingleQuoteStore(
      ({ isModified, tplFeatures, compFeatures, compCount, tplCount }) => ({
        isModified,
        tplFeatures,
        compFeatures,
        compCount,
        tplCount,
      })
    )

  return (
    <>
      <PolicyPremiumFeatures
        tplFeatures={tplFeatures}
        compFeatures={compFeatures}
        compVehicleNumber={compCount}
        tplVehicleNumber={tplCount}
        isModified={isModified}
      />
    </>
  )
}

export default BenefitsTab
