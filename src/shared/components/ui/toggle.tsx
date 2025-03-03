'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm text-base-black data-[state=on]:border-primary-6 data-[state=on]:bg-primary-7 data-[state=on]:font-bold data-[state=on]:text-primary-6 focus-visible:border focus-visible:border-primary-6 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-2 border-neutral-3 bg-base-white',
        invalid: 'border-2 border-error-5 bg-base-white',
        secondary: 'w-full border-0 px-2 text-sm',
      },
      size: {
        default: 'min-h-[3.125rem] w-[6.25rem] py-1',
        xs: 'h-7',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
