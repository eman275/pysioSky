'use client'
import SvgTimer from '@/shared/components/icons/timer.svg'
import Timer from '@/shared/components/ui/timer'
import { cn } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import React, { useState } from 'react'
import { useGetQuoteExpirationQuery } from '../../quotes-list/resources/get-quote-expiration.mutation'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import QuotationExpiryWarningModal from './quote-expiry-warning-modal'
import ExpiredQuotationNotificationModal from './expired-quotation-notification-modal'

export default function QuoteCountdown() {
  const tQuote = useScopedI18n('application.quoteDetails')
  const { data, error } = useGetQuoteExpirationQuery()
  const { isOpened, setIsOpened } = useDisclosure()
  const [isTimeout, setIsTimeout] = useState(false)
  const [activeContent, setActiveContent] = useState<
    'quote-expiry' | 'quote-expired' | undefined
  >(undefined)

  const openQuoteExpiredModal = () => {
    setIsTimeout(true)
    setIsOpened(true)
    setActiveContent('quote-expired')
  }

  const openExpiryWarningModal = () => {
    setIsOpened(true)
    setActiveContent('quote-expiry')
  }

  const quoteTextColor = isTimeout ? 'text-error-6' : 'text-tertiary-6'

  const onClickOK = () => {
    setIsOpened(false)
  }

  const preventDefaultBehavior = (e: Event) => {
    e.preventDefault()
  }

  return (
    <>
      {(data || error) && (
        <Timer
          deadline={{
            seconds: data ? data.expiresInSeconds : 0,
          }}
          isTimeout={error?.code === 'QUOTE-409-EXPIRED'}
          onCountdownFinish={openQuoteExpiredModal}
          on5MinutesLeft={openExpiryWarningModal}
          descriptionClassName={quoteTextColor}
          containerClassName={isTimeout ? 'bg-error-1' : 'bg-tertiary-2'}
          separator='Colon'
          title={
            <div
              className={cn('flex items-center gap-1 text-sm', quoteTextColor)}
            >
              <SvgTimer className={quoteTextColor} width='17' height='17' />
              <span className={quoteTextColor}>
                {isTimeout
                  ? tQuote('quote_time_is_out')
                  : tQuote('quote_expires_after')}
              </span>
            </div>
          }
        />
      )}
      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent
          onEscapeKeyDown={
            activeContent === 'quote-expired'
              ? preventDefaultBehavior
              : undefined
          }
          onPointerDownOutside={
            activeContent === 'quote-expired'
              ? preventDefaultBehavior
              : undefined
          }
          className='h-auto w-auto gap-4 px-6 pb-10 pt-6 lg:w-[500px] lg:py-10'
        >
          {activeContent === 'quote-expiry' ? (
            <QuotationExpiryWarningModal onClickOK={onClickOK} />
          ) : (
            <ExpiredQuotationNotificationModal />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
