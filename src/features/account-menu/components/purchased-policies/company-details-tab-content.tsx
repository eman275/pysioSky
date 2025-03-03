import { cn, formatDate } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'
import { EntityType } from '../../resources/types'
import { Card } from '@/shared/components/ui/card'
import CompanyAddressDetails from '@/shared/components/layout/company-address-details/company-address-details'

type CompanyDetailsTabIContentProps = {
  companyDetails: EntityType
}

const CompanyDetailsTabIContent = (props: CompanyDetailsTabIContentProps) => {
  const {
    companyDetails: { crExpiryDate, crNumber, name, address },
  } = props
  const t = useScopedI18n('userAccount.userAccount')

  const crExpiryDateFormat = formatDate(new Date(crExpiryDate), 'forClient')

  const companyDetailsTabIContentList = [
    { title: t('company_name'), value: name },
    { title: t('cr_number'), value: crNumber },
    { title: t('cr_expiry_date'), value: crExpiryDateFormat },
  ]

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-2 gap-[10px] lg:grid-cols-3'>
        {companyDetailsTabIContentList.map((item, index) => {
          return (
            <div
              key={index}
              className={cn(
                'flex flex-col items-center justify-center rounded-lg border  border-neutral-2 bg-neutral-1 px-4 py-3',
                index === 0 && 'col-span-2 lg:col-span-1'
              )}
            >
              <p className='text-xs text-neutral-5'>{item.title}</p>
              <p className='text-base font-bold '>{item.value}</p>
            </div>
          )
        })}
      </div>
      <Card className='bg-neutral-1'>
        <CompanyAddressDetails addressDetails={address} type='policy' />
      </Card>
    </div>
  )
}

export default CompanyDetailsTabIContent
