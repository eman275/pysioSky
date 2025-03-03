'use client'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import NextBtn from '@/shared/components/ui/next-btn'
import useAppNavigationLoader from '@/shared/hooks/use-app-navigation-loader'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import useAuthActions from '@/shared/hooks/use-auth-actions'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import { useCrNumberMutation } from '@/shared/resources/application/cr-number.mutation'
import useCrNumberSchema from '@/shared/schemas/use-cr-number-schema'
import useEditCrNumberSchema from '@/shared/schemas/use-edit-cr-number-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export interface CRNumberFormProps {
  enableCheckBox?: boolean
  disableReCAPTCHA?: boolean
}

const CRNumberForm = (props: CRNumberFormProps) => {
  const { enableCheckBox, disableReCAPTCHA } = props
  const searchParams = useSearchParams()
  const { isNavigating, setIsNavigating } = useAppNavigationLoader()
  const captchaRef = useRef(null)
  const currentLocale = useCurrentLocale()
  const tCr = useScopedI18n('landing.cr_number_form')
  const crSchema = useCrNumberSchema()
  const editCrSchema = useEditCrNumberSchema()
  const { status: sessionStatus } = useSession() ?? {}
  const { signIn } = useAuthActions()

  const submitBtnRef = useRef<HTMLButtonElement>(null)

  type FormValues = z.infer<typeof crSchema | typeof editCrSchema>
  const form = useForm<FormValues>({
    resolver: zodResolver(enableCheckBox ? editCrSchema : crSchema),
    mode: 'onChange',
  })

  const router = useRouter()
  const [reCAPTCHA, setReCAPTCHA] = useState<string | null>(null)
  const [reCAPTCHAError, setEeCAPTCHAError] = useState('')
  const handelCaptchaChange = (value: string | null) => {
    setReCAPTCHA(value)
    if (reCAPTCHAError && value) setEeCAPTCHAError('')
  }

  const crNumberMutation = useCrNumberMutation()

  const isAutoSubmit = searchParams
    .get('postLoginRedirectionUrl')
    ?.includes('auto=true')

  const onSubmit = ({
    crNumber,
  }: z.infer<typeof crSchema | typeof editCrSchema>) => {
    if (sessionStatus === 'unauthenticated') {
      setIsNavigating(true)
      // clientQs.set([{ key: 'auto', value: 'true' }])
      return signIn({ postLoginRedirectionUrl: `/?auto=true` })
    }

    if (!reCAPTCHA) {
      return setEeCAPTCHAError('not_robot')
    }

    setEeCAPTCHAError('')

    crNumberMutation.mutate(
      { crNumber },
      {
        onSuccess(data) {
          setIsNavigating(true)

          const { correlationId, entityReference } = data

          router.push(
            generateAppPath({
              crNumber,
              entityReference,
              correlationId,
            }).ADDITIONAL_DETAILS_URL
          )
        },
      }
    )
  }

  useEffect(() => {
    if (isAutoSubmit && !isNavigating && sessionStatus === 'authenticated') {
      submitBtnRef.current?.click()
    }
  }, [isAutoSubmit, isNavigating, searchParams, sessionStatus])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='crNumber'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={tCr('insert_number')}
                  required
                  type='number'
                  maxLength={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {enableCheckBox && (
          <FormField
            control={form.control}
            name='consentAnswer'
            render={({ field }) => (
              <FormItem className='my-4 grid w-full grid-cols-[auto,1fr] items-center gap-2'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>{tCr('cr_consent_text')}</FormDescription>
                <FormMessage className='col-span-2' />
              </FormItem>
            )}
          />
        )}

        {!disableReCAPTCHA && (
          <ReCAPTCHA
            sitekey={'6LfYBisqAAAAAOyXwt__b8xFXI_-nBdMI-7N56TS'}
            ref={captchaRef}
            onChange={handelCaptchaChange}
            hl={currentLocale}
            className='mt-4'
          />
        )}

        {reCAPTCHAError && (
          <p className='mb-2 text-error-6'>{tCr('not_robot')}</p>
        )}
        {!enableCheckBox ? (
          <Button
            isLoading={crNumberMutation.isPending || isNavigating}
            className='mt-6 w-full uppercase'
            variant='solid'
            colorScheme='secondary'
            size='L'
            type='submit'
            btnRef={submitBtnRef}
          >
            {tCr('get_quote')}
          </Button>
        ) : (
          <NextBtn
            type='submit'
            isLoading={crNumberMutation.isPending || isNavigating}
          />
        )}
      </form>
    </Form>
  )
}

export default CRNumberForm
