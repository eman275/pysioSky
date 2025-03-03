import { REGEX_ANY_NUMBER } from '@/shared/lib/constants'
import { cn, testDecimalPoints } from '@/shared/lib/utils'
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import InfoTooltip from './info-tooltip'

type InputProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  inputPrefix?: ReactNode
  inputSuffix?: ReactNode
  value?: string | number
  label?: string
  required?: boolean
  isInvalid?: boolean
  errorMessage?: string
  tooltip?: string
  containerClassName?: string
  maxDecimalPlaces?: number
  disableFullWidth?: boolean
  allowNumberOnly?: boolean
  isLoading?: boolean
  rows?: number
  hasIcon?: boolean
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      containerClassName,
      className,
      type = 'text',
      inputPrefix,
      inputSuffix,
      value,
      label,
      required,
      isInvalid,
      errorMessage,
      tooltip,
      maxDecimalPlaces,
      disableFullWidth,
      onChange,
      placeholder,
      isLoading,
      disabled,
      rows = 3, // Default number of rows for textarea
      hasIcon = false,
      ...props
    },
    ref
  ) => {
    const inputChecks = (value: string) => {
      // number check
      if (type === 'number' && !REGEX_ANY_NUMBER.test(String(value))) {
        return false
      }

      if (maxDecimalPlaces) {
        // decimal places check
        const isMatch = testDecimalPoints(String(value), maxDecimalPlaces)
        if (!isMatch) return false
      }

      if (props.maxLength && String(value).length > props.maxLength) {
        // max length check
        return false
      }

      // default behavior
      return true
    }

    const commonProps = {
      className: cn([
        'flex h-12 rounded-lg border border-neutral-3 bg-white px-4 py-3 text-sm font-semibold text-base-black caret-primary-6 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-normal placeholder:capitalize placeholder:text-neutral-5 aria-[invalid=true]:border-error-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-6 focus-visible:ring-offset-0 aria-[invalid=true]:focus-visible:ring-0 disabled:cursor-not-allowed disabled:bg-neutral-2 disabled:text-neutral-4',
        inputPrefix && (hasIcon ? 'ps-11' : 'ps-8'), // Adjust padding for prefix
        inputSuffix && (hasIcon ? 'pe-11' : 'pe-8'), // Adjust padding for suffix
        isInvalid && 'border-error-6 focus-visible:ring-0',
        disableFullWidth ? '' : 'w-full',
        className,
      ]),
      onKeyDown: (e: any) => {
        const isValid = inputChecks(e.currentTarget.value)
        if (!isValid) return
      },
      onKeyUp: (e: any) => {
        const isValid = inputChecks(e.currentTarget.value)
        if (!isValid) return
      },
      onPaste: (e: any) => {
        const isValid = inputChecks(e.currentTarget.value)
        if (!isValid) return
      },
      onChange: (e: any) => {
        const isValid = inputChecks(e.target.value)
        if (!isValid) return
        onChange?.(e)
      },
      value,
      placeholder: isLoading ? 'Loading...' : placeholder,
      disabled: disabled || isLoading,
      ...props,
    }

    return (
      <div className='w-full space-y-2'>
        {label && (
          <div className='flex w-full items-center justify-between'>
            <label
              className={cn(
                'text-sm font-bold capitalize',
                isInvalid && 'text-error-6'
              )}
            >
              {label}
              {required && ' *'}
            </label>
            {tooltip && <InfoTooltip {...props}>{tooltip}</InfoTooltip>}
          </div>
        )}
        <div
          className={cn(
            'relative min-w-full',
            containerClassName,
            disabled &&
              'cursor-not-allowed rounded-lg bg-neutral-2 text-neutral-4'
          )}
        >
          {inputPrefix && (
            <div
              className={cn(
                'absolute start-3 top-1/2 flex -translate-y-1/2 transform items-center text-xs font-bold text-base-black',
                disabled && 'cursor-not-allowed bg-neutral-2 text-neutral-4'
              )}
            >
              {inputPrefix}
            </div>
          )}

          {type === 'textarea' ? (
            <textarea
              {...commonProps}
              rows={rows}
              ref={ref as React.Ref<HTMLTextAreaElement>}
            />
          ) : (
            <input
              {...commonProps}
              type={type === 'number' ? 'text' : type}
              ref={ref as React.Ref<HTMLInputElement>}
            />
          )}

          {inputSuffix && (
            <div
              className={cn(
                'absolute end-3 top-1/2 flex -translate-y-1/2 transform items-center text-xs font-bold text-base-black',
                disabled && 'cursor-not-allowed bg-neutral-2 text-neutral-4'
              )}
            >
              {inputSuffix}
            </div>
          )}
        </div>
        {isInvalid && (
          <span className='text-xs font-bold text-error-6'>{errorMessage}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
