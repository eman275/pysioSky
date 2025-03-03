'use client'
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'
import CloseIcon from '@/shared/components/icons/alert-close-icon.svg'
import { ButtonIcon } from './button'
import useDisclosure from '@/shared/hooks/use-disclosure'

const alertVariants = cva(
  'relative h-fit min-h-12 w-full rounded-lg px-4 py-3',
  {
    variants: {
      direction: {
        horizontal: 'flex flex-row items-center gap-2',
        vertical: 'flex flex-col gap-1',
      },
      status: {
        info: 'bg-primary-1',
        success: 'bg-success-1',
        warning: 'bg-warning-1',
        error: 'bg-error-1',
        darkError: 'bg-error-6 text-white',
      },
    },
    defaultVariants: {
      status: 'info',
      direction: 'horizontal',
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> & { isDismissible?: boolean }
>(
  (
    { className, isDismissible, direction, status, children, ...props },
    ref
  ) => {
    const { onClose, isOpened } = useDisclosure({ isDefaultOpened: true })
    if (!isOpened) return null
    return (
      <div
        ref={ref}
        role='alert'
        className={cn(alertVariants({ status, direction }), className)}
        {...props}
      >
        {children}
        {isDismissible && (
          <ButtonIcon
            className='ms-auto'
            onClick={onClose}
            variant={'unstyled'}
          >
            <CloseIcon
              className={cn(
                'size-6',
                status === 'darkError' ? 'text-base-white' : 'text-base-black'
              )}
            />
          </ButtonIcon>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  startIcon?: React.ReactNode
}

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, startIcon, ...props }, ref) => (
    <div className='flex items-center gap-2'>
      {startIcon && <span className='cursor-pointer'>{startIcon}</span>}
      <h5 ref={ref} className={cn('text-xs font-bold', className)} {...props} />
    </div>
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xs [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
