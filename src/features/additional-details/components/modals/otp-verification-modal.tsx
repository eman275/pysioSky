import OtpIcon from '@/shared/components/icons/otp-icon.svg'
import { Button } from '@/shared/components/ui/button'
import FailedAlert from '@/shared/components/ui/failed-alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shared/components/ui/input-otp'
import Timer from '@/shared/components/ui/timer'
import useAppParam from '@/shared/hooks/use-app-params'
import useValidationSchemas from '@/shared/hooks/use-validation-schema'
import { ERROR_CODES } from '@/shared/lib/constants'
import { cn } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import useAdditionalDetailsStore from '../../hooks/use-additional-details-store'
import { generateGetCrOwnersQueryKey } from '../../resources/additional-details.helpers'
import useSendOtpMutation from '../../resources/use-send-otp.mutation'
import { useValidateOtpMutation } from '../../resources/use-validate-otp.mutation'
import SelectAnotherCrOwnerBtn from '../select_another_cr_owner-btn'
import OtpSkeletonModal from './otp-skeleton-modal'
import { useRouter } from 'next/navigation'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import FlagErrorIcon from '@/shared/components/icons/flag-error.svg'

const OTPVerificationModal = () => {
  const queryClient = useQueryClient()
  const appParams = useAppParam()
  const { correlationId, entityReference: entityId } = appParams
  const router = useRouter()

  const validateOtpMutation = useValidateOtpMutation()
  const sendOtpMutation = useSendOtpMutation()
  const [optInvalidError, setOptInvalidError] = useState(false)

  const { selectedDetails } = useAdditionalDetailsStore()
  const {
    otpReference,
    ownerReference,
    ownerPhoneNumber,
    ownerNationalId,
    otpExpirationInSeconds,
  } = selectedDetails ?? {}
  const t = useScopedI18n('application.additionalDetails')
  const { setActiveContent, setSelectedDetails } = useAdditionalDetailsStore()
  const [isExpired, setIsExpired] = useState(false)
  const otpContainerRef = useRef<HTMLDivElement>(null)
  const { requiredStringSchema } = useValidationSchemas()
  const formSchema = z.object({
    otp: requiredStringSchema({
      name: 'otp',
    }),
  })

  type FormValues = z.infer<typeof formSchema>
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const { setValue: setFormValue } = form
  const resetOtp = useCallback(() => {
    setFormValue('otp', '')
  }, [setFormValue])

  const onSubmit = useCallback(
    (values: FormValues) => {
      if (!otpReference || !ownerReference) return

      validateOtpMutation.mutate(
        {
          otpReference,
          crOwnerReference: ownerReference,
          otpValue: values.otp,
        },
        {
          onError(e) {
            const errorCode = e.response?.data?.errorCode
            if (errorCode === String(ERROR_CODES.OTP_INVALID)) {
              setOptInvalidError(true)
            }

            if (errorCode === String(ERROR_CODES.OTP_EXPIRED)) {
              resetOtp()
              setIsExpired(true)
            }

            if (errorCode === String(ERROR_CODES.OTP_MAX)) {
              setActiveContent('exceeded-available-attempts')
              // optimisticallyBlockCrOwner()
              queryClient.invalidateQueries({
                queryKey: generateGetCrOwnersQueryKey(entityId, correlationId),
              })
            }
          },

          onSuccess() {
            // navigate to payment page
            router.push(generateAppPath(appParams).POLICY_SUMMARY_URL)
          },
        }
      )
    },
    [
      appParams,
      correlationId,
      entityId,
      otpReference,
      ownerReference,
      queryClient,
      resetOtp,
      router,
      setActiveContent,
      validateOtpMutation,
    ]
  )

  const handleResendOtpBtn = useCallback(() => {
    if (!ownerReference || !ownerPhoneNumber) return
    sendOtpMutation.mutate(
      {
        crOwnerReference: ownerReference,
        mobileNumber: ownerPhoneNumber,
      },
      {
        onError() {
          toast.error('failed to resend otp, please try again!')
        },
        onSuccess(data) {
          setSelectedDetails({ otpReference: data.data.otpReference })
          setIsExpired(false)
        },
      }
    )
  }, [ownerPhoneNumber, ownerReference, sendOtpMutation, setSelectedDetails])

  if (sendOtpMutation.isPending) return <OtpSkeletonModal />

  return (
    <div ref={otpContainerRef}>
      <div className='flex flex-col items-center justify-center '>
        <div className='mb-6 flex size-[88px] items-center justify-center rounded-full border bg-primary-1 p-5'>
          <OtpIcon />
        </div>
        <p className='text-xxl font-bold text-base-black'>
          {t('otp_verification.title')}
        </p>
        <p className='mb-6 text-center text-base text-neutral-5 '>
          {t('otp_verification.description', { id: ownerNationalId })}
        </p>
      </div>
      {optInvalidError && (
        <div className='mb-6'>
          <FailedAlert
            description={t('otp_verification.incorrect_otp')}
            startIcon={<FlagErrorIcon />}
          />
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel className='flex items-center justify-between'>
                    <b>{t('otp_verification.enter_the_otp_number')}</b>
                  </FormLabel>
                  <div className='flex items-baseline gap-1'>
                    {!isExpired ? (
                      <>
                        <span className='whitespace-nowrap text-sm'>
                          {t('otp_verification.otp_expires_in')}
                        </span>

                        <Timer
                          hideLabels
                          separator='Colon'
                          onCountdownFinish={() => {
                            otpContainerRef.current?.click()
                            resetOtp()
                            setIsExpired(true)
                          }}
                          deadline={{ seconds: otpExpirationInSeconds ?? 60 }}
                          descriptionClassName='font-normal'
                          containerClassName='md:p-0 m-0'
                          disableDay
                          disableHours
                        />
                      </>
                    ) : (
                      <span className='whitespace-nowrap text-sm text-neutral-4'>
                        {t('otp_verification.otp_expired')}
                      </span>
                    )}
                  </div>
                </div>
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isExpired}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={cn(isExpired && 'bg-neutral-2')}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          {!isExpired ? (
            <Button
              className='mt-8 w-full text-base'
              variant='solid'
              colorScheme='secondary'
              size='M'
              type='submit'
              isLoading={validateOtpMutation.isPending}
            >
              {t('otp_verification.verify')}
            </Button>
          ) : (
            <Button
              variant='solid'
              colorScheme='secondary'
              className='mt-8 w-full text-base'
              size='M'
              type='button'
              onClick={handleResendOtpBtn}
            >
              {t('otp_verification.resend_otp')}
            </Button>
          )}
          <SelectAnotherCrOwnerBtn />
        </form>
      </Form>
    </div>
  )
}

export default React.memo(OTPVerificationModal)
