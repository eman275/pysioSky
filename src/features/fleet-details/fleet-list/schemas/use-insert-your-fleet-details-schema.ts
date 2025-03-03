'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { z } from 'zod'
import {
  PURPOSE_INSURANCE_TYPE_ENUM,
  REGISTER_TYPE_ENUM,
} from '../../fleet-details.types'
import useCommonSchemas from './common-schemas'

export default function useInsertYourFleetDetailsSchema() {
  const commonSchemas = useCommonSchemas()
  const { requiredStringSchema, optionalNumberSchema } = useValidationSchemas()
  const t = useScopedI18n('application.fleetDetails')
  const tVal = useScopedI18n('validations')
  const tUnits = useScopedI18n('common.units')

  const schema = z
    .object({
      registrationType: requiredStringSchema({
        name: t('add_vehicle.registration_type'),
      }),
      purposeOfInsurance: requiredStringSchema({
        name: t('add_vehicle.purpose_of_insurance'),
      }),
      modelYear: optionalNumberSchema({
        name: t('add_vehicle.model_year'),
      }),
      insuranceType: requiredStringSchema({
        name: t('add_vehicle.insurance_type'),
      }),
    })
    .merge(commonSchemas.getSumInsuredSchema({ isRequired: true }))
    .merge(commonSchemas.getSequenceNumberSchema({ isRequired: false }))
    .merge(commonSchemas.getCustomNumberSchema({ isRequired: false }))
    .superRefine((data, ctx) => {
      const isSequence =
        data.registrationType === REGISTER_TYPE_ENUM.SEQUENCE.toString()
      const isCustom =
        data.registrationType === REGISTER_TYPE_ENUM.CUSTOM.toString()
      const isNewInsurance =
        data.purposeOfInsurance ===
        PURPOSE_INSURANCE_TYPE_ENUM.New_Insurance.toString()
      const isOwnershipTransfer =
        data.purposeOfInsurance ===
        PURPOSE_INSURANCE_TYPE_ENUM.Ownership_Transfer.toString()
      const needsModelYear =
        (isSequence && isOwnershipTransfer) || (isCustom && isNewInsurance)

      if (!data.sequenceNumber && isSequence) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tVal('requiredEntry', {
            name: t('add_vehicle.sequence_number'),
          }),
          path: ['sequenceNumber'],
        })
      } else if (data.sequenceNumber.length < 2 && isSequence) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tVal('minLength', {
            min: 2,
            name: t('add_vehicle.sequence_number'),
            unit: tUnits('digits'),
          }),
          path: ['sequenceNumber'],
        })
      } else if (
        !(
          data.sequenceNumber.length >= 2 && data.sequenceNumber.length <= 10
        ) &&
        isSequence
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tVal('maxLength', {
            max: 10,
            name: t('add_vehicle.sequence_number'),
            unit: tUnits('digits'),
          }),
          path: ['sequenceNumber'],
        })
      }

      if (!data.customNumber && isCustom) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tVal('requiredEntry', {
            name: t('add_vehicle.custom_number'),
          }),
          path: ['customNumber'],
        })
      } else if (data.customNumber.length !== 10 && isCustom) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tVal('lengthError', {
            length: 10,
            name: t('add_vehicle.custom_number'),
            unit: tUnits('digits'),
          }),
          path: ['customNumber'],
        })
      }

      if (needsModelYear && !data.modelYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: tVal('requiredSelect', {
            name: t('add_vehicle.model_year'),
          }),
          path: ['modelYear'],
        })
      }
    })

  return schema
}
