import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { useScopedI18n } from '@/shared/locales/client'
import { useFormContext } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/RadioGroup'
import { REGISTER_TYPE_ENUM } from '@/features/fleet-details/fleet-details.types'

type Props = {
  resetOnRegistrationTypeChange: () => void
}
export default function RegistrationTypeFormField({
  resetOnRegistrationTypeChange,
}: Props) {
  const t = useScopedI18n('application.fleetDetails')
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name='registrationType'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold'>
            {t('add_vehicle.registration_type')}
          </FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value)
                resetOnRegistrationTypeChange()
              }}
              name='registrationType'
              className='flex items-center gap-4 lg:justify-between lg:gap-0'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={REGISTER_TYPE_ENUM.SEQUENCE.toString()}
                  id='sequence'
                  className='flex size-4 items-center justify-center border-2 p-2'
                  label={t('add_vehicle.sequence_number')}
                  labelClassName='ms-2'
                />
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={REGISTER_TYPE_ENUM.CUSTOM.toString()}
                  id='custom'
                  className='flex size-4 items-center justify-center border-2 p-2'
                  label={t('add_vehicle.custom_number')}
                  labelClassName='ms-2'
                />
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
