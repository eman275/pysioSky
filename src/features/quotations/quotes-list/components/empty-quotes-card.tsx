'use client'
import React from 'react'
import NoData from '@/shared/components/icons/no-quotes.svg'
import { Card } from '@/shared/components/ui/card'
import { useScopedI18n } from '@/shared/locales/client'

const EmptyQuotesCard = () => {
  const t = useScopedI18n('application.quotations')
  return (
    <Card className='flex h-full min-h-[545px] flex-col place-content-center place-items-center gap-6 p-4'>
      <NoData />
      <div className='flex flex-col items-center gap-[2px]'>
        <p className='text-xs font-bold'>{t('empty_quotes_card.title')}</p>
        <p className='w-[430px] px-4 text-center text-xs text-neutral-5'>
          {t('empty_quotes_card.sub_title')}
        </p>
      </div>
    </Card>
  )
}

export default EmptyQuotesCard
