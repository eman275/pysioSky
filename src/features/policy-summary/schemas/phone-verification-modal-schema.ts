import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { z } from 'zod'

export default function usePhoneVerificationSchema() {
  const tField = useScopedI18n('application.applicantDetails.field')
  const { saudiMobileNumberSchema } = useValidationSchemas()
  const phoneVerificationSchema = z.object({
    mobileNumber: saudiMobileNumberSchema({
      name: tField('mobile_number'),
    }),
  })
  return phoneVerificationSchema
}
