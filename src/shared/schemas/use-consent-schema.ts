'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { z } from 'zod'

export default function useConsentSchema() {
  const { requiredConsentSchema } = useValidationSchemas()
  const additionalDetailsSchema = z.object({
    consentAnswer: requiredConsentSchema(),
  })

  return additionalDetailsSchema
}
