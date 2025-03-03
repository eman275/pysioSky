'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { z } from 'zod'

export default function useCreateApplicationSchema() {
  const {
    requiredStringSchema,
    saudiMobileNumberSchema,
    requiredEmailSchema,
    requiredDateSchema,
  } = useValidationSchemas()
  const tAdditional = useScopedI18n(
    'application.company-details.additionalDetails'
  )
  const additionalDetailsSchema = z.object({
    effectiveDate: requiredDateSchema(),

    entitySize: requiredStringSchema({
      name: tAdditional('entity_size'),
    }),

    beneficiaryEmail: requiredEmailSchema({
      name: tAdditional('email'),
    }),

    contactPersonDetails: saudiMobileNumberSchema({
      name: tAdditional('contact_person_details'),
    }),
  })

  return additionalDetailsSchema
}
