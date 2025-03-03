'use client'

import TriangleIcon from '@/shared/components/icons/alert-triangle.svg'

import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
import useFleetListStore from '../../hooks/use-fleet-list-store'
import { useRouter } from 'next/navigation'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import useAppParam from '@/shared/hooks/use-app-params'
import {
  CreateQuotesPayload,
  useCreateQuotesMutation,
} from '../../../resources/create-quotes.mutation'
import useAppNavigationLoader from '@/shared/hooks/use-app-navigation-loader'
type Props = {
  totalVehicleCount: number
}
const SelectionWarningModal = ({ totalVehicleCount }: Props) => {
  const { toggleDialog, selectedItems } = useFleetListStore()
  const totalSelectedNumber = selectedItems.length
  const onCloseHandler = () => toggleDialog(false)
  const createQuotesMutation = useCreateQuotesMutation()
  const { isNavigating, setIsNavigating } = useAppNavigationLoader()

  const {
    crNumber,
    correlationId,
    entityReference: entityReference,
    applicationReference,
  } = useAppParam()
  const router = useRouter()
  const proceedHandler = () => {
    const payload = {
      forceNew: true,
    } satisfies CreateQuotesPayload
    createQuotesMutation.mutate(payload, {
      onSuccess: (data) => {
        setIsNavigating(true)
        router.replace(
          generateAppPath({
            crNumber,
            entityReference,
            correlationId,
            applicationReference,
            quoteRequestReference: data.data.quoteRequestReference,
          }).QUOTATION_LIST_URL
        )
      },
    })
  }

  const t = useScopedI18n('application.fleetDetails')
  return (
    <div className='flex w-full flex-col px-6 py-8 lg:max-w-[400px]'>
      <div className='flex items-center justify-center'>
        <div className='mb-6 flex size-14 items-center justify-center rounded-full border bg-error-1 text-center '>
          <TriangleIcon />
        </div>
      </div>
      <p className='mb-1 text-center text-base font-bold'>
        {t('selection_warning_modal.x_vehicles_selected', {
          selectedVehicles: totalSelectedNumber,
        })}
      </p>
      <div className='flex items-center justify-center'>
        <p className='mb-1 w-[75%] text-center text-sm'>
          {t('selection_warning_modal.do_you_want_to_proceed', {
            totalVehicles: totalVehicleCount,
          })}
        </p>
      </div>

      <div className='mt-6 flex flex-col gap-3'>
        <Button
          className='w-full'
          variant='solid'
          colorScheme='secondary'
          onClick={proceedHandler}
          size='XS'
          isLoading={createQuotesMutation.isPending || isNavigating}
        >
          {t('selection_warning_modal.neglect_and_proceed')}
        </Button>
        <Button
          className='w-full'
          variant='text'
          colorScheme='neutral'
          onClick={onCloseHandler}
          size='XS'
        >
          {t('selection_warning_modal.go_back')}
        </Button>
      </div>
    </div>
  )
}

export default SelectionWarningModal
