import React from 'react'
import TrashIcon from '@/shared/components/icons/trash-icon.svg'
import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
import useFleetListStore from '../../hooks/use-fleet-list-store'
import {
  DeleteVehiclePayload,
  useDeleteVehicleMutation,
} from '@/feat/fleet-details/resources/delete-vehicle.mutation'
import useAppParam from '@/shared/hooks/use-app-params'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { useResetVehicleMutation } from '@/feat/fleet-details/resources/reset-vehicle.mutation'
import { useRouter } from 'next/navigation'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import {
  CreateQuotesPayload,
  useCreateQuotesMutation,
} from '../../../resources/create-quotes.mutation'
import useAppNavigationLoader from '@/shared/hooks/use-app-navigation-loader'

type DeleteWarningVehicleModalProps = {
  type: 'single' | 'multi' | 'proceed'
}

const DeleteWarningVehicleModal = ({
  type,
}: DeleteWarningVehicleModalProps) => {
  const clientQs = useClientQueryString()
  const { isNavigating, setIsNavigating } = useAppNavigationLoader()

  const { checkedList, toggleDialog, clickedItem, totalErrors, vehiclesList } =
    useFleetListStore()

  const router = useRouter()
  const {
    crNumber,
    correlationId,
    entityReference: entityReference,
    applicationReference,
  } = useAppParam()
  const deleteVehicleMutation = useDeleteVehicleMutation()
  const resetVehicleMutation = useResetVehicleMutation()
  const createQuotesMutation = useCreateQuotesMutation()

  const totalSelected = checkedList.length

  const t = useScopedI18n('application.fleetDetails')

  const onCloseHandler = () => {
    toggleDialog(false)
  }

  const onDeleteHandler = () => {
    let payload: DeleteVehiclePayload | undefined
    switch (type) {
      case 'single':
        if (clickedItem)
          payload = {
            references: [clickedItem.applicationVehicleReference],
            correlationId,
          } satisfies DeleteVehiclePayload

        break
      case 'multi':
        payload = {
          references: checkedList,
          correlationId,
        } satisfies DeleteVehiclePayload
        break
      case 'proceed':
        resetVehicleMutation.mutate(
          { resetType: 'invalid' },
          {
            onSuccess() {
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
            },
            onError(e) {
              console.log('eeeeeeee', e)
            },
          }
        )
    }
    if (payload) {
      deleteVehicleMutation.mutate(payload, {
        onSuccess() {
          toggleDialog(false)
          const pageNumber = clientQs.getByKey('pageNumber') || '1'
          const prevPage = +pageNumber - 1
          if (vehiclesList.length <= 1) {
            clientQs.set([
              {
                key: 'pageNumber',
                value: String(prevPage <= 0 ? 1 : prevPage),
              },
            ])
          }
        },
      })
    }
  }

  const getTitleMessage = () => {
    if (type === 'multi') {
      return totalSelected > 1
        ? t('delete_warning_vehicle.are_you_sure_multi', {
            total: totalSelected,
          })
        : t('delete_warning_vehicle.are_you_sure')
    } else if (type === 'proceed') {
      return totalErrors > 1
        ? t('delete_warning_vehicle.are_you_sure_multi', { total: totalErrors })
        : t('delete_warning_vehicle.are_you_sure')
    } else {
      return t('delete_warning_vehicle.are_you_sure')
    }
  }

  const getBodyMessage = () => {
    if (type === 'multi') {
      return totalSelected > 1
        ? t('delete_warning_vehicle.this_will_delete_title_multi', {
            total: totalSelected,
          })
        : t('delete_warning_vehicle.this_will_delete_title')
    } else if (type === 'proceed') {
      return totalErrors > 1
        ? t('delete_warning_vehicle.this_will_delete_title_multi', {
            total: totalErrors,
          })
        : t('delete_warning_vehicle.this_will_delete_title')
    } else {
      return t('delete_warning_vehicle.this_will_delete_title')
    }
  }
  return (
    <div className='flex w-full flex-col items-center justify-center px-6 py-8 lg:max-w-[400px]'>
      <div className='mb-6 flex size-14 items-center justify-center rounded-full border bg-neutral-2 '>
        <TrashIcon />
      </div>
      <p className='mb-1 text-center text-base font-bold'>
        {getTitleMessage()}
      </p>
      <p className='mb-6 text-center text-sm text-neutral-5'>
        {getBodyMessage()}
      </p>

      <div className='flex w-full items-center justify-between gap-2'>
        <Button
          colorScheme='neutral'
          className='flex-1'
          size='XS'
          variant='glassy'
          onClick={onCloseHandler}
        >
          {t('delete_warning_vehicle.cancel')}
        </Button>
        <Button
          isLoading={
            deleteVehicleMutation.isPending ||
            resetVehicleMutation.isPending ||
            createQuotesMutation.isPending ||
            isNavigating
          }
          className='flex-1'
          colorScheme='danger'
          size='XS'
          onClick={onDeleteHandler}
        >
          {t('delete_warning_vehicle.yes_delete')}
        </Button>
      </div>
    </div>
  )
}

export default DeleteWarningVehicleModal
