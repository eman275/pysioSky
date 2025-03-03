import SpinnerIcon from '@/shared/components/icons/spinner.svg'
import { cn } from '@/shared/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
})

const loaderVariants = cva('animate-spin', {
  variants: {
    size: {
      small: 'h-6 w-6',
      medium: 'h-8 w-8',
      large: 'h-12 w-12',
      xLarge: 'h-[60px] w-[60px]',
    },
  },
  defaultVariants: {
    size: 'xLarge',
  },
})

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string
  children?: React.ReactNode
  id?: string
}

export function Spinner({
  size,
  show,
  children,
  className,
  id,
}: SpinnerContentProps) {
  return (
    <span id={id} className={spinnerVariants({ show })}>
      <SpinnerIcon
        className={cn('size-[60px]', loaderVariants({ size }), className)}
      />

      {children}
    </span>
  )
}
