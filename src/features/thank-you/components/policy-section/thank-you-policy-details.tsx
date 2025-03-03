'use client'

import QuoteHeader from '@/features/quotations/components/shared-components/quote-header'
import { Card } from '@/shared/components/ui/card'
import { useScopedI18n } from '@/shared/locales/client'
import { useTermsAndConditionsLookUpMutation } from '@/features/quotations/quotes-list/resources/terms-and-conditions.mutation'
import { toast } from 'sonner'
import PolicyAction from './policy-actions'
import { usePolicyQuery } from '../../resources/policies.query'
import PolicyDetailsSection from './policy-details-section'
import { UseFormatPolicyDetails } from '../../hooks/useFormatPolicyDetails'

const ThankYouPolicyDetails = () => {
  const t = useScopedI18n('thank-you.policy_section')
  const { data } = usePolicyQuery()
  const details = data?.details
  const insuranceCompany = details?.insuranceCompany
  const termsAndConditionsMutation = useTermsAndConditionsLookUpMutation(
    insuranceCompany?.id as number
  )
  if (!details || !insuranceCompany) return null

  const tplDetails = UseFormatPolicyDetails(details, 'tplDetails')
  const compDetails = UseFormatPolicyDetails(details, 'compDetails')

  const termsAndConditionsHandler = () => {
    {
      termsAndConditionsMutation.mutate(undefined, {
        onSuccess: (data) => {
          if (data?.url) {
            window.open(data.url, '_blank')
          } else {
            toast.error('Terms and conditions URL not found')
          }
        },
        onError: () => {
          toast.error('Failed to get terms and conditions')
        },
      })
    }
  }
  return (
    <Card className='flex w-full flex-col p-0'>
      <div className='flex flex-row flex-wrap items-center justify-between gap-2 p-4'>
        <QuoteHeader isSubtitle={false} company={insuranceCompany} />
        <PolicyAction
          title={t('term_but')}
          onClick={termsAndConditionsHandler}
        />
      </div>
      <PolicyDetailsSection tplDetails={tplDetails} compDetails={compDetails} />
    </Card>
  )
}

export default ThankYouPolicyDetails
