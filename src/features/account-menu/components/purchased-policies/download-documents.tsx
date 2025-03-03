import React from 'react'
import ReceiptIcon from '@/shared/components/icons/receipt.svg'
import TermsConditionsIcon from '@/shared/components/icons/file-text.svg'
import PolicyPaperIcon from '@/shared/components/icons/wall-paper.svg'
import { cn } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import { toast } from 'sonner'
import { useTermsAndConditionsLookUpMutation } from '../../resources/terms-and-conditions.mutation'
import { useFileDownload } from '@/shared/hooks/use-file-download'
import { usePolicyPaperLookUpQuery } from '../../resources/policy_paper.query'
import { useReceiptLookUpQuery } from '../../resources/receipts.query'

type DownloadDocumentsProps = {
  insuranceCompanyId: number
  correlationId: string | undefined
  quotationDate: string
  policyReference: string
}

const DownloadDocuments = ({
  correlationId,
  insuranceCompanyId,
  quotationDate,
  policyReference,
}: DownloadDocumentsProps) => {
  const t = useScopedI18n('userAccount.userAccount')
  const termsAndConditionsMutation = useTermsAndConditionsLookUpMutation(
    insuranceCompanyId,
    correlationId,
    quotationDate
  )

  const {
    data: policyData,
    refetch: policyRefetch,
    isFetching: policyLoader,
  } = usePolicyPaperLookUpQuery(policyReference)
  const { downloadHandler: policyDownloadHandler } = useFileDownload({
    data: policyData,
    refetch: policyRefetch,
    isFetching: policyLoader,
  })
  const {
    data: invoiceData,
    refetch: invoiceRefetch,
    isFetching: invoiceLoader,
  } = useReceiptLookUpQuery(policyReference)
  const { downloadHandler: invoiceDownloadHandler } = useFileDownload({
    data: invoiceData,
    refetch: invoiceRefetch,
    isFetching: invoiceLoader,
  })

  const onClickTermsAndConditions = () => {
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
  const downloadDocumentsList = [
    {
      title: t('receipts'),
      icon: <ReceiptIcon />,
      onClickBtn: invoiceDownloadHandler,
    },
    {
      title: t('policy_paper'),
      icon: <PolicyPaperIcon />,
      onClickBtn: policyDownloadHandler,
    },
    {
      title: t('terms_conditions'),
      icon: <TermsConditionsIcon className='text-primary-6' />,
      onClickBtn: onClickTermsAndConditions,
    },
  ]

  return (
    <div>
      <p className='mb-4 text-base  font-bold'>
        {t('download_policy_documents')}
      </p>

      <div className='grid grid-cols-2 gap-[10px] lg:grid-cols-3'>
        {downloadDocumentsList.map((item, index) => {
          return (
            <div
              key={index}
              className={cn(
                ' flex cursor-pointer items-center justify-between rounded-lg bg-neutral-1 px-4 py-3 ',
                index === downloadDocumentsList.length - 1 &&
                  'col-span-2 lg:col-span-1'
              )}
              onClick={item.onClickBtn}
            >
              <p className='text-base font-bold text-primary-6'>{item.title}</p>
              <p className='text-base font-bold '>{item.icon}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DownloadDocuments
