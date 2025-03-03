import React from 'react'
import PurchasedPoliciesTabs from './purchased-policies-tabs'
import DownloadDocuments from './download-documents'

import PurchasedPoliciesHeader from './purchased-policies-header'
import PurchasedPoliciesInfo from './purchased-policies-info'
import { PurchasedPoliciesType } from '../../resources/types'
import { PurchasedPoliciesStatusEnum } from '@/shared/types/user-account-active-tab'

type PurchasedPoliciesProps = {
  purchasedPoliciesInfo: PurchasedPoliciesType
  correlationId: string | undefined
}

const PurchasedPoliciesCard = (props: PurchasedPoliciesProps) => {
  const {
    purchasedPoliciesInfo: {
      insuranceCompany,
      totalVehicleCount,
      effectiveDate,
      expiryDate,
      totalAmount,
      entity,
      compDetails,
      tplDetails,
      isExpired,
      isAcknowledged,
      reference,
    },
    correlationId,
  } = props

  const status = isExpired
    ? PurchasedPoliciesStatusEnum.EXPIRED
    : isAcknowledged
      ? PurchasedPoliciesStatusEnum.ACTIVE
      : PurchasedPoliciesStatusEnum.UNDER_ISSUANCE

  return (
    <div className=' flex w-full flex-col gap-4 rounded-lg border border-neutral-2 p-4 '>
      <PurchasedPoliciesHeader
        insuranceCompanyType={insuranceCompany}
        totalVehicleCount={totalVehicleCount}
        reference={reference}
        correlationId={correlationId}
      />
      <section>
        <PurchasedPoliciesInfo
          effectiveDate={effectiveDate}
          expiryDate={expiryDate}
          totalAmount={totalAmount}
          status={status}
        />
      </section>

      <section>
        <PurchasedPoliciesTabs
          companyDetails={entity}
          compDetails={compDetails}
          tplDetails={tplDetails}
        />
      </section>
      <div className='my-4 border border-dashed'></div>
      <section>
        <DownloadDocuments
          correlationId={correlationId}
          insuranceCompanyId={insuranceCompany?.id}
          quotationDate={effectiveDate}
          policyReference={reference}
        />
      </section>
    </div>
  )
}

export default PurchasedPoliciesCard
