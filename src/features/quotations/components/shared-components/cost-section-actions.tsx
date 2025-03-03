'use client'
import { Button } from '@/shared/components/ui/button'

import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { useScopedI18n } from '@/shared/locales/client'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { generateSingleQuoteQueryKey } from '../../quotes-list/resources/quotations.helpers'
import ViewDetailsSheet from './view-details-sheet'
type Props = {
  subQuoteReference: string
}

const CostSectionActions = ({ subQuoteReference }: Props) => {
  const clientQs = useClientQueryString()
  const router = useRouter()
  const isSheetOpened = Boolean(clientQs.getByKey('subQuote'))
  const appParams = useAppParam()
  const { quoteRequestReference } = appParams

  const t = useScopedI18n('application.quotations')
  const queryClient = useQueryClient()

  const handleSelectAndCustomize = () => {
    queryClient.invalidateQueries({
      queryKey: generateSingleQuoteQueryKey(quoteRequestReference),
    })

    router.replace(
      generateAppPath({
        ...appParams,
        quoteReference: subQuoteReference,
      }).QUOTE_CUSTOMIZATION_URL
    )
  }

  const handelCloseSheet = () => {
    clientQs.removeOneByKey('subQuote')
  }

  return (
    <>
      <div>
        <Button
          className='mt-3 w-full'
          variant='solid'
          colorScheme='secondary'
          size='XS'
          onClick={handleSelectAndCustomize}
        >
          {t('select_customize')}
        </Button>
        <Button
          asLink
          href={`${
            generateAppPath(appParams).QUOTATION_LIST_URL
          }?subQuote=${subQuoteReference}`}
          className='mt-3 h-fit w-full px-4 py-1'
          variant='text'
          size='XS'
        >
          {t('view_details')}
        </Button>
      </div>
      <ViewDetailsSheet isOpen={isSheetOpened} setIsOpen={handelCloseSheet} />
    </>
  )
}

export default CostSectionActions
