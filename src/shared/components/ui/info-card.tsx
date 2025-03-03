import { cn } from '@/shared/lib/utils'
import { ReactNode } from 'react'

type InfoCardProps = {
  className?: string
  title: string
  info: ReactNode
}

export default function InfoCard({ className, title, info }: InfoCardProps) {
  return (
    <div
      className={cn([
        'flex flex-col items-center justify-center rounded-lg border border-neutral-2 bg-neutral-1 p-3 text-center',
        className,
      ])}
    >
      <small className='text-neutral-5'>{title}</small>
      <b className='text-base-black'>{info}</b>
    </div>
  )
}
