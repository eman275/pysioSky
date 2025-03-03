'use client'
import CalendarIcon from '@/shared/components/icons/calendar-icon.svg'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/components/ui/toggle-group'
import useBirthDate, { SelectOptionType } from '@/shared/hooks/use-birth-date'
import { getDaysOfMonth } from '@/shared/lib/helpers/dates'
import { cn, formatNumberWithZeroPrefix } from '@/shared/lib/utils'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import { useCallback } from 'react'
import { UseFormReturn, useController } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import InfoTooltip from './info-tooltip'
import { Input } from './input'

type Props = {
  className?: string
  fieldName: string
  variant?: 'h' | 'g'
  minAge: number
  maxAge: number
  label?: string
  tooltip?: string
  form: UseFormReturn<any>
  hasDays?: boolean
  required?: boolean
  disabled?: boolean
}
function DropdownDatePicker(props: Props) {
  const {
    className,
    fieldName,
    minAge,
    maxAge,
    label,
    tooltip,
    variant = 'g',
    form,
    hasDays = false,
    required,
    disabled,
  } = props

  const locale = useCurrentLocale()
  const tCommon = useScopedI18n('common.units')
  const { field } = useController({
    control: form.control,
    name: fieldName,
  })
  const { onChange: onFieldChange, value: fieldValue } = field
  const { getMonths, getYears } = useBirthDate()

  const splittedValue = fieldValue?.split('/') ?? []
  const day = hasDays ? splittedValue[0] : ''
  const month = hasDays ? splittedValue[1] : splittedValue[0]
  const year = hasDays ? splittedValue[2] : splittedValue[1]

  const setCalendarValue = useCallback(
    (day = '', month = '', year = '') => {
      const d = day === '00' ? '' : day
      const m = month === '00' ? '' : month

      onFieldChange(hasDays ? `${d}/${m}/${year}` : `${m}/${year}`)
    },
    [hasDays, onFieldChange]
  )

  const setSelectedDay = useCallback(
    (value: string = '') => {
      setCalendarValue(formatNumberWithZeroPrefix(Number(value)), month, year)
    },
    [month, setCalendarValue, year]
  )

  const setSelectedMonth = useCallback(
    (value: string = '') => {
      setCalendarValue('', formatNumberWithZeroPrefix(Number(value)), year)
    },
    [setCalendarValue, year]
  )

  const setSelectedYear = useCallback(
    (value: string = '') => {
      setCalendarValue(day, month, value)
    },
    [day, month, setCalendarValue]
  )

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem>
          <div className='flex w-full items-center justify-between'>
            <FormLabel tooltip={tooltip}>
              {label}
              {required && ' *'}
            </FormLabel>
            {tooltip && (
              <div className='ms-auto flex'>
                <InfoTooltip>{tooltip}</InfoTooltip>
              </div>
            )}
          </div>
          <FormControl>
            <Popover>
              <PopoverTrigger className='w-full' tabIndex={-1}>
                <Input
                  {...field}
                  readOnly
                  required={required}
                  type='text'
                  placeholder={hasDays ? '00/00/00' : '00/00'}
                  disabled={disabled}
                  className='h-10 w-full'
                  containerClassName={cn(
                    'rounded-lg h-12',
                    invalid && 'border-error-6'
                  )}
                  inputPrefix={<CalendarIcon className='h-6 w-6' />}
                  value={fieldValue}
                  isInvalid={invalid}
                />
              </PopoverTrigger>
              <PopoverContent
                className={cn('m-h-full  h-[23.75rem] p-0', className)}
              >
                {/* List Header */}
                <div
                  className={cn(
                    'mb-2 grid gap-2 rounded rounded-t-lg bg-neutral-1 px-2 py-1.5 font-bold',
                    hasDays ? 'grid-cols-7' : 'grid-cols-6'
                  )}
                >
                  {hasDays && (
                    <h5 className='col-span-1  ps-3 text-start'>
                      {tCommon('day')}
                    </h5>
                  )}
                  <h5 className='col-span-4  ps-6 text-start'>
                    {tCommon('month')}
                  </h5>
                  <h5 className='col-span-2 ps-4  text-start'>
                    {tCommon('year')}
                  </h5>
                </div>
                {/* List Content */}
                <div
                  className={cn(
                    'mx-2 grid min-h-full grid-cols-7 items-baseline gap-2 md:mx-4',
                    hasDays ? 'grid-cols-7' : 'grid-cols-6'
                  )}
                >
                  {/* DAYS */}
                  {hasDays && (
                    <ScrollArea
                      className='col-span-1 h-[20.75rem]'
                      dir={locale === 'en' ? 'ltr' : 'rtl'}
                    >
                      <ToggleGroup
                        disabled={!month}
                        size='xs'
                        type='single'
                        variant='secondary'
                        value={String(day)}
                        className='flex flex-col border-neutral-2 '
                        onValueChange={setSelectedDay}
                      >
                        {getDaysOfMonth({
                          month: month ? +month : new Date().getMonth(),
                          year: year ? +year : new Date().getFullYear(),
                        })?.map((day) => {
                          const stringifiedValue =
                            formatNumberWithZeroPrefix(+day)

                          return (
                            <ToggleGroupItem
                              value={stringifiedValue}
                              key={day}
                              className='mb-1 block text-start'
                              style={{
                                direction: `${locale === 'en' ? 'ltr' : 'rtl'}`,
                              }}
                            >
                              {day}
                            </ToggleGroupItem>
                          )
                        })}
                      </ToggleGroup>
                    </ScrollArea>
                  )}

                  {/* Months */}

                  <ScrollArea
                    className='col-span-4 h-[20.75rem]'
                    dir={locale === 'en' ? 'ltr' : 'rtl'}
                  >
                    <ToggleGroup
                      size='xs'
                      type='single'
                      variant='secondary'
                      value={String(month)}
                      className={cn(
                        'flex flex-col border-neutral-2 ps-3',
                        hasDays && 'border-s'
                      )}
                      onValueChange={setSelectedMonth}
                    >
                      {getMonths(variant)?.map(
                        ({ label, value }: SelectOptionType) => {
                          const stringifiedValue =
                            formatNumberWithZeroPrefix(+value)
                          return (
                            <ToggleGroupItem
                              value={stringifiedValue}
                              key={value}
                              className='mb-1 block min-w-fit text-start'
                              style={{
                                direction: `${locale === 'en' ? 'ltr' : 'rtl'}`,
                              }}
                            >
                              {`${value}. ${label}`}
                            </ToggleGroupItem>
                          )
                        }
                      )}
                    </ToggleGroup>
                  </ScrollArea>

                  {/* Years */}
                  <ScrollArea
                    className='col-span-2 h-[20.75rem]'
                    dir={locale === 'en' ? 'ltr' : 'rtl'}
                  >
                    <ToggleGroup
                      size='xs'
                      type='single'
                      variant='secondary'
                      value={String(year)}
                      className='flex flex-col border-s ps-3'
                      style={{
                        direction: `${locale === 'en' ? 'ltr' : 'rtl'}`,
                      }}
                      onValueChange={setSelectedYear}
                    >
                      {getYears(variant, minAge, maxAge)?.map(
                        ({ label, value }: SelectOptionType) => {
                          return (
                            <ToggleGroupItem
                              value={`${value}`}
                              key={value}
                              className='mb-1 block text-start'
                            >
                              {label}
                            </ToggleGroupItem>
                          )
                        }
                      )}
                    </ToggleGroup>
                  </ScrollArea>
                </div>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DropdownDatePicker
