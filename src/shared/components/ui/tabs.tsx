'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'
import { createContext } from '@/shared/lib/helpers/create-context'

// Define the possible variants
type TabsVariants = 'solid' | 'underlined' | 'vertical'

// Define CVA styles for TabsList
const tabsListStyles = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      solid: 'rounded-lg border border-neutral-3 bg-base-white p-1',
      underlined: 'border-b border-b-neutral-3 bg-base-white',
      vertical: 'inline-flex flex-col bg-base-white ',
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
})

const [TabsContextProvider, useTabsContext] = createContext<{
  variant: TabsVariants
}>({
  name: 'TabsContext',
})
const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> &
    VariantProps<typeof tabsListStyles> & { variant?: TabsVariants }
>(({ variant = 'solid', className, ...props }, ref) => (
  <TabsContextProvider value={{ variant }}>
    <TabsPrimitive.Root ref={ref} className={className} {...props} />
  </TabsContextProvider>
))

Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant } = useTabsContext()
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListStyles({ variant }), className)}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

// Define CVA styles for TabsTrigger
const tabsTriggerStyles = cva(
  'inline-flex min-h-[42px] items-center justify-center whitespace-nowrap text-sm font-bold text-base-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        solid:
          'rounded-lg px-3 data-[state=active]:bg-primary-6 data-[state=active]:text-base-white data-[state=active]:shadow-sm',
        underlined:
          'border-b-4 border-transparent px-3 data-[state=active]:border-primary-6 data-[state=active]:text-primary-6', // Only underline on active state
        vertical:
          'inline-flex min-h-[42px] w-full items-center justify-between whitespace-nowrap border-b-4 border-transparent px-3 text-sm font-bold text-neutral-5 transition-all data-[state=active]:rounded-lg data-[state=active]:border data-[state=active]:border-primary-2 data-[state=active]:bg-primary-7 data-[state=active]:text-primary-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', // New vertical style
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  }
)

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: TabsVariants
  }
>(({ className, ...props }, ref) => {
  const { variant } = useTabsContext()

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerStyles({ variant }), className)}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'opacity-0 ring-offset-white duration-500 data-[state=active]:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
