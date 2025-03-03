import React from 'react'
import CalendarIcon from '@/shared/components/icons/calendar-month.svg'
import SvgTimer from '@/shared/components/icons/timer.svg'
import { useScopedI18n } from '@/shared/locales/client'
import { cn } from '@/shared/lib/utils'
import Timer from '@/shared/components/ui/timer'
import FileText from '@/shared/components/icons/file-text.svg'

type QuoteTimerProps = {
  requestDate: string | undefined
  isTimeout: boolean
  handleCountdownFinish(): void
  timer: number
  requestId?: string | null
}

const QuoteTimer = (props: QuoteTimerProps) => {
  const { requestDate, isTimeout, handleCountdownFinish, timer, requestId } =
    props
  const t = useScopedI18n('userAccount.userAccount.available_quotes')
  const TimerColor = isTimeout ? 'text-error-6' : 'text-tertiary-6'

  return (
    <div className='flex flex-col lg:flex-row '>
      <div className='flex items-center'>
        <CalendarIcon />
        <p className='ms-1 text-sm font-semibold text-neutral-5'>
          {t('request_date')}{' '}
          <span className='text-base-black'>{requestDate}</span>
        </p>
      </div>
      <div className='mx-2  hidden  border-t border-neutral-3 lg:block  lg:border-l lg:border-t-0'></div>

      <div className='flex items-center'>
        <FileText className='text-primary-6' />
        <p className='ms-1 text-sm font-semibold text-neutral-5'>
          {t('request_id')} :
          <span className='text-base-black'>{requestId}</span>
        </p>
      </div>

      <div className='mx-2  hidden  border-t border-neutral-3 lg:block  lg:border-l lg:border-t-0'></div>
      <div className='mt-2 flex items-center lg:mt-0'>
        <SvgTimer className={TimerColor} width='24' height='24' />
        <p
          className={cn(
            'me-2 text-sm font-bold',
            isTimeout ? 'text-error-6' : 'text-tertiary-6'
          )}
        >
          {isTimeout
            ? `${t('expired_quote')}`
            : `${t('quotations_expires_after')}`}
        </p>
        <Timer
          deadline={{ seconds: timer }}
          onCountdownFinish={handleCountdownFinish}
          descriptionClassName={TimerColor}
          separator='Colon'
          containerClassName={'px-0 p-0 w-auto '}
        />
      </div>
    </div>
  )
}

export default QuoteTimer
