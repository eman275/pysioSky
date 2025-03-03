'use client'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert'
import WarningFlag from '@/shared/components/icons/warning-flag.svg'
import React from 'react'
import { useScopedI18n } from '@/shared/locales/client'

type Props = {
  title: 'alert' | 'modified'
  enableCloseIcon?: boolean
  message?: string
  isDismissible?: boolean
}

const WarningCardAlert = ({ title, message, isDismissible = false }: Props) => {
  const t = useScopedI18n('application.quotations')

  const alertMessage = message ? message : t('alert_flag.sub_title')

  return (
    <Alert
      isDismissible={isDismissible}
      direction={'horizontal'}
      status={'warning'}
      className='items-start justify-between'
    >
      <div className='flex flex-col items-start gap-2 lg:flex-row lg:items-center'>
        <AlertTitle>
          <div className='flex'>
            <WarningFlag />
            <div className='ms-2 self-center'>
              {title === 'alert'
                ? t('alert_flag.title')
                : t('modified_flag.title')}
            </div>
          </div>
        </AlertTitle>
        <AlertDescription>
          <div
            className='text-xs'
            dangerouslySetInnerHTML={{
              __html:
                title === 'alert' ? alertMessage : t('modified_flag.sub_title'),
            }}
          />
        </AlertDescription>
      </div>
    </Alert>
  )
}

export default WarningCardAlert
