'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'

import { z } from 'zod'

export default function useOwnerDetailsSchema() {
  const { optionalStringSchema, optionalNumberSchema } = useValidationSchemas()
  const t = useScopedI18n('application.additionalDetails.vat_number')

  const schema = z.object({
    vatNumber: optionalNumberSchema({
      name: t('label'),
      exactLength: 15,
    }),
    ownerReference: optionalStringSchema({
      name: 'owner Details',
    }),
  })

  return schema
}
