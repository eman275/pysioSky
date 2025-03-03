import { RadioGroupItem } from '@/shared/components/ui/RadioGroup'
import { cn } from '@/shared/lib/utils'
import { ReactNode } from 'react'

export type OwnerDetailsCardProps = {
  id: number
  label: string
  icon: ReactNode
}

const PaymentCard = (props: OwnerDetailsCardProps) => {
  const { id, label, icon } = props

  return (
    <label>
      <div
        className={cn(
          ' flex cursor-pointer items-center justify-between rounded-lg border border-neutral-2 px-7 py-2 transition-colors hover:bg-primary-1'
        )}
      >
        <div className='flex items-center gap-10'>
          <span className='col-span-1'>{icon}</span>
          <p className={'col-span-1 text-sm font-bold'}>{label}</p>
        </div>

        <RadioGroupItem
          value={id.toString()}
          id={id.toString()}
          className='flex size-4 items-center justify-center border-2 p-2'
        />
      </div>
    </label>
  )
}

export default PaymentCard
