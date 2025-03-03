'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { z } from 'zod'

export default function useContactUsSchema() {
  const { requiredStringSchema, saudiMobileNumberSchema, requiredEmailSchema } =
    useValidationSchemas()
  const tContact = useScopedI18n('contact-us')
  const additionalDetailsSchema = z.object({
    contactPersonDetails: saudiMobileNumberSchema({
      name: tContact('mobile_number'),
    }),

    email: requiredEmailSchema({
      name: tContact('email_address'),
    }),

    purpose: requiredStringSchema({
      name: tContact('purpose'),
    }),

    brief: requiredStringSchema({
      name: tContact('brief'),
    }),
  })

  return additionalDetailsSchema
}
