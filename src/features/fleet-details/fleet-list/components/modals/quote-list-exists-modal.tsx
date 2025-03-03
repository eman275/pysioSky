'use client'
import Trash2Icon from '@/shared/components/icons/trash-2-icon.svg'
import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
import useFleetListStore from '../../hooks/use-fleet-list-store'
import { useCreateQuotesMutation } from '@/features/fleet-details/resources/create-quotes.mutation'
import { useRouter } from 'next/navigation'
import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import useAppNavigationLoader from '@/shared/hooks/use-app-navigation-loader'
export default function QuoteListExistModal() {
  const router = useRouter()
  const appParams = useAppParam()
  const t = useScopedI18n('application.fleetDetails.active_quote_exist_modal')
  const { toggleDialog } = useFleetListStore()
  const createQuoteMutation = useCreateQuotesMutation()
  const { isNavigating, setIsNavigating } = useAppNavigationLoader()

  const onCancelClick = () => {
    toggleDialog(false)
  }

  const onCancelExistingClick = () => {
    createQuoteMutation.mutate(
      {
        deleteActiveQuotes: true,
        forceNew: true,
      },
      {
        onSuccess(data) {
          setIsNavigating(true)
          router.push(
            generateAppPath({
              ...appParams,
              quoteRequestReference: data.data.quoteRequestReference,
            }).QUOTATION_LIST_URL
          )
        },
      }
    )
  }

  const onVieExistingClick = () => {
    createQuoteMutation.mutate(
      {
        getExistingQuote: true,
      },
      {
        onSuccess(data) {
          setIsNavigating(true)

          router.push(
            generateAppPath({
              ...appParams,
              quoteRequestReference: data.data.quoteRequestReference,
            }).QUOTATION_LIST_URL
          )
        },
      }
    )
  }
  return (
    <section className='flex flex-col items-center gap-6 px-6 py-8 text-center lg:w-[666px]'>
      <div className='flex size-14 items-center justify-center rounded-full bg-neutral-2'>
        <Trash2Icon className='size-6' />
      </div>
      <div>
        <p className='font-bold'>{t('title')}</p>
        <p className='text-sm text-neutral-5'>
          {t('description', { brTag: <br /> })}
        </p>
      </div>
      <div className='flex w-full flex-wrap gap-4'>
        <Button
          variant='glassy'
          className='w-full md:me-auto md:w-auto'
          size='XS'
          colorScheme='neutral'
          onClick={onCancelClick}
          disabled={createQuoteMutation.isPending}
        >
          {t('close_btn_text')}
        </Button>
        <Button
          className='flex-1 md:w-48 md:flex-initial'
          variant='outlined'
          size='XS'
          colorScheme='danger'
          onClick={onCancelExistingClick}
          isLoading={
            (createQuoteMutation.variables?.deleteActiveQuotes &&
              createQuoteMutation.isPending) ||
            isNavigating
          }
        >
          {t('cancel_existing_btn_text')}
        </Button>
        <Button
          className='flex-1 md:w-40  md:flex-initial'
          variant='solid'
          size='XS'
          colorScheme='secondary'
          onClick={onVieExistingClick}
          isLoading={
            (createQuoteMutation.variables?.getExistingQuote &&
              createQuoteMutation.isPending) ||
            isNavigating
          }
        >
          {t('view_existing_btn_text')}
        </Button>
      </div>
    </section>
  )
}
