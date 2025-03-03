'use client'

import { Button } from '@/shared/components/ui/button'
import { DialogCloseX } from '@/shared/components/ui/dialog'
import { Form } from '@/shared/components/ui/form'
import useAppParam from '@/shared/hooks/use-app-params'
import { useScopedI18n } from '@/shared/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { REGISTER_TYPE_ENUM } from '../../../fleet-details.types'
import {
  EditedVehicle,
  EditVehiclePayload,
  useEditVehicleMutation,
} from '../../../resources/edit-vehicle.mutation'
import useFleetListStore from '../../hooks/use-fleet-list-store'
import useEditVehicleFormSchema from '../../schemas/use-edit-vehicle-form-schema'
import CustomNumberFormField from '../common-form-fields/custom-number-form-field'
import InsuranceTypeFormField from '../common-form-fields/insurance-type-form-field'
import SequenceNumberFormField from '../common-form-fields/sequence-number-form-field'
import SumInsuredFormField from '../common-form-fields/sum-insured-form-field'

const EditVehicleFormModal = () => {
  const t = useScopedI18n('application.fleetDetails')
  const { correlationId } = useAppParam()
  const {
    toggleDialog,
    clickedItem,
    checkedList,
    selectedItems,
    resetSelectedItems,
  } = useFleetListStore()

  const isSingleItem = Boolean(clickedItem || selectedItems.length <= 1)
  const editVehicle = useEditVehicleMutation()
  const formSchema = useEditVehicleFormSchema()
  const selectedVehicle = clickedItem || selectedItems?.[0]
  const isCustom =
    selectedVehicle?.vehicleUniqueType === REGISTER_TYPE_ENUM.CUSTOM
  const vehicleIdentifierNumber = String(
    isSingleItem ? selectedVehicle?.vehicleIdentifier : ''
  )
  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      ...(isCustom
        ? { customNumber: vehicleIdentifierNumber }
        : { sequenceNumber: vehicleIdentifierNumber }),

      sumInsured: String(
        isSingleItem ? selectedVehicle?.vehicleEstimatedValue : ''
      ),
      insuranceType: String(isSingleItem ? selectedVehicle?.insuranceType : ''),
    },
  })

  const onSubmit = (data: FormValues) => {
    let vehicles: EditedVehicle[] = []

    if (isSingleItem && clickedItem) {
      let newVehicleEstimatedValue = Number(data.sumInsured)
      let newInsuranceType = Number(data.insuranceType)

      if (newVehicleEstimatedValue === 0 && selectedItems.length > 0) {
        newVehicleEstimatedValue = selectedItems[0].vehicleEstimatedValue
      }

      if (newInsuranceType === 0 && selectedItems.length > 0) {
        newInsuranceType = selectedItems[0].insuranceType
      }

      vehicles = [
        {
          newVehicleEstimatedValue,
          newInsuranceType,
          applicationVehicleReference: clickedItem.applicationVehicleReference,
        },
      ]
    } else {
      vehicles = checkedList.map((item, index) => {
        let newVehicleEstimatedValue = Number(data.sumInsured)
        let newInsuranceType = Number(data.insuranceType)

        if (newVehicleEstimatedValue === 0 && selectedItems.length > index) {
          newVehicleEstimatedValue = selectedItems[index].vehicleEstimatedValue
        }

        if (newInsuranceType === 0 && selectedItems.length > index) {
          newInsuranceType = selectedItems[index].insuranceType
        }

        return {
          newVehicleEstimatedValue,
          newInsuranceType,
          applicationVehicleReference: item,
        }
      })
    }

    const payload: EditVehiclePayload = {
      vehicles,
      correlationId: correlationId,
    }

    editVehicle.mutate(payload, {
      onSuccess() {
        toggleDialog(false)
        form.reset()
        if (!isSingleItem) {
          resetSelectedItems()
        }
      },
    })
  }
  return (
    <div className='flex w-full flex-col items-center justify-center px-6 py-10 lg:w-[500px]'>
      <div className='flex w-full items-center justify-between'>
        <p className='text-lg font-bold text-black'>
          {isSingleItem
            ? t('add_vehicle.edit_vehicle_details')
            : t('add_vehicle.edit_vehicles_details')}
        </p>
        <DialogCloseX notAbsolute />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          {isSingleItem && !isCustom && (
            <div className='mb-4'>
              <SequenceNumberFormField isDisabled />
            </div>
          )}

          {isSingleItem && isCustom && (
            <div className='mb-4'>
              <CustomNumberFormField isDisabled />
            </div>
          )}

          <div className='mb-4'>
            <SumInsuredFormField isRequired={isSingleItem} />
          </div>
          <div className='mb-4'>
            <InsuranceTypeFormField
              thirdPartyRadioButtonId='edit-third-party'
              compRadioButtonId='edit-comp'
              isRequired={isSingleItem}
            />
          </div>
          <div className='flex w-full pt-6 lg:items-center lg:justify-center'>
            <Button
              className='flex w-full items-center justify-center'
              size='M'
              colorScheme='secondary'
              type='submit'
              isLoading={editVehicle.isPending}
              disabled={!isSingleItem && !form.formState.isDirty}
            >
              {isSingleItem
                ? t('add_vehicle.save_changes')
                : `${t('apply_changes_for_selected_vehicles')}(${
                    checkedList.length
                  })`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditVehicleFormModal
