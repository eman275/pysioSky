'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { z } from 'zod'
import useCommonSchemas from './common-schemas'
import useFleetListStore from '../hooks/use-fleet-list-store'
import { REGISTER_TYPE_ENUM } from '../../fleet-details.types'

export default function useEditVehicleFormSchema() {
  const commonSchemas = useCommonSchemas()
  const { optionalNumberSchema, optionalStringSchema } = useValidationSchemas()
  const t = useScopedI18n('application.fleetDetails')
  const { selectedItems, clickedItem } = useFleetListStore()
  const isSingleItem = Boolean(clickedItem || selectedItems.length <= 1)
  const selectedVehicle = clickedItem || selectedItems?.[0] || {}

  const isCustom =
    selectedVehicle.vehicleUniqueType === REGISTER_TYPE_ENUM.CUSTOM

  const editVehicleSchema = z
    .object({
      ...(isCustom
        ? {
            customNumber: optionalNumberSchema({
              name: t('add_vehicle.custom_number'),
            }),
          }
        : {
            sequenceNumber: optionalNumberSchema({
              name: t('add_vehicle.sequence_number'),
            }),
          }),
      insuranceType: optionalStringSchema({
        name: t('add_vehicle.insurance_type'),
      }),
    })
    .merge(
      commonSchemas.getSumInsuredSchema({
        isRequired: isSingleItem,
      })
    )

  return editVehicleSchema
}
