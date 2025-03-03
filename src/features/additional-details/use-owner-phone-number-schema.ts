'use client'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { z } from 'zod'

export default function useOwnerPhoneNumberSchema() {
  const { saudiMobileNumberSchema } = useValidationSchemas()

  const ownerPhoneNumberSchema = z.object({
    ownerPhoneNumber: saudiMobileNumberSchema({
      name: 'mobile number',
    }),
  })

  return ownerPhoneNumberSchema
}
