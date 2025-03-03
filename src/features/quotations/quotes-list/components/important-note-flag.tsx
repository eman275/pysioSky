'use client'
import React from 'react'
import FlagIcon from '@/shared/components/icons/flag-icon.svg'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert'
import { useScopedI18n } from '@/shared/locales/client'

const ImportantNoteFlag = () => {
  const t = useScopedI18n('application.quotations')
  return (
    <div className='mb-4'>
      <Alert
        isDismissible
        direction={'horizontal'}
        status={'info'}
        className='items-start justify-between'
      >
        <div className='flex flex-col items-start gap-2 lg:flex-row lg:items-center'>
          <AlertTitle>
            <div className='flex'>
              <FlagIcon />
              <div className='ms-2 self-center text-nowrap'>
                {t('important_flag.title')}
              </div>
            </div>
          </AlertTitle>

          <AlertDescription className=' w-full'>
            <span className='font-normal'>{t('important_flag.sub_title')}</span>
          </AlertDescription>
        </div>
      </Alert>
    </div>
  )
}

export default ImportantNoteFlag
