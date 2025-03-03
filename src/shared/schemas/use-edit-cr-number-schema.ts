'use client'
import useConsentSchema from '@/shared/schemas/use-consent-schema'
import useCrNumberSchema from '@/shared/schemas/use-cr-number-schema'

export default function useEditCrNumberSchema() {
  const consentSchema = useConsentSchema()
  const crNumberSchema = useCrNumberSchema()
  const additionalDetailsSchema = consentSchema.merge(crNumberSchema)

  return additionalDetailsSchema
}
