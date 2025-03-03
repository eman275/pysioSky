import { cn } from '@/shared/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, {
  AnchorHTMLAttributes,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import { ButtonHTMLAttributes, FC } from 'react'

type ButtonProps = VariantProps<typeof buttonVariants> &
  VariantProps<typeof buttonSize> &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    startIcon?: ReactElement
    endIcon?: ReactElement
    isLoading?: boolean
    asLink?: boolean
    href?: string
    btnRef?: React.Ref<HTMLButtonElement>
  }
const Button: FC<ButtonProps> = ({
  className,
  size,
  variant,
  colorScheme,
  startIcon,
  endIcon,
  isLoading = false,
  disabled = false,
  asLink = false,
  href,
  btnRef,
  ...props
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const commonProps = {
    className: cn(
      'transition-all',
      buttonVariants({ variant, colorScheme }),
      buttonSize({ size }),
      (startIcon || endIcon) && !isLoading
        ? 'justify-between'
        : 'justify-center',
      className
    ),
    disabled: isLoading || disabled,
    ...props,
  }

  const content = (
    <>
      {isLoading && mounted && (
        <span className='flex-center w-full self-center'>
          <Loader2 className='animate-spin' />
        </span>
      )}

      {startIcon && !isLoading && mounted && startIcon}
      {!isLoading && props.children}
      {!isLoading &&
        endIcon &&
        mounted &&
        React.cloneElement(endIcon, {
          className: cn(disabled ? 'text-neutral-5' : 'text-base-white'),
        })}
    </>
  )

  if (asLink && href) {
    return (
      <Link shallow scroll={false} href={href} {...commonProps}>
        {content}
      </Link>
    )
  }

  return (
    <button ref={btnRef} type='button' {...commonProps}>
      {content}
    </button>
  )
}

const ButtonIcon: FC<Omit<ButtonProps, 'startIcon' | 'endIcon'>> = ({
  className,
  size,
  variant,
  colorScheme,
  btnRef,
  ...props
}) => (
  <button
    ref={btnRef}
    type='button'
    className={cn(
      'flex-center',
      buttonIconSize({ size }),
      buttonVariants({ variant, colorScheme }),
      className
    )}
    {...props}
  >
    {props.children}
  </button>
)

const colorScheme = {
  primary: 'border-primary-6 bg-primary-6 hover:bg-primary-5',
  secondary: 'border-secondary-6 bg-secondary-6 hover:bg-secondary-5',
  tertiary: 'border-tertiary-6 bg-tertiary-6 hover:bg-tertiary-5',
  info: 'border-info-6 bg-info-6 hover:bg-info-5',
  success: 'border-success-6 bg-success-6 hover:bg-success-5',
  danger: 'border-error-6 bg-error-6 hover:bg-error-5',
  warning: 'border-warning-6 bg-warning-6 hover:bg-warning-5',
  neutral: 'border-neutral-6 bg-neutral-6 hover:bg-neutral-5',
} as const

const variant = {
  unstyled:
    'border-none bg-transparent p-0 m-0 w-auto h-auto block hover:bg-transparent',
  solid: 'border-none text-base-white',
  outlined: 'disabled:border-1 disabled:border-neutral-5',
  glassy: 'border-none',
  text: 'border-none bg-transparent disabled:text-neutral-5 disabled:hover:bg-transparent disabled:bg-transparent outline-none hover:bg-transparent',
  link: 'border-none bg-transparent px-1 m-0 hover:bg-transparent text-primary-6 underline text-sm',
} as const

const buttonSize = cva('', {
  variants: {
    size: {
      L: 'h-16 rounded-lg px-6 py-4 text-sm',
      M: 'h-14 rounded-lg px-6 py-4 text-sm',
      S: 'h-12 rounded-lg px-6 py-4 text-sm',
      XS: 'h-10 rounded-lg p-4 text-xs',
      XXS: 'h-8 rounded-[4px] px-2.5 py-4 text-xs',
      text: 'h-fit w-fit',
      link: 'h-fit w-fit text-xs font-normal',
    },
  },
  defaultVariants: {
    size: 'S',
  },
})

const buttonIconSize = cva('', {
  variants: {
    size: {
      L: 'h-16 w-16 px-6 py-4',
      M: 'h-14 w-14 p-4',
      S: 'h-12 w-12 p-4 ',
      XS: 'h-10 w-10 p-4',
      XXS: 'h-8  w-8 px-2.5 py-4',
      text: 'h-fit w-fit',
      link: 'h-fit w-fit',
    },
  },
  defaultVariants: {
    size: 'S',
  },
})

const buttonVariants = cva(
  'relative flex items-center gap-2 rounded-lg border font-bold disabled:cursor-not-allowed disabled:border-0 disabled:bg-neutral-3 disabled:text-neutral-5 disabled:hover:bg-neutral-3 disabled:hover:text-neutral-5',
  {
    variants: {
      colorScheme,
      variant,
    },
    compoundVariants: [
      {
        variant: ['outlined', 'glassy'],
        colorScheme: 'primary',
        className:
          'bg-primary-1 text-primary-6 hover:border-primary-6 hover:bg-primary-2',
      },
      {
        variant: ['outlined', 'glassy'],
        colorScheme: 'secondary',
        className:
          'bg-secondary-1 text-secondary-6 hover:border-secondary-6 hover:bg-secondary-2',
      },
      {
        variant: ['outlined', 'glassy'],
        colorScheme: 'tertiary',
        className:
          'bg-tertiary-1 text-tertiary-6 hover:border-tertiary-6 hover:bg-tertiary-2',
      },
      {
        variant: ['outlined', 'glassy'],
        colorScheme: 'info',
        className: 'bg-info-1 text-info-6 hover:border-info-6 hover:bg-info-2',
      },
      {
        variant: ['outlined', 'glassy'],
        colorScheme: 'success',
        className:
          'bg-success-1 text-success-6 hover:border-success-6 hover:bg-success-2',
      },
      {
        variant: ['outlined', 'glassy'],
        colorScheme: 'danger',
        className:
          'bg-error-1 text-error-6 hover:border-error-6 hover:bg-error-2',
      },
      {
        variant: ['outlined', 'glassy'],
        colorScheme: 'warning',
        className:
          'bg-warning-1 text-warning-6 hover:border-warning-6 hover:bg-warning-2',
      },
      {
        variant: ['outlined', 'glassy'],
        colorScheme: 'neutral',
        className:
          'bg-neutral-1 text-neutral-6 hover:border-neutral-6 hover:bg-neutral-2',
      },

      // text variant
      {
        variant: 'text',
        colorScheme: 'primary',
        class: 'text-primary-6 hover:text-primary-5',
      },
      {
        variant: 'text',
        colorScheme: 'secondary',
        class: 'text-secondary-6 hover:text-secondary-5',
      },
      {
        variant: 'text',
        colorScheme: 'tertiary',
        class: 'text-tertiary-6 hover:text-tertiary-5',
      },
      {
        variant: 'text',
        colorScheme: 'info',
        class: 'text-info-6 hover:text-info-5',
      },
      {
        variant: 'text',
        colorScheme: 'success',
        class: 'text-success-6 hover:text-success-5',
      },
      {
        variant: 'text',
        colorScheme: 'danger',
        class: 'text-error-6 hover:text-error-5',
      },
      {
        variant: 'text',
        colorScheme: 'warning',
        class: 'text-warning-6 hover:text-warning-5',
      },
      {
        variant: 'text',
        colorScheme: 'neutral',
        class: 'text-neutral-6 hover:text-neutral-5',
      },
    ],

    // unstyled
    defaultVariants: {
      colorScheme: 'primary',
      variant: 'solid',
    },
  }
)

export { Button, ButtonIcon, buttonVariants }
