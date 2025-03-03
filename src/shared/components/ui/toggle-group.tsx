'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { toggleVariants } from '@/shared/components/ui/toggle'
import { cn } from '@/shared/lib/utils'
import { useCurrentLocale } from '@/shared/locales/client'
import { Input } from './input'

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    isInvalid?: boolean
    hasRadioButton?: boolean
    value?: string
  }
>({
  size: 'default',
  variant: 'default',
  isInvalid: false,
  hasRadioButton: false,
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
      isInvalid?: boolean
      hasRadioButton?: boolean
      shouldForceSelection?: boolean
    }
>(
  (
    {
      className,
      variant,
      size,
      children,
      isInvalid,
      hasRadioButton,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const locale = useCurrentLocale()

    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn('flex items-stretch justify-center gap-1', className)}
        {...props}
        onValueChange={(value: string & string[]) => {
          if (!value && props.shouldForceSelection) {
            return
          }

          onValueChange?.(value)
        }}
        dir={dir}
      >
        <ToggleGroupContext.Provider
          value={{
            variant,
            size,
            isInvalid,
            hasRadioButton,
            value: props.value as string,
          }}
        >
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    )
  }
)

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        'data-[state=on]:border-1 p-1 outline-none',
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        { 'border-error-5': context.isInvalid },
        className
      )}
      {...props}
    >
      {context.hasRadioButton && (
        <Input
          type='radio'
          readOnly
          checked={context.value === props.value}
          className='mx-2 scale-150 cursor-pointer checked:accent-primary-6'
        />
      )}
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
