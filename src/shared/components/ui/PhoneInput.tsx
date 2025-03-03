'use client'
import { cn } from '@/shared/lib/utils'
import { useCurrentLocale } from '@/shared/locales/client'
import { UseFormReturn } from 'react-hook-form'
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input'
import ar from 'react-phone-number-input/locale/ar'
import en from 'react-phone-number-input/locale/en'
import 'react-phone-number-input/style.css'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'

type Props = {
  label?: string
  required?: boolean
  fieldName: string
  initialValue?: number
  form: UseFormReturn<any>
  className?: string
  placeholder?: string
}
function PhoneInputField(props: Props) {
  const locale = useCurrentLocale()
  const { label, fieldName, form, initialValue, className, placeholder } = props

  const handlePhoneChange = (value: string) => {
    if (value) {
      form.setValue(fieldName, value)
      if (isValidPhoneNumber(value) && isPossiblePhoneNumber(value)) {
        form.clearErrors(fieldName)
      }
    }
  }

  return (
    <div>
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field: { value }, fieldState: { invalid } }) => (
          <FormItem className='w-full space-y-[5px]'>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <PhoneInput
                placeholder={placeholder}
                value={value ?? initialValue}
                onChange={handlePhoneChange}
                defaultCountry='SA'
                labels={locale === 'en' ? en : ar}
                withCountryCallingCode={true}
                international={true}
                className={cn(
                  className,
                  // container
                  'dir-ltr mt-2 h-12 rounded-lg border border-neutral-3 bg-white px-4 py-3',
                  // input
                  'rtl:[&>input]:dir-rtl [&>input]:focus-within:outline-none',
                  invalid && 'border-error-6',
                  // country
                  'rtl:[&>.PhoneInputCountry]:ml-1.5 rtl:[&>.PhoneInputCountry]:mr-0',
                  // country select
                  '[&>.PhoneInputCountry>select]:px-4 [&>.PhoneInputCountry>select]:py-3',
                  // arrow
                  'rtl:[&>.PhoneInputCountry>.PhoneInputCountrySelectArrow]:ml-1.5 rtl:[&>.PhoneInputCountry>.PhoneInputCountrySelectArrow]:mr-2'
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default PhoneInputField
