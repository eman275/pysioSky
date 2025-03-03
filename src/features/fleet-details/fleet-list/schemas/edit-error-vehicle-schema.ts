'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { z } from 'zod'
import useCommonSchemas from './common-schemas'

export default function useEditErrorVehicleFormSchema() {
  const commonSchemas = useCommonSchemas()
  const { requiredStringSchema, optionalNumberSchema } = useValidationSchemas()
  const t = useScopedI18n('application.fleetDetails')
  const tVal = useScopedI18n('validations')

  const additionalDetailsSchema = z
    .object({
      purposeOfInsurance: requiredStringSchema({
        name: t('add_vehicle.purpose_of_insurance'),
      }),

      insuranceType: requiredStringSchema({
        name: t('add_vehicle.insurance_type'),
      }),
      vehicleMake: optionalNumberSchema({
        name: t('add_vehicle.vehicle_make'),
      }),

      bodyType: optionalNumberSchema({
        name: t('add_vehicle.body_type'),
      }),

      modelYear: optionalNumberSchema({
        name: t('add_vehicle.model_year'),
      }),
      vehicleModel: optionalNumberSchema({
        name: t('add_vehicle.vehicle_model'),
      }),
    })
    .merge(commonSchemas.getSumInsuredSchema({ isRequired: true }))
    .merge(commonSchemas.getSequenceNumberSchema({ isRequired: false }))
    .merge(commonSchemas.getCustomNumberSchema({ isRequired: false }))

    .superRefine((data, ctx) => {
      const requiredMissingData = [
        { field: 'modelYear', message: 'model_year' },
        { field: 'vehicleMake', message: 'vehicle_make' },
        { field: 'bodyType', message: 'body_type' },
        { field: 'vehicleModel', message: 'vehicle_model' },
      ]

      for (const { field, message } of requiredMissingData) {
        if (!data[field as keyof typeof data]) {
          const msg = `add_vehicle.${message}`
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: tVal('requiredSelect', { name: t(msg as keyof typeof t) }),
            path: [field],
          })
        }
      }
    })

  return additionalDetailsSchema
}
