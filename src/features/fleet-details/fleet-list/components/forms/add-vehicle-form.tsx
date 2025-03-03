'use client'
import AddIcon from '@/shared/components/icons/add.svg'
import CalenderIcon from '@/shared/components/icons/calender.svg'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { DialogCloseX } from '@/shared/components/ui/dialog'
import { Form } from '@/shared/components/ui/form'
import InfoTooltip from '@/shared/components/ui/info-tooltip'
import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import { useScopedI18n } from '@/shared/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  INSURANCE_TYPE_ENUM,
  PURPOSE_INSURANCE_TYPE_ENUM,
  REGISTER_TYPE_ENUM,
} from '../../../fleet-details.types'
import { useCreateVehicleManuallyMutation } from '../../../resources/create-vehicle-manually.mutation'
import { useResetVehicleMutation } from '../../../resources/reset-vehicle.mutation'
import { CreateVehicleManuallyPayload } from '../../../resources/types'
import useFleetListStore from '../../hooks/use-fleet-list-store'
import { useGetModelYearOptions } from '../../hooks/use-get-options'
import useInsertYourFleetDetailsSchema from '../../schemas/use-insert-your-fleet-details-schema'
import ControlledOptionsDropdownFormField from '../common-form-fields/controlled-options-dropdown-form-field'
import CustomNumberFormField from '../common-form-fields/custom-number-form-field'
import InsuranceTypeFormField from '../common-form-fields/insurance-type-form-field'
import PurposeOfInsuranceFormField from '../common-form-fields/purpose-of-insurance-form-field'
import RegistrationTypeFormField from '../common-form-fields/registration-type-form-field'
import SequenceNumberFormField from '../common-form-fields/sequence-number-form-field'
import SumInsuredFormField from '../common-form-fields/sum-insured-form-field'

type Props = {
  isDialog?: boolean
}
const AddVehicleForm = ({ isDialog }: Props) => {
  const t = useScopedI18n('application.fleetDetails')
  const { toggleDialog, vehiclesList, resetStore } = useFleetListStore()
  const { isLarge } = useScreenSize()
  const {
    crNumber,
    correlationId,
    entityReference: entityReference,
    applicationReference,
  } = useAppParam()
  const clientQs = useClientQueryString()
  const action = clientQs.getByKey('action')
  const createVehicleManually = useCreateVehicleManuallyMutation()
  const resetVehicleMutation = useResetVehicleMutation()
  const formSchema = useInsertYourFleetDetailsSchema()
  type FormValues = z.infer<typeof formSchema>
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      registrationType: REGISTER_TYPE_ENUM.SEQUENCE.toString(),
      sequenceNumber: '',
      customNumber: '',
      modelYear: '',
      sumInsured: '',
      insuranceType: INSURANCE_TYPE_ENUM.Comprehensive.toString(),
      purposeOfInsurance: PURPOSE_INSURANCE_TYPE_ENUM.New_Insurance.toString(),
    },
  })

  const yearOptions = useGetModelYearOptions()
  const isModelYearDisable =
    form.watch('registrationType') === REGISTER_TYPE_ENUM.SEQUENCE.toString() &&
    form.watch('purposeOfInsurance') ===
      PURPOSE_INSURANCE_TYPE_ENUM.New_Insurance.toString()

  useEffect(() => {
    if (isLarge) {
      toggleDialog(false)
    }
  }, [isLarge, toggleDialog])

  const resetOnRegistrationTypeChange = () => {
    form.clearErrors()
    form.resetField('customNumber')
    form.resetField('sequenceNumber')
    form.resetField('purposeOfInsurance')
  }

  const onSubmit = (values: FormValues) => {
    if (vehiclesList && action) {
      resetStore()
      resetVehicleMutation.mutate(
        { resetType: 'all' },
        {
          onSuccess() {
            clientQs.removeOneByKey('action')
          },
        }
      )
    }

    const vehicleIdentifier =
      values.registrationType === REGISTER_TYPE_ENUM.SEQUENCE.toString()
        ? values.sequenceNumber
        : values.customNumber

    const isOwnershipTransfer =
      values.purposeOfInsurance ===
      PURPOSE_INSURANCE_TYPE_ENUM.Ownership_Transfer.toString()

    const payload: CreateVehicleManuallyPayload = {
      applicationReference: applicationReference,
      correlationId: correlationId,
      vehicles: [
        {
          vehicleIdentifier: Number(vehicleIdentifier),
          manufactureYear: Number(values.modelYear),
          vehicleUniqueType: Number(values.registrationType),
          vehicleEstimatedValue: parseFloat(values.sumInsured),
          isOwnershipTransfer: isOwnershipTransfer,
          insuranceType: parseInt(values.insuranceType),
          hasTrailer: false,
          trailerEstimatedValue: null,
          repairMethod: null,
        },
      ],
    }

    createVehicleManually.mutate(payload, {
      onSuccess() {
        form.reset()
        toggleDialog(false)
      },
      onError() {
        form.reset()
      },
    })
  }

  useEffect(() => {
    if (form.formState.isSubmitted) {
      window.parent.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [form.formState.isSubmitted])
  return (
    <div>
      <Card className='flex flex-col border-none bg-white px-6 py-4 md:border'>
        {isDialog && (
          <div className='mb-4 ms-auto lg:hidden'>
            <DialogCloseX notAbsolute />
          </div>
        )}

        <h6 className='mb-6 text-center text-base font-bold lg:hidden'>
          Add Vehicle Details
        </h6>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className='flex flex-col gap-4'>
              <RegistrationTypeFormField
                resetOnRegistrationTypeChange={resetOnRegistrationTypeChange}
              />
              <PurposeOfInsuranceFormField
                newInsuranceRadioButtonId='add-new-insurance'
                ownershipRadioButtonId='add-ownership-transfer'
                isOwnershipDisabled={
                  form.watch('registrationType') ===
                  REGISTER_TYPE_ENUM.CUSTOM.toString()
                }
              />
              {form.watch('registrationType') ===
              REGISTER_TYPE_ENUM.SEQUENCE.toString() ? (
                <SequenceNumberFormField />
              ) : (
                <CustomNumberFormField />
              )}
              {!isModelYearDisable && (
                <ControlledOptionsDropdownFormField
                  name='modelYear'
                  label={t('add_vehicle.model_year')}
                  options={yearOptions}
                  icon={<CalenderIcon />}
                />
              )}
              <SumInsuredFormField />
              <InsuranceTypeFormField
                thirdPartyRadioButtonId='add-third-party'
                compRadioButtonId='add-comp'
              />
            </section>
            <div className='mt-6 flex w-full px-6 lg:items-center lg:justify-center lg:px-0 lg:shadow-none'>
              <Button
                className='w-full'
                type='submit'
                size='S'
                isLoading={createVehicleManually.isPending && !isLarge}
                disabled={createVehicleManually.isPending}
                endIcon={<AddIcon />}
              >
                {t('add_vehicle.save_add_more')}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
      <div className='mt-3 flex w-full items-center justify-center gap-2'>
        <InfoTooltip>
          <p>ggggggg</p>
        </InfoTooltip>
        <p className='text-xs'>
          {t('add_vehicle.start_a_new_vehicles.title')}
          <Link
            href={
              generateAppPath({
                crNumber,
                entityReference,
                correlationId,
                applicationReference,
              }).SELECTED_METHOD
            }
            className='cursor-pointer text-primary-6 underline'
          >
            {t('add_vehicle.start_a_new_vehicles.sub_title')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AddVehicleForm
