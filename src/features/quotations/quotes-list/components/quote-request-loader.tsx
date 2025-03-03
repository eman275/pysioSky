import { Spinner } from '@/shared/components/ui/loader/spinner'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'

const QuoteRequestLoader = () => {
  const t = useScopedI18n('application.quotations')

  return (
    <div className=' mt-10  flex flex-col items-center justify-center rounded-md border py-64'>
      <Spinner />
      <p className='text-sm font-bold'>
        {t('title.title')}
        <span className='text-primary-6'>{t('title.sub_title')}</span>
      </p>
    </div>
  )
}

export default QuoteRequestLoader
