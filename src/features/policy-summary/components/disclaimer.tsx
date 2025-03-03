import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { useScopedI18n } from '@/shared/locales/client'

export default function Disclaimer() {
  const t = useScopedI18n('application.paymentDetails.disclaimer')
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name='summaryPaymentDisclaimer'
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <FormControl>
            <div className='my-2 flex items-start gap-2'>
              <Checkbox
                id='disclaimer'
                onCheckedChange={() => onChange(!value)}
                checked={value}
                className='mt-1'
              />
              <label
                className='flex cursor-pointer flex-col gap-1'
                htmlFor='disclaimer'
              >
                <b className='text-sm font-bold text-base-black'>
                  {t('disclaimer_1')}
                </b>
                <span className='text-sm text-neutral-5'>
                  {t('disclaimer_2')}
                </span>
                <span className='text-sm text-neutral-5'>
                  {t('disclaimer_3')}{' '}
                  <a
                    className='cursor-pointer underline'
                    href='https://www.tameeni.com/terms-and-conditions'
                    target='_blank '
                  >
                    {t('terms_conditions')}
                  </a>
                </span>
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
