'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/shared/lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 flex items-end overflow-hidden  bg-neutral-6/40 drop-shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 lg:items-center',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    contentContainerClassName?: string
  }
>(({ contentContainerClassName, className, children, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay>
        <div
          className={cn(
            'relative mx-auto my-0 w-auto',
            contentContainerClassName
          )}
        >
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              `
              fixed
            bottom-0
            left-0 right-0 z-50 grid
            max-h-[90vh]
            w-full
            gap-8
            overflow-y-auto rounded-t-lg bg-base-white
            outline-none
            duration-700 scrollbar-none 
            data-[state=open]:animate-in
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95
            data-[state=closed]:slide-out-to-bottom-full
            data-[state=open]:slide-in-from-bottom-full
            lg:static
            lg:m-auto
            lg:max-h-screen
            lg:min-w-fit
            lg:rounded-lg
            lg:data-[state=open]:zoom-in-95
      `,
              className
            )}
            {...props}
          >
            {children}
          </DialogPrimitive.Content>
        </div>
      </DialogOverlay>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogCloseX = ({ notAbsolute = false }) => (
  <DialogPrimitive.Close className='rounded-sm opacity-70 outline-none transition-opacity hover:opacity-100 disabled:pointer-events-none'>
    <div
      className={cn(
        'flex-center end-4 top-4 h-8 w-8 rounded-full border border-neutral-2 bg-neutral-1 lg:h-10 lg:w-10',
        notAbsolute ? 'static' : 'absolute'
      )}
    >
      <X className='h-5 w-5 text-neutral-5' />
    </div>
    <span className='sr-only'>Close</span>
  </DialogPrimitive.Close>
)
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex items-center pe-8 text-center lg:text-left', className)}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex w-full flex-col-reverse lg:relative lg:flex-row lg:justify-end lg:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-start text-lg font-semibold leading-none tracking-tight text-neutral-6 lg:text-center',
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogCloseX,
}
