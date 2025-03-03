import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { useScopedI18n } from '@/shared/locales/client'
import { useFormContext } from 'react-hook-form'
import { PURPOSE_INSURANCE_TYPE_ENUM } from '@/features/fleet-details/fleet-details.types'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/RadioGroup'

type Props = {
  newInsuranceRadioButtonId: string
  ownershipRadioButtonId: string
  isOwnershipDisabled?: boolean
  isDisabled?: boolean
}
export default function PurposeOfInsuranceFormField({
  newInsuranceRadioButtonId,
  ownershipRadioButtonId,
  isOwnershipDisabled,
  isDisabled,
}: Props) {
  const t = useScopedI18n('application.fleetDetails')
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name='purposeOfInsurance'
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold'>
            {t('add_vehicle.purpose_of_insurance')}
          </FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              name='purposeOfInsurance'
              onValueChange={field.onChange}
              className='flex items-center gap-4 lg:justify-between lg:gap-0'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={PURPOSE_INSURANCE_TYPE_ENUM.New_Insurance.toString()}
                  id={newInsuranceRadioButtonId}
                  className='flex size-4 items-center justify-center border-2 p-2'
                  disabled={isDisabled}
                  label={t('add_vehicle.new_insurance')}
                  labelClassName='ms-2'
                />
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={PURPOSE_INSURANCE_TYPE_ENUM.Ownership_Transfer.toString()}
                  id={ownershipRadioButtonId}
                  className='flex size-4 items-center justify-center border-2 p-2'
                  disabled={isOwnershipDisabled || isDisabled}
                  label={t('add_vehicle.ownership_transfer')}
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
