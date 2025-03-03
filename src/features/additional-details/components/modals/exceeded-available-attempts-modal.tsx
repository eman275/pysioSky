import WarningIcon from '@/shared/components/icons/warning-icon.svg'
import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
import useAdditionalDetailsStore from '../../hooks/use-additional-details-store'

const ExceededAvailableAttemptsModal = () => {
  const t = useScopedI18n('application.additionalDetails')
  const { selectedDetails, toggleDialog } = useAdditionalDetailsStore()

  const handleOkClick = () => {
    toggleDialog(false)
  }

  return (
    <div>
      <div className=' flex flex-col items-center justify-center '>
        <div className='mb-6 flex size-20 items-center justify-center rounded-full border bg-error-1 p-5'>
          <WarningIcon />
        </div>
        <p className='mb-1 text-base font-bold text-base-black lg:text-xxl'>
          {t('exceeded_available_attempts.title')}
        </p>
        <p className='mb-6 text-center text-sm  text-neutral-5 lg:text-base '>
          {t('exceeded_available_attempts.description')}
        </p>
        <p className=' mb-2 text-base text-neutral-5 '>
          {t('exceeded_available_attempts.sub_description', {
            id: selectedDetails?.ownerNationalId,
          })}
        </p>
        <ul className='list-square pl-6  text-sm text-neutral-5 lg:text-base'>
          <li className='mb-2'>
            {t('exceeded_available_attempts.send_you_notification_email')}
          </li>
          <li>{t('exceeded_available_attempts.use_different_cr_owner')}</li>
        </ul>

        <Button
          className='mt-8 w-full text-base'
          variant='solid'
          colorScheme='secondary'
          size='M'
          onClick={handleOkClick}
        >
          {t('exceeded_available_attempts.ok_btn')}
        </Button>
        <div className='mt-6'>
          <p className='text-base font-semibold text-neutral-5'>
            {t('exceeded_available_attempts.Contact_support')}
          </p>
          <p className='text-center text-base font-semibold text-base-black'>
            +966 8002 444455
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExceededAvailableAttemptsModal
