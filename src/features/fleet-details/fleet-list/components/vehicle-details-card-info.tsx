import React from 'react'
import CarLogo from '@/shared/components/icons/car.svg'
import Line14 from '@/shared/components/icons/line-14.svg'
import PlateIcon from '@/shared/components/icons/license-plate.svg'
import { useScopedI18n } from '@/shared/locales/client'
import Image from 'next/image'
import VehicleActionsMenu from './vehicle-actions-menu'
import { useGeneratePlateString } from '@/shared/hooks/use-plate-string'
import { useFormattedNumber } from '@/shared/hooks/use-spreate-number'
import {
  COVERAGE_TYPE,
  REGISTER_TYPE_ENUM,
  Vehicle,
  VehicleItem,
} from '../../fleet-details.types'
import InfoTooltip from '@/shared/components/ui/info-tooltip'
import { cn } from '@/shared/lib/utils'
import { ReactNode } from 'react'
import { Badge } from '@/shared/components/ui/badge'
import {
  COMPVehicle,
  TPLVehicle,
} from '@/features/quotations/resources/quotation.types'
import { VehicleTitle } from './vehicle-title'

type VehicleDetailsCardInfoProps = {
  vehicleDetailsCardInfo: VehicleItem | COMPVehicle | TPLVehicle | Vehicle
  disableActions?: boolean
  enableEditBtn?: boolean
  repairTypeSection?: ReactNode
  enableModifiedTooltip?: boolean
  disableSumInsured?: boolean
  selectedOption?: string
}

const VehicleDetailsCardInfo = React.memo(
  ({
    vehicleDetailsCardInfo,
    disableActions,
    enableEditBtn,
    repairTypeSection,
    enableModifiedTooltip,
    disableSumInsured,
  }: VehicleDetailsCardInfoProps) => {
    const {
      insuranceType,
      make,
      model,
      manufactureYear,
      plateDetails,
      vehicleEstimatedValue,
      vehicleUniqueType,
      vehicleIdentifier,
    } = vehicleDetailsCardInfo

    const t = useScopedI18n('application.fleetDetails')
    const tQuotation = useScopedI18n('application.quotations')
    const tUnit = useScopedI18n('common.units')

    const plateDetailsString = useGeneratePlateString(plateDetails)
    const vehicleIdentifierValue =
      useFormattedNumber(vehicleIdentifier).formattedNumber
    const sumInsured = useFormattedNumber(
      vehicleEstimatedValue
    ).formattedCurrencyNumber
    const isCompCoverage = insuranceType === COVERAGE_TYPE.COMP
    const isSequence = vehicleUniqueType === REGISTER_TYPE_ENUM.SEQUENCE

    const ModifiedTooltipContent = enableModifiedTooltip && (
      <Badge
        variant='warning'
        className='ms-1 flex items-center gap-1 rounded-3xl bg-warning-3 px-2 py-[3px] text-center text-xxs font-semibold'
      >
        {tQuotation('quotation_summary.modified_tPL_iC')}
        <InfoTooltip>
          <p className='flex w-[260px] text-center'>
            {tQuotation('quotation_summary.some_vehicle_insurance_changed')}
          </p>
        </InfoTooltip>
      </Badge>
    )

    const VehicleImage = make?.imageUrl ? (
      <Image
        src={make.imageUrl}
        width={40}
        height={40}
        alt={`${make.imageUrl} logo`}
      />
    ) : (
      <CarLogo />
    )

    const VehicleIdentifier = !disableActions && (
      <div
        className={cn(
          'flex w-[28px] items-center justify-center rounded-l-md',
          isCompCoverage ? 'bg-neutral-6' : 'bg-neutral-5'
        )}
      >
        <p className='-rotate-90 text-base font-bold text-base-white'>
          {isCompCoverage ? 'COMP' : 'TPL'}
        </p>
      </div>
    )

    const PlateDetailsContent = plateDetails && (
      <div className='flex items-center'>
        {!disableActions && <PlateIcon />}
        <p className='me-3 ms-1 whitespace-nowrap text-sm text-neutral-5 lg:text-base'>
          {plateDetailsString}-{plateDetails?.plateNumber}
        </p>
        {!disableSumInsured && (
          <div className='hidden lg:block'>
            <Line14 />
          </div>
        )}
      </div>
    )

    const EditedTooltip = enableEditBtn && (
      <Badge
        variant='warning'
        className='ms-1 flex items-center gap-1 rounded-3xl bg-warning-3 px-2 py-[3px] text-center text-xxs font-semibold'
      >
        {tQuotation('quotation_summary.edited')}
        <InfoTooltip>
          <p className='flex w-[260px] text-wrap text-center'>
            {tQuotation('quotation_summary.edited_vehicle')}
          </p>
        </InfoTooltip>
      </Badge>
    )

    const SumInsuredContent = !disableSumInsured && (
      <div
        className={cn(
          'w-full items-center text-nowrap lg:flex',
          disableActions ? 'flex' : 'hidden'
        )}
      >
        <p className='text-sm font-semibold text-neutral-5'>
          {t('add_vehicle.sum_insured')}:
        </p>
        <p className='ms-1 text-sm font-bold text-neutral-5'>
          {tUnit('SAR')} {sumInsured}
        </p>
        {EditedTooltip}
      </div>
    )

    return (
      <div className='flex w-full'>
        {VehicleIdentifier}
        <div
          className={cn(
            'flex w-full items-center justify-between rounded-md border ',
            disableActions ? 'flex-col lg:flex-row' : 'flex-row'
          )}
        >
          <div className='flex w-full flex-1 justify-between gap-3 p-3 lg:w-[560px]'>
            <div className='flex items-start gap-3'>
              <div className='flex size-12 items-center justify-center rounded-lg border'>
                {VehicleImage}
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  <VehicleTitle
                    vehicleMake={make}
                    vehicleModel={model}
                    manufactureYear={manufactureYear}
                  />
                  {ModifiedTooltipContent}
                </div>
                <div className='flex flex-col items-center gap-3 lg:flex-row lg:gap-2'>
                  <div className='flex items-center gap-3 md:flex-row'>
                    <div className='flex items-center'>
                      <div className='flex size-6 items-center justify-center rounded-lg border-2 border-neutral-5 px-[6px] py-1 font-bold text-neutral-5'>
                        <p className='font-bold text-neutral-5'>
                          {isSequence ? 'S' : 'C'}
                        </p>
                      </div>
                      <p className='me-3 ms-1 whitespace-nowrap text-sm text-neutral-5 lg:text-base'>
                        {vehicleIdentifierValue}
                      </p>
                      {(PlateDetailsContent || SumInsuredContent) && (
                        <div className=' w-fit md:flex'>
                          <Line14 />
                        </div>
                      )}
                    </div>
                    {PlateDetailsContent}
                  </div>
                  {SumInsuredContent}
                </div>
              </div>
            </div>
          </div>
          {repairTypeSection}
          {!disableActions &&
            'applicationVehicleReference' in vehicleDetailsCardInfo && (
              <VehicleActionsMenu
                reference={
                  vehicleDetailsCardInfo.applicationVehicleReference as string
                }
              />
            )}
        </div>
      </div>
    )
  }
)

VehicleDetailsCardInfo.displayName = 'VehicleDetailsCardInfo'
export default VehicleDetailsCardInfo
