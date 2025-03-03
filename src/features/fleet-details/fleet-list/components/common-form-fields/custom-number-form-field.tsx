import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { useScopedI18n } from '@/shared/locales/client'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/shared/components/ui/input'
type Props = {
  isDisabled?: boolean
}
export default function CustomNumberFormField({ isDisabled }: Props) {
  const t = useScopedI18n('application.fleetDetails')
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name='customNumber'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold'>
            {t('add_vehicle.custom_number')}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type='text'
              disabled={isDisabled}
              maxLength={10}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
