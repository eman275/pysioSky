import { Button } from '@/shared/components/ui/button'
import { useState } from 'react'
import { Form } from '@/shared/components/ui/form'
import useAppParam from '@/shared/hooks/use-app-params'
import { useScopedI18n } from '@/shared/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  INSURANCE_TYPE_ENUM,
  PURPOSE_INSURANCE_TYPE_ENUM,
  REGISTER_TYPE_ENUM,
} from '../../../fleet-details.types'
import {
  EditVehiclePayload,
  useEditVehicleMutation,
} from '../../../resources/edit-vehicle.mutation'
import {
  useVehicleBodyTypeLookUpQuery,
  useVehicleMakeLookUpQuery,
  useVehicleModelLookUpQuery,
} from '../../../resources/fix-form-lookups.mutation'
import CalenderIcon from '@/shared/components/icons/calender.svg'
import useFleetListStore from '../../hooks/use-fleet-list-store'
import {
  useGetModelYearOptions,
  useGetOptions,
} from '../../hooks/use-get-options'
import useEditErrorVehicleFormSchema from '../../schemas/edit-error-vehicle-schema'
import { DialogCloseX } from '@/shared/components/ui/dialog'
import SumInsuredFormField from '../common-form-fields/sum-insured-form-field'
import CustomNumberFormField from '../common-form-fields/custom-number-form-field'
import PurposeOfInsuranceFormField from '../common-form-fields/purpose-of-insurance-form-field'
import InsuranceTypeFormField from '../common-form-fields/insurance-type-form-field'
import SequenceNumberFormField from '../common-form-fields/sequence-number-form-field'
import ControlledOptionsDropdownFormField from '../common-form-fields/controlled-options-dropdown-form-field'

const EditErrorVehicleForm = () => {
  const { correlationId } = useAppParam()
  const { clickedItem, toggleDialog } = useFleetListStore()
  const selectedItem = (clickedItem ?? {}) as typeof clickedItem
  const makeValue = selectedItem?.make?.id
  const modelValue = selectedItem?.model?.id
  const bodyTypeValue = selectedItem?.bodyType?.id
  const yearValue = selectedItem?.manufactureYear
  const [makeId, setMakeId] = useState<number | undefined>(makeValue)

  const { data: make, isPending: isLoadingVehicleMake } =
    useVehicleMakeLookUpQuery()
  const { data: models, isPending: isLoadingVehicleModel } =
    useVehicleModelLookUpQuery({ makeId })
  const { data: bodyTypes, isPending: isLoadingBodyTypes } =
    useVehicleBodyTypeLookUpQuery()
  const editVehicleMutation = useEditVehicleMutation()

  const makeOptions = useGetOptions(make)
  const bodyTypesOptions = useGetOptions(bodyTypes)
  const modelOptions = useGetOptions(models)
  const yearOptions = useGetModelYearOptions()

  const isCustom = selectedItem?.vehicleUniqueType === REGISTER_TYPE_ENUM.CUSTOM

  const t = useScopedI18n('application.fleetDetails')

  const formSchema = useEditErrorVehicleFormSchema()
  type FormValues = z.infer<typeof formSchema>
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      insuranceType:
        String(clickedItem?.insuranceType) ||
        INSURANCE_TYPE_ENUM.Comprehensive.toString(),
      purposeOfInsurance: clickedItem?.isOwnershipTransfer
        ? PURPOSE_INSURANCE_TYPE_ENUM.Ownership_Transfer.toString()
        : PURPOSE_INSURANCE_TYPE_ENUM.New_Insurance.toString(),
      sequenceNumber: !isCustom ? String(clickedItem?.vehicleIdentifier) : '',
      customNumber: isCustom ? String(clickedItem?.vehicleIdentifier) : '',
      modelYear: String(yearValue),
      vehicleMake: String(makeValue),
      vehicleModel: String(modelValue),
      bodyType: String(bodyTypeValue),
      sumInsured: String(clickedItem?.vehicleEstimatedValue),
    },
  })

  const handleMakeChange = (selectedOption: string | number) => {
    setMakeId(+selectedOption)

    form.setValue('vehicleMake', selectedOption)
  }

  const onSubmit = (values: FormValues) => {
    if (values && clickedItem) {
      const vehicles = [
        {
          newVehicleEstimatedValue: Number(values.sumInsured),
          newInsuranceType: Number(values.insuranceType),
          applicationVehicleReference: clickedItem.applicationVehicleReference,
          newSelectedMakeId: Number(values.vehicleMake),
          newSelectedModelId: Number(values.vehicleModel),
          newSelectedBodyTypeId: Number(values.bodyType),
          newSelectedManufactureYear: Number(values.modelYear),
        },
      ]
      const payload: EditVehiclePayload = {
        vehicles,
        correlationId,
      }
      editVehicleMutation.mutate(payload as EditVehiclePayload, {
        onSuccess() {
          toggleDialog(false)
        },
      })
    }
  }

  const dropdownFields = [
    {
      name: 'vehicleMake',
      label: t('add_vehicle.vehicle_make'),
      options: makeOptions,
      isDisabled: !!makeValue,
      handleChange: handleMakeChange,
      isLoading: isLoadingVehicleMake,
    },
    {
      name: 'vehicleModel',
      label: t('add_vehicle.vehicle_model'),
      options: modelOptions,
      isDisabled: !!modelValue,
      isLoading: isLoadingVehicleModel,
    },
    {
      name: 'bodyType',
      label: t('add_vehicle.body_type'),
      options: bodyTypesOptions,
      isDisabled: !!bodyTypeValue,
      isLoading: isLoadingBodyTypes,
    },
    {
      name: 'modelYear',
      label: t('add_vehicle.model_year'),
      options: yearOptions,
      isDisabled: !!yearValue,
      icon: <CalenderIcon />,
    },
  ]

  return (
    <div className='flex w-full flex-col bg-white px-6 py-10 lg:w-[500px] '>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-bold text-black'>
          {t('add_vehicle.fix_vehicle_details')}
        </p>
        <DialogCloseX notAbsolute />
      </div>
      <p className='text-sm text-black'>{t('add_vehicle.sub_title')}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='mb-4'>
            {isCustom ? (
              <CustomNumberFormField isDisabled />
            ) : (
              <SequenceNumberFormField isDisabled />
            )}
          </div>

          <div className='mb-4'>
            <PurposeOfInsuranceFormField
              newInsuranceRadioButtonId='edit-new-insurance'
              ownershipRadioButtonId='edit-ownership-transfer'
              isDisabled
            />
          </div>

          <div className='my-6'>
            <div className='mb-4 grid grid-cols-1 gap-x-2 gap-y-4 lg:grid-cols-2'>
              {dropdownFields.map((field, index) => (
                <ControlledOptionsDropdownFormField
                  key={index}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  isDisabled={field.isDisabled}
                  handleChange={field.handleChange}
                  isLoading={field.options.length !== 0 && field.isLoading}
                  icon={field.icon}
                />
              ))}
            </div>
          </div>

          <div className='mb-4'>
            <SumInsuredFormField />
          </div>

          <div className='mb-4'>
            <InsuranceTypeFormField
              thirdPartyRadioButtonId='edit-third-party'
              compRadioButtonId='edit-comp'
            />
          </div>

          <div className='flex w-full pt-6 lg:items-center lg:justify-center'>
            <Button
              isLoading={editVehicleMutation.isPending}
              className='w-full'
              size='M'
              colorScheme='secondary'
              type='submit'
            >
              {t('add_vehicle.save_changes')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditErrorVehicleForm
