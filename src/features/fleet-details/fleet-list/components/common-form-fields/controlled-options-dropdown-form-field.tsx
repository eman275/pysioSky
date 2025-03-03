import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import SingleSelect from '@/shared/components/ui/select/single-select'
import { useFormContext } from 'react-hook-form'
import { SelectOptionContract } from '@/shared/components/ui/select/common'
import { ReactNode } from 'react'

type Props = {
  name: string
  label: string
  options: SelectOptionContract[]
  isDisabled?: boolean
  icon?: ReactNode
  handleChange?: (option: string | number) => void
  isLoading?: boolean
}

export default function ControlledOptionsDropdownFormField({
  name,
  label,
  options,
  isDisabled,
  icon,
  handleChange,
  isLoading,
}: Props) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-sm font-bold'>{label}</FormLabel>
          <FormControl>
            <SingleSelect
              ref={field.ref}
              options={options}
              onChange={(option) => {
                if (handleChange) {
                  handleChange(option)
                }
                field.onChange(option)
              }}
              value={field.value}
              isSearchable
              startIcon={icon}
              isDisabled={isDisabled}
              isLoading={isLoading}
              controllerStyle='p-1'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
