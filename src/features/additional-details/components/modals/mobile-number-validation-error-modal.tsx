import React from 'react'
import WarningIcon from '@/shared/components/icons/warning-icon.svg'
import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
import SelectAnotherCrOwnerBtn from '../select_another_cr_owner-btn'
import useAdditionalDetailsStore from '../../hooks/use-additional-details-store'

const MobileNumberValidationErrorModal = ({ isServiceError = false }) => {
  const t = useScopedI18n('application.additionalDetails')
  const { setActiveContent } = useAdditionalDetailsStore()

  const onTryAgainClick = () => {
    setActiveContent('cr-owner-mobile-number')
  }

  return (
    <div className=' flex flex-col items-center justify-center '>
      <div className='mb-6 flex size-20 items-center justify-center rounded-full border bg-error-1 p-5'>
        <WarningIcon />
      </div>
      <p className='text-base font-bold text-base-black lg:text-xxl'>
        {isServiceError
          ? t('verification_service_down.title')
          : t('mobile_number_id_mismatch.title')}
      </p>
      <p className=' text-center text-sm text-neutral-5 lg:text-base '>
        {isServiceError
          ? t('verification_service_down.description')
          : t('mobile_number_id_mismatch.description')}
      </p>
      <Button
        className='mt-8 w-full text-base'
        variant='solid'
        colorScheme='secondary'
        size='M'
        onClick={onTryAgainClick}
      >
        {t('mobile_number_id_mismatch.try_again')}
      </Button>
      {!isServiceError && <SelectAnotherCrOwnerBtn />}
    </div>
  )
}

export default MobileNumberValidationErrorModal
