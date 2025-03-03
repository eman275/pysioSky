'use client'
import CarLogo from '@/shared/components/icons/car.svg'
import FixIcon from '@/shared/components/icons/fix-vehicle-icon.svg'
import { Button } from '@/shared/components/ui/button'
import { useFormattedNumber } from '@/shared/hooks/use-spreate-number'
import { VEHICLE_ERROR_CODES } from '@/shared/lib/constants'
import {
  REGISTER_TYPE_ENUM,
  VehicleError,
  VehicleItem,
} from '../../fleet-details.types'
import useFleetListStore from '../hooks/use-fleet-list-store'
import VehicleActionsMenu from './vehicle-actions-menu'
import { useScopedI18n } from '@/shared/locales/client'
import { includesAny } from '@/shared/lib/utils'

type FailedVehicleCardProps = {
  vehicleDetailsCardInfo: VehicleItem
}

const FailedVehicleCard = ({
  vehicleDetailsCardInfo: {
    errors,
    vehicleUniqueType,
    vehicleIdentifier,
    applicationVehicleReference,
  },
}: FailedVehicleCardProps) => {
  const isSequence = vehicleUniqueType == REGISTER_TYPE_ENUM.SEQUENCE
  const { setActiveContent, toggleDialog, setClickedItem } = useFleetListStore()
  const tVehicleErrors = useScopedI18n('common.error.vehicle_errors')
  const t = useScopedI18n('application.fleetDetails')

  const fixHandler = () => {
    setClickedItem(applicationVehicleReference)
    setActiveContent('fix-vehicle')
    toggleDialog(true)
  }
  const vehicleIdentifierFormat =
    useFormattedNumber(vehicleIdentifier).formattedNumber
  const vehicleErrorCode = errors[0].code

  const errorCodes = errors.map((err: VehicleError) => err.code) ?? []
  const isVehicleErrorSequence = includesAny(errorCodes, [
    'VEHICLE-409-SEQUENCE',
  ])

  const renderErrorMessage = () => {
    if (vehicleErrorCode === String(VEHICLE_ERROR_CODES.VEHICLE_404)) {
      return tVehicleErrors('VEHICLE-404')
    } else if (isVehicleErrorSequence) {
      return tVehicleErrors('vehicle_409_sequence')
    } else {
      return tVehicleErrors('vehicle_409')
    }
  }

  return (
    <div className=' flex w-full items-center gap-3 rounded-md border bg-error-1'>
      <div className=' flex w-full items-center justify-between p-3'>
        <div className='flex grow gap-3'>
          <div className='flex size-12 items-center justify-center self-center rounded-lg border'>
            <CarLogo />
          </div>
          <div className='flex grow flex-col gap-2'>
            <p className='font-bold text-error-6'>{renderErrorMessage()}</p>
            <div className='flex flex-col justify-between gap-2 sm:flex-row sm:flex-wrap md:flex-1'>
              <div className='flex items-center '>
                <div className='flex size-6 items-center justify-center rounded-lg border-2 border-neutral-5 px-[6px] py-1 font-bold text-neutral-5'>
                  <p className='font-bold text-neutral-5'>
                    {isSequence ? 'S' : 'C'}
                  </p>
                </div>
                <p className='me-5 ms-1 whitespace-nowrap text-sm text-neutral-5 lg:text-base'>
                  {vehicleIdentifierFormat}
                </p>
              </div>
              <div className='flex items-center gap-2 self-end'>
                <Button
                  startIcon={!isVehicleErrorSequence ? <FixIcon /> : undefined}
                  size='XXS'
                  variant='outlined'
                  colorScheme='neutral'
                  title='Fix Vehicle'
                  onClick={fixHandler}
                  className='whitespace-nowrap'
                >
                  {isVehicleErrorSequence
                    ? `${t('vehicle_actions.confirm')}`
                    : `${t('vehicle_actions.fix')}`}
                </Button>
                <VehicleActionsMenu
                  isError
                  reference={applicationVehicleReference}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FailedVehicleCard
