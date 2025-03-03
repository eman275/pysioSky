import React from 'react'
import { useScopedI18n } from '@/shared/locales/client'
import PurchasedPoliciesStatus from './purchased-policies-status'
import { formatDate, formatThousandsSeparators } from '@/shared/lib/utils'

export type PurchasedPoliciesProps = {
  effectiveDate: string
  expiryDate: string
  totalAmount: number
  status: number
}

const PurchasedPoliciesInfo = ({
  effectiveDate,
  expiryDate,
  totalAmount,
  status,
}: PurchasedPoliciesProps) => {
  const t = useScopedI18n('userAccount.userAccount')
  const tUnits = useScopedI18n('common.units')

  const effectiveDateFormat = formatDate(new Date(effectiveDate), 'forClient')
  const endDate = formatDate(new Date(expiryDate), 'forClient')

  const totalAmountFormat = formatThousandsSeparators(totalAmount)

  return (
    <div className='flex flex-col  justify-between bg-neutral-1 lg:flex-row lg:items-center  '>
      <div className='grid grid-cols-2  gap-3 p-2 lg:grid-cols-3 lg:gap-6'>
        <div>
          <p className=' text-xs text-neutral-5'>{t('effective_date')}</p>
          <p className='text-xs font-bold '>{effectiveDateFormat}</p>
        </div>
        <div>
          <p className=' text-xs text-neutral-5'>{t('end_date')}</p>
          <p className='text-xs font-bold '>{endDate}</p>
        </div>

        <div>
          <p className=' text-xs text-neutral-5'>{t('policy_price')}</p>
          <p className='text-xs font-bold '>
            {totalAmountFormat}
            {tUnits('SAR')}
          </p>
        </div>
      </div>
      <PurchasedPoliciesStatus status={status} />
    </div>
  )
}

export default PurchasedPoliciesInfo
