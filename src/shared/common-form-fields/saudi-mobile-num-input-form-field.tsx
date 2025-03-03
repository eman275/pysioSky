import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { useFormContext } from 'react-hook-form'

type SaudiMobileNumFormFieldProps = {
  label: string
  formName: string
}

export default function SaudiMobileNumFormField({
  formName,
  label,
}: SaudiMobileNumFormFieldProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={formName}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                required
                placeholder='05xxxxxxxxx'
                maxLength={10}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
