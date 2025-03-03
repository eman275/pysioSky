'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { useInputsConfigQuery } from '@/shared/resources/configuration/inputs.query'
import { z } from 'zod'

export default function useCommonSchemas() {
  const { requiredNumberSchema, optionalNumberSchema } = useValidationSchemas()
  const t = useScopedI18n('application.fleetDetails')
  const tVal = useScopedI18n('validations')
  const tUnits = useScopedI18n('common.units')
  const { data: inputConfig } = useInputsConfigQuery()
  const { minimum, maximum } = inputConfig?.vehicleEstimatedValue ?? {}

  const getSumInsuredSchema = ({
    isRequired = true,
  }: {
    isRequired: boolean
  }) =>
    z.object({
      sumInsured: isRequired
        ? requiredNumberSchema({
            name: t('add_vehicle.sum_insured'),
            minValue: minimum,
            maxValue: maximum,
          })
        : optionalNumberSchema({
            name: t('add_vehicle.sum_insured'),
            minValue: minimum,
            maxValue: maximum,
          }),
    })

  const getSequenceNumberSchema = ({
    isRequired = true,
  }: {
    isRequired: boolean
  }) =>
    z.object({
      sequenceNumber: isRequired
        ? requiredNumberSchema({
            name: t('add_vehicle.sequence_number'),
            unit: tUnits('digits'),
          })
            .transform((value) => {
              const stringValue = value?.toString() || ''
              return stringValue.replace(/^0+/, '')
            })
            .refine(
              (value) => {
                return value.length !== 0
              },
              {
                message: tVal('requiredEntry', {
                  name: t('add_vehicle.sequence_number'),
                }),
              }
            )
            .refine(
              (value) => {
                return value.length >= 2
              },
              {
                message: tVal('minLength', {
                  min: 2,
                  name: t('add_vehicle.sequence_number'),
                  unit: tUnits('digits'),
                }),
              }
            )
            .refine(
              (value) => {
                return value.length >= 2 && value.length <= 10
              },
              {
                message: tVal('maxLength', {
                  max: 10,
                  name: t('add_vehicle.sequence_number'),
                  unit: tUnits('digits'),
                }),
              }
            )
        : optionalNumberSchema({
            name: t('add_vehicle.sequence_number'),
            unit: tUnits('digits'),
          }).transform((value) => {
            const stringValue = value?.toString() || ''
            return stringValue.replace(/^0+/, '')
          }),
    })

  const getCustomNumberSchema = ({
    isRequired = true,
  }: {
    isRequired: boolean
  }) =>
    z.object({
      customNumber: isRequired
        ? requiredNumberSchema({
            name: t('add_vehicle.custom_number'),
            unit: tUnits('digits'),
          })
            .transform((value) => {
              const stringValue = value?.toString() || ''
              return stringValue.replace(/^0+/, '')
            })
            .refine(
              (value) => {
                return value.length !== 0
              },
              {
                message: tVal('requiredEntry', {
                  name: t('add_vehicle.custom_number'),
                }),
              }
            )
            .refine((value) => value.length === 10, {
              message: tVal('lengthError', {
                length: 10,
                name: t('add_vehicle.custom_number'),
                unit: tUnits('digits'),
              }),
            })
        : optionalNumberSchema({
            name: t('add_vehicle.custom_number'),
            unit: tUnits('digits'),
          }).transform((value) => {
            const stringValue = value?.toString() || ''
            return stringValue.replace(/^0+/, '')
          }),
    })

  const commonSchemas = {
    getSumInsuredSchema,
    getSequenceNumberSchema,
    getCustomNumberSchema,
  }

  return commonSchemas
}
