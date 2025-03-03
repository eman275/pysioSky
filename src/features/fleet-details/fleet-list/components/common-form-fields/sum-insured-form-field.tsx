import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { useScopedI18n } from '@/shared/locales/client'
import { useInputsConfigQuery } from '@/shared/resources/configuration/inputs.query'
import { useFormContext } from 'react-hook-form'

type Props = {
  isRequired?: boolean
}
export default function SumInsuredFormField({ isRequired = true }: Props) {
  const tAddVehicle = useScopedI18n('application.fleetDetails.add_vehicle')
  const tTooltip = useScopedI18n('application.fleetDetails')

  const tCommon = useScopedI18n('common.units')
  const form = useFormContext()
  const { data: inputs } = useInputsConfigQuery()
  const maxSumInsuredValue = inputs?.vehicleEstimatedValue?.maximum
  const maxSumInsuredLength = maxSumInsuredValue
    ? String(maxSumInsuredValue).length
    : undefined

  return (
    <FormField
      control={form.control}
      name='sumInsured'
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel
              isRequired={isRequired}
              tooltip={tTooltip('sum_insured_tooltip')}
            >
              {tAddVehicle('sum_insured')}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type='number'
                maxLength={maxSumInsuredLength}
                inputSuffix={
                  <p className='whitespace-nowrap text-xs'>{tCommon('SAR')}</p>
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
