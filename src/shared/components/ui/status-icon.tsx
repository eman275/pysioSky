import { cn } from '@/shared/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import SVGcheck from '@/shared/components/icons/check.svg'

type StatusIconProps = VariantProps<typeof iconStatusVariants> & {
  children: React.ReactElement
}

const iconStatusVariants = cva('flex-center relative shrink-0 rounded-full', {
  variants: {
    iconSize: {
      88: ['w-[88px]', 'h-[88px]'],
      64: ['w-16', 'h-16'],
      56: ['w-14', 'h-14'],
      40: ['w-10', 'h-10'],
    },
    iconColorScheme: {
      primary: ['bg-primary-1'],
      secondary: ['bg-secondary-1'],
      white: ['bg-white'],
    },
    iconStatus: {
      active:
        'after:absolute after:end-2 after:top-0 after:inline-block after:h-3 after:w-3 after:rounded-full after:border-2 after:border-white',
      finished:
        'after:absolute after:-top-0 after:end-2 after:inline-block after:h-5 after:w-5 after:rounded-full after:border-2 after:border-white',
    },
  },
  compoundVariants: [
    {
      iconColorScheme: 'primary',
      className: 'after:bg-primary-6',
    },
    {
      iconColorScheme: 'secondary',
      className: 'after:bg-secondary-6',
    },
    {
      iconColorScheme: 'white',
      className: 'border border-dashed border-primary-5',
    },
  ],
  defaultVariants: {
    iconSize: 64,
    iconColorScheme: 'primary',
    iconStatus: null,
  },
})

export default function StatusIcon({
  children,
  iconColorScheme,
  iconSize,
  iconStatus,
}: StatusIconProps) {
  return (
    <i
      className={cn(
        iconStatusVariants({
          iconSize,
          iconColorScheme,
          iconStatus,
        })
      )}
    >
      {iconStatus === 'finished' && (
        <SVGcheck className='absolute end-3 top-1 z-10 h-3 w-3' />
      )}
      {React.cloneElement(children)}
    </i>
  )
}
