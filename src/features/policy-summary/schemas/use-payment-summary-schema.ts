import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { useScopedI18n } from '@/shared/locales/client'
import { z } from 'zod'

function usePaymentSummarySchema() {
  const t = useScopedI18n('application.paymentDetails')
  const { requiredNumberSchema, requiredConsentSchema } = useValidationSchemas()

  const paymentSummarySchema = z.object({
    iban: requiredNumberSchema({
      name: t('iban_number'),
      requiredMsgType: 'requiredEntry',
      exactLength: 22,
    }),
    summaryPaymentDisclaimer: requiredConsentSchema(),
  })

  return paymentSummarySchema
}

export default usePaymentSummarySchema
