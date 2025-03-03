'use client'
import FileBlank from '@/shared/components/icons/file-blank.svg'
import { useTermsAndConditionsLookUpMutation } from '../resources/terms-and-conditions.mutation'
import { useScopedI18n } from '@/shared/locales/client'
import { toast } from 'sonner'

type Props = {
  insuranceCompanyId: number
}

const TermsAndConditions = ({ insuranceCompanyId }: Props) => {
  const t = useScopedI18n('application.quotations')
  const termsAndConditionsMutation =
    useTermsAndConditionsLookUpMutation(insuranceCompanyId)
  const handleClick = () => {
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

  return (
    <div
      className='flex cursor-pointer items-end gap-1 lg:items-center'
      onClick={handleClick}
    >
      <FileBlank />
      <p className='text-xs font-bold text-neutral-5'>
        {t('terms_conditions')}
      </p>
    </div>
  )
}

export default TermsAndConditions
