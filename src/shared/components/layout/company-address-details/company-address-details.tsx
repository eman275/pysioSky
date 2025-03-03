import React from 'react'
import { EntityAddressDetails } from '@/shared/resources/application/cr-number.mutation'
import { useScopedI18n } from '@/shared/locales/client'
import { cn } from '@/shared/lib/utils'

type Props = {
  addressDetails: EntityAddressDetails | null | undefined
  type: 'policy' | 'payment'
}

const CompanyAddressDetails = ({ addressDetails, type }: Props) => {
  const t = useScopedI18n(
    'application.paymentDetails.policy_holder_details.company_address'
  )
  const { buildingNumber, street, district, city, postCode, additionalNumber } =
    addressDetails || {}

  const addressFields = [
    { label: t('building_number'), key: buildingNumber },
    { label: t('street'), key: street },
    { label: t('district'), key: district },
    { label: t('city'), key: city },
    { label: t('post_code'), key: postCode },
    { label: t('additional_number'), key: additionalNumber },
  ]

  return (
    <div className='flex flex-col gap-2'>
      <p
        className={cn(
          'text-xs',
          type === 'policy' ? 'text-neutral-5' : 'black'
        )}
      >
        {t('title')}
      </p>
      <div className='grid grid-cols-2 gap-4 bg-neutral-1 lg:grid-cols-6'>
        {addressFields.map(({ label, key }, index) => (
          <div key={index} className='flex flex-col justify-start'>
            <p className='text-xs font-bold'>{label}</p>
            <p className='text-xs'>{key?.trim() ? key : '-'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyAddressDetails
