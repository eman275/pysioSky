'use client'
import { RadioGroup } from '@/shared/components/ui/RadioGroup'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/shared/components/ui/form'
import NextBtn from '@/shared/components/ui/next-btn'
import useAsyncFormReset from '@/shared/hooks/use-async-form-reset'
import { useScopedI18n } from '@/shared/locales/client'
import PageRecoverState from '@/shared/ui-states/page-recover-state'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useAdditionalDetailsStore from '../hooks/use-additional-details-store'
import { CrOwnerContract } from '../resources/additional-details.types'
import useEditVatNumberMutation from '../resources/use-edit-vat-number.mutation'
import { useGetCrOwnersQuery } from '../resources/use-get-cr-owners.query'
import useOwnerDetailsSchema from '../schemas/use-owner-details-schema'
import AdditionDetailsDialog from './additional-details-dialog'
import VatInputFormField from './common-form-fields/vat-input-form-field'
import OwnerDetailsCard from './owner-details-card'
import OwnersLoadingSkeleton from './owners-loading-skeleton'

const RegisteredOwnersSection = () => {
  const t = useScopedI18n('application.additionalDetails')
  // queries and mutations
  const {
    data: crOwnersResponse,
    isPending: isLoadingOwners,
    isSuccess,
    isError,
    isFetching,
    status: queryStatus,
    refetch,
  } = useGetCrOwnersQuery()
  const { crOwners, vatNumber = '' } = crOwnersResponse ?? {}
  const editVatMutation = useEditVatNumberMutation()
  // form
  const formSchema = useOwnerDetailsSchema()
  type FormValues = z.infer<typeof formSchema>
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  useAsyncFormReset({
    form,
    queryStatus,
    data: { ownerReference: '', vatNumber },
  })

  const { setActiveContent, setSelectedDetails } = useAdditionalDetailsStore()

  const onSubmit = (values: FormValues) => {
    if (!values.ownerReference || !values.vatNumber) {
      return setActiveContent('can-not-proceed')
    }

    const selectedOwner = crOwners?.find(
      (owner) => owner.ownerReference === values.ownerReference
    )

    editVatMutation.mutate(
      { vatNumber: values.vatNumber },
      {
        onSuccess() {
          setSelectedDetails({
            ownerReference: values.ownerReference ?? '',
            vatNumber: values.vatNumber,
            ownerNationalId: selectedOwner?.identityNumber,
          })

          // reset owner reference before opening the modal
          form.setValue('ownerReference', '')

          setActiveContent('cr-owner-mobile-number')
        },
      }
    )
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='rounded-xl border border-neutral-2 p-6'>
            <VatInputFormField isLoading={isLoadingOwners} />

            <p className='mb-1 mt-6 text-sm font-bold text-base-black'>
              {t('select_one_of_cr_title')}
            </p>
            <p className='mb-3 w-2/4 text-xs font-bold text-neutral-5'>
              {t('note.title')}{' '}
              <span className='font-normal'>{t('note.description')}</span>
            </p>
            {isError && (
              <PageRecoverState isLoading={isFetching} retry={refetch} />
            )}
            <section className='mb-4'>
              <FormField
                control={form.control}
                name='ownerReference'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className='grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 xl:grid-cols-3'>
                          {isLoadingOwners && <OwnersLoadingSkeleton />}
                          {isSuccess &&
                            crOwners?.map((item: CrOwnerContract) => (
                              <OwnerDetailsCard
                                key={item.ownerReference}
                                isOwnerBlocked={item.isBlocked}
                                ownerReference={item.ownerReference}
                                ownerName={item.name}
                                ownerNationalId={item.identityNumber}
                                isSelected={field.value === item.ownerReference}
                                blockDurationMinutes={item.blockDurationMinutes}
                              />
                            ))}
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>
          </div>
          <div className='mt-5 border-t border-neutral-3'></div>
          <NextBtn type='submit' isLoading={editVatMutation.isPending} />
        </form>
      </Form>

      <AdditionDetailsDialog />
    </div>
  )
}

export default RegisteredOwnersSection
