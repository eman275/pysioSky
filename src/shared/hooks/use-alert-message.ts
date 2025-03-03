import { useMemo } from 'react'
import { useScopedI18n } from '../locales/client'

type MappedVehicle = {
  isEstimatedValueModified: boolean
  isInsuranceTypeModified: boolean
}
const useAlertMessage = (mappedVehicles: MappedVehicle[]) => {
  const t = useScopedI18n('application.quotations')

  return useMemo(() => {
    const isSumInsuredChanged = mappedVehicles.some(
      (vehicle) => vehicle.isEstimatedValueModified
    )
    const isInsuranceTypeChanged = mappedVehicles.some(
      (vehicle) => vehicle.isInsuranceTypeModified
    )

    if (isSumInsuredChanged && isInsuranceTypeChanged) {
      return t('alert_flag.sub_title')
    } else if (isSumInsuredChanged) {
      return t('alert_flag.sum_insured_changed_alert')
    } else if (isInsuranceTypeChanged) {
      return t('alert_flag.insurance_type_changed_alert')
    } else {
      return ''
    }
  }, [t, mappedVehicles])
}

export default useAlertMessage
