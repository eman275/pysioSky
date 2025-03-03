'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    hasText?: boolean
  }
>(({ className, hasText = true, ...props }, ref) => {
  const tWords = useScopedI18n('common.words')
  return (
    <SwitchPrimitives.Root
      className={cn(
        'group peer relative inline-flex h-6 shrink-0  cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary-6 data-[state=unchecked]:bg-neutral-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-5 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:bg-neutral-2',
        hasText ? 'w-12' : 'w-10',
        className
      )}
      {...props}
      ref={ref}
    >
      {hasText && (
        <span className='absolute start-1.5 text-xxs font-bold capitalize text-base-white group-disabled:text-neutral-3 group-data-[state=unchecked]:opacity-0'>
          {tWords('yes')}
        </span>
      )}
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none relative z-auto block h-5 w-5 rounded-full bg-base-white shadow-lg ring-0 transition-transform group-disabled:bg-neutral-3 data-[state=unchecked]:translate-x-0',
          hasText
            ? 'ltr:data-[state=checked]:translate-x-6 rtl:data-[state=checked]:-translate-x-6'
            : 'ltr:data-[state=checked]:translate-x-4 rtl:data-[state=checked]:-translate-x-4'
        )}
      />
      {hasText && (
        <span className='absolute end-1.5 text-xxs font-bold capitalize text-neutral-5 group-disabled:text-neutral-3 group-data-[state=checked]:opacity-0'>
          {tWords('no')}
        </span>
      )}
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
