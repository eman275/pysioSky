'use client'

import { addDays } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import {
  DayModifiers,
  DayPicker,
  SelectSingleEventHandler,
} from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { arSA, enUS } from 'date-fns/locale'

import { Button } from '@/shared/components/ui/button'
import { cn, formatDate } from '@/shared/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { useCurrentLocale } from '@/shared/locales/client'

interface DatePickerInputProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  minDate: string | undefined
  maxDate: string | undefined
  minSelectableDate: Date
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  date,
  setDate,
  minDate,
  maxDate,
  minSelectableDate,
}) => {
  const today = new Date()
  const maxSelectableDate = addDays(today, 45)
  const currentLocale = useCurrentLocale()
  const modifiers = {
    disabled: {
      before: minDate ? new Date(minDate) : minSelectableDate,
      after: maxDate ? new Date(maxDate) : maxSelectableDate,
    },
  } satisfies DayModifiers

  const handleDateSelect: SelectSingleEventHandler = (newDate) => {
    // prevent deselecting date by clicking on it again
    if (!newDate) return

    setDate(newDate)
  }
  return (
    <Popover>
      <PopoverTrigger className='w-full bg-white'>
        <Button
          variant='outlined'
          className={cn(
            'h-[46px] w-full justify-start border-neutral-3 bg-inherit px-2 py-1 text-left font-normal text-base-black hover:border-neutral-3 hover:bg-inherit'
          )}
        >
          <CalendarIcon className='h-4 w-4' />
          {date && formatDate(new Date(date), 'forClient')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full'>
        <DayPicker
          dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}
          locale={currentLocale === 'ar' ? arSA : enUS}
          mode='single'
          selected={new Date(date!)}
          onSelect={handleDateSelect}
          modifiers={modifiers}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerInput
