'use client'

import { Button } from '@/shared/components/ui/button'
import { Card, CardDescription } from '@/shared/components/ui/card'
import StatusIcon from '@/shared/components/ui/status-icon'
import SVGsuccess from '@/shared/components/icons/payment-success.svg'
import PolicyDownload from '@/shared/components/icons/policy-download.svg'
import { useScopedI18n } from '@/shared/locales/client'
import { usePolicyPaperLookUpQuery } from '@/features/account-menu/resources/policy_paper.query'
import { useFileDownload } from '@/shared/hooks/use-file-download'
type Props = {
  refId: string
}
export default function ThankYouStatus({ refId }: Props) {
  const t = useScopedI18n('thank-you.status_section')
  const { data, refetch, isFetching } = usePolicyPaperLookUpQuery(refId)
  const { downloadHandler, isFetching: pending } = useFileDownload({
    data,
    refetch,
    isFetching,
  })
  return (
    <Card className='flex w-full flex-col items-center justify-between gap-4 border-2 border-dashed border-success-5 md:flex-row'>
      <div className='flex items-center gap-4'>
        <StatusIcon iconColorScheme={'secondary'} iconSize={40}>
          <SVGsuccess />
        </StatusIcon>
        <CardDescription className='flex flex-col gap-[6px]'>
          <p className='text-lg font-bold'>{t('title')}</p>
          <p className='text-neutral-5'>{t('description')} </p>
        </CardDescription>
      </div>
      <div className='flex w-full flex-wrap gap-4 md:w-fit'>
        <Button
          colorScheme={'secondary'}
          variant={'outlined'}
          size={'XS'}
          className='ms-auto w-full flex-1 whitespace-nowrap md:w-40'
          endIcon={<PolicyDownload />}
          onClick={downloadHandler}
          isLoading={pending}
        >
          {t('download_btn')}
        </Button>
        <Button
          colorScheme={'secondary'}
          asLink
          href='/user-account'
          size={'XS'}
          className='ms-auto w-full flex-1 whitespace-nowrap md:w-36'
        >
          {t('account_btn')}
        </Button>
      </div>
    </Card>
  )
}
