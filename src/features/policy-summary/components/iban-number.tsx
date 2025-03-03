import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'

import { useFormContext } from 'react-hook-form'
import { useScopedI18n } from '@/shared/locales/client'

export default function IbanNumber() {
  const form = useFormContext()
  const t = useScopedI18n('application.paymentDetails')
  return (
    <Card className='mb-6 w-full'>
      <CardHeader>
        <CardTitle className='text-sm'>{t('iban_number')}</CardTitle>
      </CardHeader>
      <CardContent className='lg:w-1/2'>
        <FormField
          control={form.control}
          name='iban'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  inputPrefix='SA'
                  placeholder='00 00 000000000000000000'
                  required
                  maxLength={22}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
