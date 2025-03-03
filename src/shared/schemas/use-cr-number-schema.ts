'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { z } from 'zod'

export default function useCrNumberSchema() {
  const tCr = useScopedI18n('landing.cr_number_form')
  const tUnits = useScopedI18n('common.units')

  const { requiredNumberSchema } = useValidationSchemas()

  const additionalDetailsSchema = z.object({
    crNumber: requiredNumberSchema({
      name: tCr('cr_number'),
      exactLength: 10,
      unit: tUnits('digits'),
    }),
  })

  return additionalDetailsSchema
}
