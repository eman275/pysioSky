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
  value?: string
}
export default function SequenceNumberFormField({ isDisabled }: Props) {
  const t = useScopedI18n('application.fleetDetails')
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name='sequenceNumber'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold'>
            {t('add_vehicle.sequence_number')}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type='number'
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
