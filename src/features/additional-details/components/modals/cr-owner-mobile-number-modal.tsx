import SaudiMobileNumFormField from '@/shared/common-form-fields/saudi-mobile-num-input-form-field'
import PhoneIcon from '@/shared/components/icons/phone-icon.svg'
import { Button } from '@/shared/components/ui/button'
import { Form } from '@/shared/components/ui/form'
import { useScopedI18n } from '@/shared/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import useAdditionalDetailsStore from '../../hooks/use-additional-details-store'
import useVerifyCompanyOwnerMutation from '../../resources/use-verify-company-owner.mutation'
import useOwnerPhoneNumberSchema from '../../use-owner-phone-number-schema'
import SelectAnotherCrOwnerBtn from '../select_another_cr_owner-btn'
import useSendOtpMutation from '../../resources/use-send-otp.mutation'
import { toast } from 'sonner'
import { ERROR_CODES } from '@/shared/lib/constants'

const CrOwnerMobileNumberModal = () => {
  // hooks
  const t = useScopedI18n('application.additionalDetails')
  const { setActiveContent, selectedDetails, setSelectedDetails } =
    useAdditionalDetailsStore()
  const { ownerReference, ownerNationalId } = selectedDetails ?? {}
  // queries and mutations
  const verifyCompanyOwnerMutation = useVerifyCompanyOwnerMutation()
  const sendOtpMutation = useSendOtpMutation()
  // form
  const formSchema = useOwnerPhoneNumberSchema()
  type FormValues = z.infer<typeof formSchema>
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const onSubmit = async (values: FormValues) => {
    if (!ownerReference) return

    try {
      const res = await verifyCompanyOwnerMutation.mutateAsync({
        mobileNumber: values.ownerPhoneNumber,
        ownerReference,
      })

      if (!res.data.isVerified) {
        return setActiveContent('mobile-number-id-mismatch')
      }

      sendOtpMutation.mutate(
        {
          crOwnerReference: ownerReference,
          mobileNumber: values.ownerPhoneNumber,
        },
        {
          onSuccess: (res) => {
            setSelectedDetails({
              otpReference: res.data.otpReference,
              ownerPhoneNumber: values.ownerPhoneNumber,
              otpExpirationInSeconds: res.data.expiresInSeconds,
            })
            setActiveContent('otp-verification')
          },
          onError: (e) => {
            if (
              e.response?.data.errorCode === String(ERROR_CODES.OTP_BLOCKED)
            ) {
              return setActiveContent('exceeded-available-attempts')
            }

            toast.error('Failed to send otp, please try again!')
          },
        }
      )
    } catch (error) {
      setActiveContent('verification-service-down-error')
    }
  }
  return (
    <div>
      <div className=' flex flex-col items-center justify-center '>
        <div className='mb-6 flex size-20 items-center justify-center rounded-full border bg-primary-1 p-5'>
          <PhoneIcon />
        </div>
        <p className='text-xxl font-bold text-base-black'>
          {t('cr_owner_mobile_number.title')}
        </p>
        <p className='mb-6 text-center text-base text-neutral-5 '>
          {t('cr_owner_mobile_number.description', { id: ownerNationalId })}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SaudiMobileNumFormField
            label={t('cr_owner_mobile_number.title')}
            formName='ownerPhoneNumber'
          />
          <Button
            type='submit'
            className='mt-8 w-full text-base'
            variant='solid'
            colorScheme='secondary'
            size='M'
            isLoading={
              verifyCompanyOwnerMutation.isPending || sendOtpMutation.isPending
            }
          >
            {t('cr_owner_mobile_number.sent_otp')}
          </Button>
          <SelectAnotherCrOwnerBtn />
        </form>
      </Form>
    </div>
  )
}

export default CrOwnerMobileNumberModal
