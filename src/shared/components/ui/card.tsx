import * as React from 'react'

import { cn } from '@/shared/lib/utils'

type CardProps<T extends React.ElementType> = {
  as?: T
  className?: string
  borderRadius?: string
} & React.ComponentPropsWithoutRef<T>

const CardWithoutRef = <T extends React.ElementType = 'div'>(
  { as, className, borderRadius, ...props }: CardProps<T>,
  ref: React.Ref<Element>
) => {
  const Component = as || 'div'
  return React.createElement(Component, {
    ref,
    className: cn(
      `border border-neutral-2 bg-base-white p-4 dark:text-slate-50`,
      className,
      borderRadius ? borderRadius : 'rounded-lg'
    ),
    ...props,
  })
}

const Card = React.forwardRef(CardWithoutRef) as <
  T extends React.ElementType = 'div',
>(
  props: CardProps<T> & { ref?: React.Ref<Element> }
) => ReturnType<typeof CardWithoutRef>

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('mb-4 font-bold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex ', className)} {...props} />
))

CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
