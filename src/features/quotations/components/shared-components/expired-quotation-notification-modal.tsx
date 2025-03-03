import React from 'react'
import ClockIcon from '@/shared/components/icons/clock.svg'
import { Button } from '@/shared/components/ui/button'
import { useRouter } from 'next/navigation'
import {
  generateAppPath,
  generatePublicPaths,
} from '@/shared/hooks/use-app-routes'
import useAppParam from '@/shared/hooks/use-app-params'
import { useScopedI18n } from '@/shared/locales/client'

const ExpiredQuotationNotificationModal = () => {
  const router = useRouter()
  const t = useScopedI18n('application.quotations.quotation_expired_warning')

  const {
    crNumber,
    applicationReference,
    correlationId,
    entityReference: entityReference,
  } = useAppParam()

  const onClickReturnToVehicleList = () => {
    router.push(
      generateAppPath({
        crNumber,
        entityReference,
        correlationId,
        applicationReference,
      }).INSERT_YOUR_FLEET_DETAILS_URL
    )
  }

  const onClickGoBackToHome = () => {
    router.push(generatePublicPaths().HOME)
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mb-6 flex size-14 items-center  justify-center rounded-full bg-error-1 p-3 lg:size-[88px] lg:p-5'>
        <ClockIcon className='text-error-6' />
      </div>
      <p className='text-base font-bold  lg:text-xxl'>{t('time_out')}</p>
      <p className=' mb-6 text-center text-sm text-neutral-5 lg:mb-8 lg:text-base'>
        {t('warning_msg')}
      </p>
      <Button
        className='  w-full  gap-6 px-6 py-4 text-base'
        colorScheme='secondary'
        size='M'
        variant='solid'
        onClick={onClickReturnToVehicleList}
      >
        {t('return_to_vehicle_list')}
      </Button>

      <Button
        className=' mt-3 w-full  gap-6 px-6  py-0 pb-4 text-base-black '
        size='M'
        variant='text'
        onClick={onClickGoBackToHome}
      >
        {t('go_back_to_home_page')}
      </Button>
    </div>
  )
}

export default ExpiredQuotationNotificationModal
