import { Button } from '@/shared/components/ui/button'
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
  VehicleError,
} from '../../../fleet-details.types'
import {
  FixVehiclePayload,
  useFixVehicleMutation,
} from '../../../resources/fix-vehicle.mutation'
import useFleetListStore from '../../hooks/use-fleet-list-store'
import useFixErrorVehicleFormSchema from '../../schemas/fix-error-vehicle-schema'
import { DialogCloseX } from '@/shared/components/ui/dialog'
import SumInsuredFormField from '../common-form-fields/sum-insured-form-field'
import SequenceNumberFormField from '../common-form-fields/sequence-number-form-field'
import PurposeOfInsuranceFormField from '../common-form-fields/purpose-of-insurance-form-field'
import InsuranceTypeFormField from '../common-form-fields/insurance-type-form-field'
import CustomNumberFormField from '../common-form-fields/custom-number-form-field'
import CalenderIcon from '@/shared/components/icons/calender.svg'
import ControlledOptionsDropdownFormField from '../common-form-fields/controlled-options-dropdown-form-field'
import { useGetModelYearOptions } from '../../hooks/use-get-options'
import { getToastCard } from '../../helpers'
import { VEHICLE_ERROR_CODES } from '@/shared/lib/constants'
import { includesAny } from '@/shared/lib/utils'
// import { VEHICLE_ERROR_CODES } from '@/shared/lib/constants/error-codes'

const FixErrorVehicleForm = () => {
  const fixVehicleMutation = useFixVehicleMutation()
  const { correlationId } = useAppParam()
  const { clickedItem, toggleDialog } = useFleetListStore()
  const yearOptions = useGetModelYearOptions()
  const errorCodes =
    clickedItem?.errors.map((err: VehicleError) => err.code) ?? []
  const isVehicleHasSequenceNumber = includesAny(errorCodes, [
    'VEHICLE-409-SEQUENCE',
  ])
  const isCustom =
    clickedItem?.vehicleUniqueType === REGISTER_TYPE_ENUM.CUSTOM &&
    !isVehicleHasSequenceNumber

  const t = useScopedI18n('application.fleetDetails')
  const formSchema = useFixErrorVehicleFormSchema()
  type FormValues = z.infer<typeof formSchema>

  const sequenceNumber = isVehicleHasSequenceNumber
    ? clickedItem?.errors.filter(
        (el) => el.code === String(VEHICLE_ERROR_CODES.VEHICLE_409_SEQUENCE)
      )[0].message
    : !isCustom
      ? String(clickedItem?.vehicleIdentifier)
      : ''

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      sequenceNumber: sequenceNumber,
      customNumber: isCustom ? String(clickedItem?.vehicleIdentifier) : '',
      sumInsured: String(clickedItem?.vehicleEstimatedValue),
      insuranceType:
        String(clickedItem?.insuranceType) ||
        INSURANCE_TYPE_ENUM.Comprehensive.toString(),
      purposeOfInsurance: clickedItem?.isOwnershipTransfer
        ? PURPOSE_INSURANCE_TYPE_ENUM.Ownership_Transfer.toString()
        : PURPOSE_INSURANCE_TYPE_ENUM.New_Insurance.toString(),
    },
  })

  const isModelYearDisabled =
    !isCustom &&
    form.watch('purposeOfInsurance') ===
      PURPOSE_INSURANCE_TYPE_ENUM.New_Insurance.toString()

  const onSubmit = (values: FormValues) => {
    if (values && clickedItem) {
      const vehicleIdentifier = isCustom
        ? values.customNumber
        : values.sequenceNumber
      const isOwnershipTransfer =
        values.purposeOfInsurance ==
        PURPOSE_INSURANCE_TYPE_ENUM.Ownership_Transfer.toString()
          ? true
          : false
      const payload: FixVehiclePayload = {
        applicationVehicleReference: clickedItem.applicationVehicleReference,
        vehicleIdentifier: Number(vehicleIdentifier),
        vehicleUniqueType: isVehicleHasSequenceNumber
          ? REGISTER_TYPE_ENUM.SEQUENCE
          : clickedItem.vehicleUniqueType,
        isOwnershipTransfer: isOwnershipTransfer,
        manufactureYear: Number(values.modelYear),
        newVehicleEstimatedValue: Number(values.sumInsured),
        newInsuranceType: Number(values.insuranceType),
        correlationId: correlationId,
      }
      fixVehicleMutation.mutate(payload, {
        onSuccess(data) {
          const isSuccess = !Boolean(data?.data?.errors)
          getToastCard(
            isSuccess,
            t('vehicle_fix_successfully'),
            t('vehicle_fix_warning')
          )

          toggleDialog(false)
        },
      })
    }
  }

  return (
    <div className='flex w-full flex-col bg-white px-6 py-10 lg:w-[500px]'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-bold text-black'>
          {isVehicleHasSequenceNumber
            ? `${t('add_vehicle.confirm_vehicle_details')}`
            : `${t('add_vehicle.fix_vehicle_details')}`}
        </p>
        <DialogCloseX notAbsolute />
      </div>

      {!isVehicleHasSequenceNumber && (
        <p className=' text-sm text-black'>{t('add_vehicle.sub_title')}</p>
      )}

      <div className='mt-5 flex w-full flex-col items-center justify-center '>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='mb-4'>
              {isCustom ? (
                <CustomNumberFormField />
              ) : (
                <SequenceNumberFormField
                  isDisabled={isVehicleHasSequenceNumber}
                />
              )}
            </div>

            <div className='mb-4'>
              <PurposeOfInsuranceFormField
                newInsuranceRadioButtonId='fix-new-insurance'
                ownershipRadioButtonId='fix-ownership-transfer'
                isOwnershipDisabled={isCustom}
              />
            </div>

            <div className='my-6'>
              {!isModelYearDisabled && (
                <ControlledOptionsDropdownFormField
                  name='modelYear'
                  label={t('add_vehicle.model_year')}
                  options={yearOptions}
                  icon={<CalenderIcon />}
                />
              )}
            </div>

            <div className='mb-4'>
              <SumInsuredFormField />
            </div>

            <div className='mb-4'>
              <InsuranceTypeFormField
                thirdPartyRadioButtonId='fix-third-party'
                compRadioButtonId='fix-comp'
              />
            </div>

            <div className=' flex w-full pt-6 lg:items-center lg:justify-center lg:border-none lg:px-0 lg:shadow-none '>
              <Button
                isLoading={fixVehicleMutation.isPending}
                className=' flex w-full  items-center justify-center '
                size='M'
                colorScheme='secondary'
                type='submit'
              >
                {isVehicleHasSequenceNumber
                  ? `${t('add_vehicle.confirm_vehicle')}`
                  : `${t('add_vehicle.save_changes')}`}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default FixErrorVehicleForm
