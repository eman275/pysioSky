import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'
import { VehicleDetailsType } from '../../resources/types'

type PolicyDetailsTabIContentProps = {
  tplDetails: VehicleDetailsType | null
  compDetails: VehicleDetailsType | null
}

const PolicyDetailsTabIContent = (props: PolicyDetailsTabIContentProps) => {
  const { compDetails, tplDetails } = props

  const t = useScopedI18n('userAccount.userAccount')
  const tUnit = useScopedI18n('common.units')

  const tplPolicyDetailsTabIContentList = [
    {
      title: `${tplDetails?.vehicleCount} ${t(
        'available_quotes.vehicles'
      )}- ${t('available_quotes.tpl')} `,
      value: `${tplDetails?.totalAmount} ${tUnit('SAR')}`,
    },
    { title: t('policy_number'), value: tplDetails?.policyNumber },
    { title: t('quote_reference_num'), value: tplDetails?.quoteReferenceNo },
  ]

  const comPolicyDetailsTabIContentList = [
    {
      title: `${compDetails?.vehicleCount} ${t(
        'available_quotes.vehicles'
      )}- ${t('available_quotes.comp')} `,
      value: `${compDetails?.totalAmount} ${tUnit('SAR')}`,
    },
    { title: t('policy_number'), value: compDetails?.policyNumber },
    { title: t('quote_reference_num'), value: compDetails?.quoteReferenceNo },
  ]

  return (
    <div>
      {tplDetails && (
        <div className='mb-4 grid grid-cols-2 gap-3  rounded-lg   bg-neutral-1 p-4 lg:grid-cols-3 lg:gap-12'>
          {tplPolicyDetailsTabIContentList.map((item, index) => {
            return (
              <div key={index}>
                <p className='text-base text-neutral-5'>{item.title}</p>
                <p className='text-base'>{item.value}</p>
              </div>
            )
          })}
        </div>
      )}

      {compDetails && (
        <div className=' grid grid-cols-2 gap-3  rounded-lg   bg-neutral-1 p-4 lg:grid-cols-3 lg:gap-12'>
          {comPolicyDetailsTabIContentList.map((item, index) => {
            return (
              <div key={index}>
                <p className='text-base text-neutral-5'>{item.title}</p>
                <p className='text-base'>{item.value}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PolicyDetailsTabIContent
