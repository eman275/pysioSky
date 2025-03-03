import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { useScopedI18n } from '@/shared/locales/client'
import { useFormContext } from 'react-hook-form'

export default function VatInputFormField({ isLoading = false }) {
  const t = useScopedI18n('application.additionalDetails.vat_number')
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name='vatNumber'
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{t('label')}</FormLabel>
            <FormControl>
              <Input
                {...field}
                maxLength={15}
                placeholder={t('placeHolder')}
                className='w-full lg:w-2/4'
                isLoading={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
