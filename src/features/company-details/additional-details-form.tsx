'use client'

import {
  CreateApplicationPayload,
  useCreateApplicationMutation,
} from '@/feat/company-details/resources/create-application.mutation'
import {
  EntitySizeLookupResponse,
  useEntitySizeLookUpQuery,
} from '@/feat/company-details/resources/entity-size.mutation'
import useCreateApplicationSchema from '@/feat/company-details/schemas/use-create-application-schema'
import SaudiMobileNumFormField from '@/shared/common-form-fields/saudi-mobile-num-input-form-field'
import EmailIcon from '@/shared/components/icons/email-icon.svg'
import DatePickerInput from '@/shared/components/ui/date-picker-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import NextBtn from '@/shared/components/ui/next-btn'
import SingleSelect from '@/shared/components/ui/select/single-select'
import useAppNavigationLoader from '@/shared/hooks/use-app-navigation-loader'
import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import { formatDate } from '@/shared/lib/utils'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import { useCrNumberQuery } from '@/shared/resources/application/cr-number.mutation'
import { useInputsConfigQuery } from '@/shared/resources/configuration/inputs.query'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
export default function AdditionalDetailsForm() {
  const tAdditional = useScopedI18n(
    'application.company-details.additionalDetails'
  )
  const router = useRouter()
  const { isNavigating, setIsNavigating } = useAppNavigationLoader()
  const currentLocale = useCurrentLocale()
  const { data: entities } = useEntitySizeLookUpQuery()
  const { data: inputs } = useInputsConfigQuery()
  const { minimum, maximum } = inputs?.policyEffectiveDate || {}
  const createApplication = useCreateApplicationMutation()
  const { crNumber, correlationId } = useAppParam()
  const { data: crDetails } = useCrNumberQuery({ crNumber })
  const { entityReference = '' } = crDetails ?? {}

  const entityOptions = entities?.map((entity: EntitySizeLookupResponse) => ({
    id: entity.id,
    label: currentLocale === 'en' ? entity.nameEnglish : entity.nameArabic,
    value: String(entity.id),
  }))

  const today = new Date()
  const minSelectableDate = addDays(today, 1)

  const formSchema = useCreateApplicationSchema()
  type FormValues = z.infer<typeof formSchema>
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      effectiveDate: minSelectableDate,
    },
  })

  const onSubmit = (values: FormValues) => {
    const payload = {
      entityReference,
      entitySizeId: Number(values.entitySize),
      policyEffectiveDate: formatDate(values.effectiveDate, 'forApi'),
      contactEmail: values.beneficiaryEmail,
      contactMobileNo: values.contactPersonDetails,
    } satisfies CreateApplicationPayload
    createApplication.mutate(payload, {
      onSuccess(data) {
        setIsNavigating(true)
        const entityReference = crDetails?.entityReference
        const applicationReference = data?.data?.applicationReference
        router.push(
          generateAppPath({
            crNumber,
            entityReference,
            correlationId,
            applicationReference,
          }).SELECTED_METHOD
        )
      },
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col lg:block lg:gap-20'
      >
        <div className='grid grid-cols-1 gap-x-2 gap-y-4 lg:grid-cols-2'>
          <FormField
            control={form.control}
            name='effectiveDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>
                  {tAdditional('choose_policy_effective_date')}
                </FormLabel>
                <FormControl>
                  <DatePickerInput
                    date={field.value ? new Date(field.value) : undefined}
                    setDate={(date) => field.onChange(date)}
                    minDate={minimum}
                    maxDate={maximum}
                    minSelectableDate={minSelectableDate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='entitySize'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>{tAdditional('entity_size')}</FormLabel>
                <FormControl>
                  <SingleSelect
                    placeholder={tAdditional('entity_size')}
                    ref={field.ref}
                    options={entityOptions ?? []}
                    onChange={field.onChange}
                    value={field.value}
                    controllerStyle='p-1'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SaudiMobileNumFormField
            label={tAdditional('contact_person_details')}
            formName='contactPersonDetails'
          />

          <FormField
            control={form.control}
            name='beneficiaryEmail'
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel isRequired>{tAdditional('email')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={tAdditional('email')}
                    isInvalid={invalid}
                    ref={field.ref}
                    onChange={field.onChange}
                    value={field.value}
                    hasIcon
                    inputPrefix={<EmailIcon />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='mt-8 border-t border-neutral-3'></div>

        <NextBtn
          type='submit'
          isLoading={createApplication.isPending || isNavigating}
        />
      </form>
    </Form>
  )
}
