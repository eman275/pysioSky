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
import { INSURANCE_TYPE_ENUM } from '@/features/fleet-details/fleet-details.types'

type Props = {
  thirdPartyRadioButtonId: string
  compRadioButtonId: string
  isRequired?: boolean
}

export default function InsuranceTypeFormField({
  thirdPartyRadioButtonId,
  compRadioButtonId,
  isRequired = true,
}: Props) {
  const t = useScopedI18n('application.fleetDetails')
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name='insuranceType'
      render={({ field }) => (
        <FormItem>
          <FormLabel isRequired={isRequired} className='text-sm font-bold'>
            {t('add_vehicle.insurance_type')}
          </FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className='flex items-center gap-4 lg:justify-between lg:gap-0'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={INSURANCE_TYPE_ENUM.Third_Party.toString()}
                  id={thirdPartyRadioButtonId}
                  className='flex size-4 items-center justify-center border-2 p-2'
                  label={t('add_vehicle.third_party')}
                  labelClassName='ms-2'
                />
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={INSURANCE_TYPE_ENUM.Comprehensive.toString()}
                  id={compRadioButtonId}
                  className='flex size-4 items-center justify-center border-2 p-2'
                  label={t('add_vehicle.comprehensive')}
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
