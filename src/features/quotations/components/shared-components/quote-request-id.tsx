import React from 'react'
import FileText from '@/shared/components/icons/file-text.svg'
import { useScopedI18n } from '@/shared/locales/client'

type QuoteRequestIdProps = {
  quotesCount: number
  requestId: string | undefined
}

const QuoteRequestId = ({ quotesCount, requestId }: QuoteRequestIdProps) => {
  const t = useScopedI18n('application.quotations')

  return (
    <div className='mb-3 flex items-center justify-between'>
      <p className=' text-lg font-bold text-base-black lg:text-xxl'>
        {t('quotations')} ({quotesCount})
      </p>
      <p className='flex items-center gap-1 text-sm text-neutral-5'>
        <FileText className='text-neutral-5' /> {t('request_id')} :
        <span className='font-semibold text-base-black'>{requestId}</span>
      </p>
    </div>
  )
}

export default QuoteRequestId
