'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'

import { cn } from '@/shared/lib/utils'
import { Label } from './label'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label?: string
    labelClassName?: string
  }
>(({ className, label, labelClassName, ...props }, ref) => {
  return (
    <div className='flex items-center'>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'border-primary text-primary ring-offset-background focus-visible:ring-ring  peer aspect-square h-4 w-4 rounded-full border data-[state=checked]:border-primary-6 data-[state=checked]:text-primary-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-neutral-3 disabled:bg-neutral-2 disabled:opacity-30 disabled:ring-offset-0',
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
          <Circle className={cn('size-4 fill-current text-current')} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {label && (
        <Label
          className={cn(
            'cursor-pointer text-sm font-bold peer-data-[state=checked]:text-primary-6',
            props.disabled && 'text-neutral-3',
            labelClassName
          )}
          htmlFor={props.id}
        >
          {label}
        </Label>
      )}
    </div>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
