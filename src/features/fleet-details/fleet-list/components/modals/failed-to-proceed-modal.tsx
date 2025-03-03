'use client'

import TriangleIcon from '@/shared/components/icons/alert-triangle.svg'

import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
import useFleetListStore from '../../hooks/use-fleet-list-store'

const FailedToProceedModal = () => {
  const { toggleDialog, totalErrors, setActiveContent } = useFleetListStore()

  const onCloseHandler = () => toggleDialog(false)
  const proceedHandler = () => {
    setActiveContent('delete-and-proceed')
    toggleDialog(true)
  }

  const t = useScopedI18n('application.fleetDetails')
  return (
    <div className='flex w-full flex-col px-6 py-8 lg:max-w-[400px]'>
      <div className='flex items-center justify-center'>
        <div className='mb-6 flex size-14 items-center justify-center rounded-full border bg-error-1 text-center '>
          <TriangleIcon />
        </div>
      </div>
      <p className='mb-1 text-center text-base font-bold'>
        {t('error_single_vehicle_modal.title')}
      </p>
      <div className='flex items-center justify-center'>
        <p className='mb-1 w-[75%] text-center text-sm'>
          {t('error_single_vehicle_modal.sub_title', {
            'total-error': totalErrors,
          })}
        </p>
      </div>

      <div className='mt-6 flex items-center justify-between gap-2'>
        <Button
          className='max-w-[145px] grow'
          variant='outlined'
          colorScheme='neutral'
          onClick={onCloseHandler}
          size='XS'
        >
          {t('error_single_vehicle_modal.back_btn')}
        </Button>
        <Button
          className='grow'
          colorScheme='danger'
          onClick={proceedHandler}
          size='XS'
        >
          {t('error_single_vehicle_modal.delete_btn')}
        </Button>
      </div>
    </div>
  )
}

export default FailedToProceedModal
