'use client'
import { cn, formatThousandsSeparators } from '@/shared/lib/utils'
import { useCurrentLocale } from '@/shared/locales/client'
import React from 'react'
import { Card } from './card'
import { Input } from './input'
import { Slider } from './slider'

type Props = {
  min: number
  max: number
  value: number
  setValue(value: number): void
  title: string
  isInvalid?: boolean
  errorMessage?: string
  className?: string
  unit?: string
  fieldName?: string
  inputRef: React.Ref<HTMLInputElement>
}
function SliderInput(props: Props) {
  const {
    inputRef,
    min,
    max,
    value,
    title,
    isInvalid,
    errorMessage,
    setValue,
    className,
    unit,
    fieldName,
  } = props

  const locale = useCurrentLocale()

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value

      if (value > max) return

      setValue(value)
    },
    [max, setValue]
  )
  const handleSliderChange = React.useCallback(
    (values: number[]) => {
      setValue(values?.[0])
    },
    [setValue]
  )

  return (
    <Card className={cn('py-2', className)} data-testid='saving-amount-section'>
      <div
        className='flex items-center justify-between'
        data-testid='saving-amount-header'
      >
        <h4 className='ms-2 text-sm font-bold'>{title}</h4>
        <div className='w-[6.25rem]'>
          <Input
            ref={inputRef}
            name={fieldName}
            type='text'
            min={min}
            max={max}
            value={value ? String(value) : undefined}
            className='h-8 text-xs font-bold'
            onChange={handleInputChange}
            inputSuffix={unit}
          />
        </div>
      </div>
      {isInvalid && (
        <span className='text-xs font-bold text-error-6'>{errorMessage}</span>
      )}
      <Slider
        name={fieldName}
        step={1}
        className='mb-3 mt-5'
        min={min}
        max={max}
        value={[value]}
        defaultValue={value ? [value] : [min]}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        onValueChange={handleSliderChange}
      />
      <div
        className='my-2 flex justify-between text-xs text-neutral-5'
        data-testid='saving-amount-controls'
      >
        <span
          data-testid='saving-min-amount'
          className='flex items-center gap-1'
        >
          {formatThousandsSeparators(min)}
          <span>{unit}</span>
        </span>
        <span
          data-testid='saving-max-amount'
          className='flex items-center gap-1'
        >
          {formatThousandsSeparators(max)}
          <span>{unit}</span>
        </span>
      </div>
    </Card>
  )
}

export default SliderInput
