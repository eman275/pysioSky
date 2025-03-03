'use client'
import useAlertMessage from '@/shared/hooks/use-alert-message'
import WarningCardAlert from '../../components/shared-components/warning-card-alert'
import VehicleCustomizationContent from './vehicle-customization-content'
import { useMemo } from 'react'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store'

const VehicleCustomizationSection = () => {
  const { compVehicles, tplDetails } = useSingleQuoteStore(
    ({ compVehicles, tplDetails }) => ({ compVehicles, tplDetails })
  )
  const modifiedVehicles = useMemo(
    () =>
      [...(tplDetails?.vehicles || []), ...(compVehicles || [])].map((v) => ({
        isEstimatedValueModified: v.isEstimatedValueModified,
        isInsuranceTypeModified: v.isInsuranceTypeModified,
      })),
    [tplDetails, compVehicles]
  )

  const alertMessageContent = useAlertMessage(modifiedVehicles)
  return (
    <div className='flex flex-col gap-4'>
      <WarningCardAlert
        isDismissible
        title='alert'
        message={alertMessageContent}
      />
      <VehicleCustomizationContent />
    </div>
  )
}

export default VehicleCustomizationSection
