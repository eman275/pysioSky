'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { z } from 'zod'

export default function useRepairTypeSchema() {
  const { requiredStringSchema } = useValidationSchemas()
  const t = useScopedI18n('application.quotations')

  const schema = z.object({
    repairMethod: requiredStringSchema({
      name: t('repair_type'),
    }),
    deductibleAmount: requiredStringSchema({
      name: 'deductible amount',
    }),
  })

  return schema
}
