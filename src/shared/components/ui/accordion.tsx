'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Close from '@/shared/components/icons/faq-closed.svg'
import Open from '@/shared/components/icons/faq-opened.svg'

import { cn } from '@/shared/lib/utils'
const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'rounded-lg border  bg-base-white p-3 transition-all data-[state=open]:pb-4',
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    isDefault?: boolean
  }
>(({ className, children, isDefault = true, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex  border-primary-2 data-[state=open]:border-b'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-center justify-between py-2 text-start text-sm font-bold transition-all',
        className
      )}
      {...props}
    >
      <div className=''>{children}</div>
      {isDefault ? (
        <div className='text-neutral-5'>
          <ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200  group-data-[state=open]:hidden' />
          <ChevronUp className='h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=closed]:hidden' />
        </div>
      ) : (
        <div className='text-neutral-5'>
          <Close className='h-4 w-4 shrink-0 transition-transform duration-200  group-data-[state=open]:hidden' />
          <Open className='h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=closed]:hidden' />
        </div>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='overflow-hidden pt-2 text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}
  >
    <div className={cn('pb-4 pt-0 text-neutral-6', className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
