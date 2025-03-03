'use client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'
import { LookupModel } from '../../../fleet-details/fleet-details.types'
import { useGetName } from '@/features/fleet-details/fleet-list/hooks/use-get-options'

type Props = {
  company: LookupModel
  isSubtitle?: boolean
}

const QuoteHeader = ({ company, isSubtitle = true }: Props) => {
  const t = useScopedI18n('application.quotations')
  const companyName = useGetName(company)
  return (
    <div className='flex items-start gap-4 md:items-center'>
      <Avatar className='flex-center flex h-[60px] w-[60px] shrink-0 rounded-lg border border-neutral-2 bg-neutral-1'>
        <AvatarImage src={company.imageUrl} className='object-contain' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className='flex flex-col items-start '>
        <p className='font-bold md:text-lg'>{companyName}</p>
        {isSubtitle && (
          <p className='text-xs font-normal '>{t('fleet_insurance')}</p>
        )}
      </div>
    </div>
  )
}

export default QuoteHeader
