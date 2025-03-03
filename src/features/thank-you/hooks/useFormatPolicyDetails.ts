import { useScopedI18n } from '@/shared/locales/client'
import { PolicyDetails } from '../resources/policy.types'
import { formatDate, formatThousandsSeparators } from '@/shared/lib/utils'

export const UseFormatPolicyDetails = (
  details: PolicyDetails,
  type: 'compDetails' | 'tplDetails'
) => {
  const t = useScopedI18n('thank-you.policy_section.policy_details')
  if (!details[type]) return []
  return [
    { title: t('policy_number'), value: details[type].policyNumber ?? '' },
    {
      title: t('policy_quote_reference_no'),
      value: details[type].quoteReferenceNo ?? '',
    },
    {
      title: t('policy_effective_date'),
      value: formatDate(new Date(details.effectiveDate || ''), 'forClient'),
    },
    {
      title: t('policy_end_date'),
      value: formatDate(new Date(details.expiryDate || ''), 'forClient'),
    },
    {
      title: t('policy_vehicle_count', {
        count: details[type].vehicleCount,
        type: type === 'tplDetails' ? 'TPL' : 'COMP',
      }),
      value: `${
        formatThousandsSeparators(details[type].taxableAmount, true) ?? ''
      } SAR`,
    },
    {
      title: t('policy_price'),
      value: `${
        formatThousandsSeparators(details[type].totalAmount, true) ?? ''
      } SAR`,
    },
  ]
}
