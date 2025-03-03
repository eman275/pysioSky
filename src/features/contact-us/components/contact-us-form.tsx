'use client'
import ContactSuccessAlert from '@/features/contact-us/components/contact-success-alert'
import useGetPurposeLookupQuery from '@/features/contact-us/resources/use-get-purpose-lookup.query'
import useSendContactTicketMutation from '@/features/contact-us/resources/use-send-contact-ticket.mutation'
import useContactUsSchema from '@/features/contact-us/schemas/contact-us-schema'
import { useGetOptions } from '@/features/fleet-details/fleet-list/hooks/use-get-options'
import SaudiMobileNumFormField from '@/shared/common-form-fields/saudi-mobile-num-input-form-field'
import EmailIcon from '@/shared/components/icons/email-icon.svg'
import FlagIcon from '@/shared/components/icons/flag-error.svg'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert'
import { Button } from '@/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import SingleSelect from '@/shared/components/ui/select/single-select'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { useScopedI18n } from '@/shared/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ContactUsForm = () => {
  const tContact = useScopedI18n('contact-us')
  const tWords = useScopedI18n('common.words')

  const {
    isOpened: isSuccessModalOpened,
    setIsOpened: setIsSuccessModalOpened,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure()

  const sendContactTicketMutation = useSendContactTicketMutation()
  const { data } = useGetPurposeLookupQuery()
  const PURPOSE_OPTIONS = useGetOptions(data)

  const formSchema = useContactUsSchema()
  type FormValues = z.infer<typeof formSchema>
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      brief: '',
      contactPersonDetails: '',
      email: '',
      purpose: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    sendContactTicketMutation.mutate(
      {
        details: values.brief,
        emailAddress: values.email,
        mobileNumber: values.contactPersonDetails,
        purposeId: +values.purpose,
      },
      {
        onSuccess() {
          onSuccessModalOpen()
          form.reset()
        },
      }
    )
  }
  return (
    <div className='flex flex-1 flex-col gap-4 rounded-2xl border border-neutral-2 bg-white p-4'>
      {sendContactTicketMutation.isError && (
        <Alert status='darkError' isDismissible>
          <FlagIcon className='text-white' />
          <AlertTitle>{tWords('error')}:</AlertTitle>
          <AlertDescription>{tContact('error_alert_text')}</AlertDescription>
        </Alert>
      )}

      <div className='font-bold'>{tContact('contact_directly')}</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
            <SaudiMobileNumFormField
              label={tContact('mobile_number')}
              formName='contactPersonDetails'
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>{tContact('email_address')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={tContact('email_address')}
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
          <div className='my-4 flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='purpose'
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>{tContact('purpose')}</FormLabel>
                  <FormControl>
                    <SingleSelect
                      placeholder={tWords('choose_placeholder', {
                        name: tContact('purpose'),
                      })}
                      ref={field.ref}
                      options={PURPOSE_OPTIONS}
                      onChange={field.onChange}
                      value={field.value}
                      controllerStyle='p-1'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='brief'
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>{tContact('brief')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={tWords('enter_placeholder', {
                        name: tContact('brief'),
                      })}
                      isInvalid={invalid}
                      ref={field.ref}
                      onChange={field.onChange}
                      value={field.value}
                      type='textarea'
                      className='h-40 resize-none'
                      rows={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex items-end justify-end'>
            <Button
              type='submit'
              colorScheme='secondary'
              size='M'
              className='w-44'
              isLoading={sendContactTicketMutation.isPending}
            >
              {tContact('send')}
            </Button>
          </div>
        </form>
      </Form>

      <ContactSuccessAlert
        isOpened={isSuccessModalOpened}
        setIsOpened={setIsSuccessModalOpened}
        onClose={onSuccessModalClose}
      />
    </div>
  )
}

export default ContactUsForm
