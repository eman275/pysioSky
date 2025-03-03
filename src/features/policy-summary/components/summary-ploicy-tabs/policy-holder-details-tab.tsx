import useAppParam from '@/shared/hooks/use-app-params'
import { useScopedI18n } from '@/shared/locales/client'
import { useCrNumberQuery } from '@/shared/resources/application/cr-number.mutation'
import React from 'react'
import CompanyAddressDetails from '../../../../shared/components/layout/company-address-details/company-address-details'

const PolicyHolderDetailsTab = () => {
  const t = useScopedI18n('application.paymentDetails.policy_holder_details')
  const { crNumber } = useAppParam()
  const { data } = useCrNumberQuery({ crNumber })
  const {
    crNumber: companyNumber,
    name,
    expiryDate,
    entityAddress,
  } = data || {}
  return (
    <div className='rounded-lg border border-neutral-2 px-3 py-4'>
      <div className='flex items-center justify-between '>
        <p className='text-xs'>{t('company_name')}</p>
        <p className='text-xs'>{name}</p>
      </div>
      <div className='my-2 border-b border-neutral-2'></div>
      <div className='flex items-center justify-between '>
        <p className='text-xs '>{t('cr_number')}</p>
        <p className='text-xs '>{companyNumber}</p>
      </div>
      <div className='my-2 border-b border-neutral-2'></div>
      <div className='flex items-center justify-between '>
        <p className='text-xs '>{t('cr_expiry_date')}</p>
        <p className='text-xs '>{expiryDate}</p>
      </div>
      <div className='my-2 border-b border-neutral-2'></div>
      <CompanyAddressDetails addressDetails={entityAddress} type='payment' />
    </div>
  )
}

export default PolicyHolderDetailsTab
