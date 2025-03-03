import React from 'react'
import ClockIcon from '@/shared/components/icons/clock.svg'
import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'

type QuotationExpiryWarningModalProps = {
  onClickOK(): void
}

const QuotationExpiryWarningModal = ({
  onClickOK,
}: QuotationExpiryWarningModalProps) => {
  const t = useScopedI18n('application.quotations.quotation_expiry_warning')
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mb-6 flex  size-14 items-center  justify-center rounded-full bg-tertiary-1 p-3 lg:size-[88px] lg:p-5'>
        <ClockIcon className='text-tertiary-6' />
      </div>
      <p className='text-base font-bold  lg:text-xxl'>{t('minutes_left')}</p>
      <p className='mb-6 text-sm text-neutral-5 lg:mb-8 lg:text-base'>
        {t('warning_msg')}
      </p>
      <Button
        className='w-full gap-6 px-6 py-4'
        colorScheme='secondary'
        size='M'
        variant='solid'
        onClick={onClickOK}
      >
        {t('ok')}
      </Button>
    </div>
  )
}

export default QuotationExpiryWarningModal
