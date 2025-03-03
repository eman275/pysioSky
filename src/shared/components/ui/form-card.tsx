import { ComponentProps, ReactElement, ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'
import StatusIcon from './status-icon'

type FormCardProps = Omit<ComponentProps<typeof StatusIcon>, 'children'> & {
  className?: string
  children?: ReactNode
  title: string
  description?: string
  icon?: ReactElement
  iconPosition?: 'start' | 'end'
}

export default function FormCard({
  className,
  children,
  title,
  description,
  icon,
  iconPosition,
  ...props
}: FormCardProps) {
  return (
    <Card className={className}>
      <div
        className={cn(
          'mb-4 flex w-full items-start gap-2 lg:items-center',
          iconPosition === 'end' &&
            'flex-row-reverse justify-between gap-4 lg:gap-8'
        )}
      >
        {icon && <StatusIcon {...props}>{icon}</StatusIcon>}
        <CardHeader>
          <CardTitle className='mb-3 text-base'>{title}</CardTitle>
          <CardDescription className='text-sm'>{description}</CardDescription>
        </CardHeader>
      </div>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
