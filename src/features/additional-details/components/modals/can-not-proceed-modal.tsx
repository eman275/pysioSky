import React from 'react'
import WarningIcon from '@/shared/components/icons/alert-triangle.svg'
import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
import useAdditionalDetailsStore from '../../hooks/use-additional-details-store'

const CanNotProceedModal = () => {
  const t = useScopedI18n('application.additionalDetails')
  const { toggleDialog } = useAdditionalDetailsStore()

  const onClickOk = () => {
    toggleDialog(false)
  }

  return (
    <div>
      <div className=' flex flex-col items-center justify-center '>
        <div className='mb-6 flex size-14 items-center justify-center rounded-full border bg-error-1 p-5'>
          <WarningIcon />
        </div>
        <p className='mb-1 text-base font-bold text-base-black '>
          {t('can_not_proceed.title')}
        </p>
        <p className='mb-6 text-center text-sm  text-neutral-5 '>
          {t('can_not_proceed.description')}
        </p>

        <Button
          className='mt-8 w-full text-base'
          variant='solid'
          colorScheme='secondary'
          size='M'
          onClick={onClickOk}
        >
          {t('exceeded_available_attempts.ok_btn')}
        </Button>
      </div>
    </div>
  )
}

export default CanNotProceedModal
