'use client'

import CloseIcon from '@/shared/components/icons/close.svg'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

import { useScreenSize } from '@/shared/hooks/use-screen-size'
import { cn } from '@/shared/lib/utils'
import { useCurrentLocale } from '@/shared/locales/client'
import { ButtonIcon } from './button'

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close

const SheetPortal = ({
  className,
  ...props
}: SheetPrimitive.DialogPortalProps & { className?: string }) => (
  <SheetPrimitive.Portal {...props}>
    <div className={cn(className)}>{props.children}</div>
  </SheetPrimitive.Portal>
)
SheetPortal.displayName = SheetPrimitive.Portal.displayName

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed  inset-0 z-50 bg-neutral-6/5  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  'fixed z-50 mb-0 gap-4 bg-white shadow-lg  transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out lg:mb-0',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full  border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left ',
        right:
          'inset-y-0 right-0  h-full   border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right ',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

const SheetCloseButton = () => {
  const { isLarge } = useScreenSize()
  const locale = useCurrentLocale()
  const isRTL = locale == 'ar' ? true : false
  return (
    <SheetClose>
      {isLarge ? (
        <ButtonIcon
          className={'absolute start-[-25px] rounded-full shadow'}
          colorScheme='neutral'
          variant='glassy'
        >
          {isRTL ? <LuArrowRight /> : <LuArrowLeft />}
        </ButtonIcon>
      ) : (
        <ButtonIcon variant='unstyled'>
          <CloseIcon />
        </ButtonIcon>
      )}
      <span className='sr-only'>Close</span>
    </SheetClose>
  )
}
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        <div className='flex h-screen flex-col overflow-y-auto p-6 scrollbar-none lg:p-8'>
          {children}
        </div>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2', className)} {...props}>
    <SheetCloseButton />
    {props.children}
  </div>
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row  sm:space-x-2',
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Title
      ref={ref}
      className={cn('text-foreground text-lg font-semibold', className)}
      {...props}
    />
  )
})
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
}
