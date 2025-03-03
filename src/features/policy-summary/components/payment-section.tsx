import React, { forwardRef } from 'react'
import IbanNumber from './iban-number'
import Disclaimer from './disclaimer'
import { Form } from '@/shared/components/ui/form'
import usePaymentSummarySchema from '../schemas/use-payment-summary-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePaymentMutation } from '../resources/payment.mutation'
import useAppParam from '@/shared/hooks/use-app-params'
import { useRouter } from 'next/navigation'
import { useCurrentLocale } from '@/shared/locales/client'

const PaymentSection = forwardRef<HTMLButtonElement>((_, ref) => {
  const locale = useCurrentLocale()
  const culture = locale === 'en' ? 1 : 2
  const formSchema = usePaymentSummarySchema()
  type FormValues = z.infer<typeof formSchema>
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })
  const { correlationId, quoteRequestReference, quoteReference } = useAppParam()
  const mutation = usePaymentMutation()
  const router = useRouter()

  const onSubmit = () => {
    const payload = {
      quoteRequestReference,
      subQuoteResponseReference: quoteReference,
      correlationId,
      iban: `SA${form.getValues('iban')}`,
      culture,
    }
    mutation.mutate(payload, {
      onSuccess: (data) => {
        router.push(data.paymentUrl)
      },
    })
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <IbanNumber />
          <Disclaimer />
          <button type='submit' ref={ref} className='hidden'></button>
        </form>
      </Form>
    </section>
  )
})

PaymentSection.displayName = 'PaymentSection'
export default PaymentSection
