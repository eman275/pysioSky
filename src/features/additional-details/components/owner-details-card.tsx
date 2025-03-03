import BlockedOwnerIcon from '@/shared/components/icons/blocked-owner.svg'
import OwnerIcon from '@/shared/components/icons/owner.svg'
import { RadioGroupItem } from '@/shared/components/ui/RadioGroup'

import { cn } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'

export type OwnerDetailsCardProps = {
  ownerReference: string
  ownerName: string
  ownerNationalId: string
  isOwnerBlocked: boolean
  isSelected: boolean
  blockDurationMinutes: number
}

const OwnerDetailsCard = (props: OwnerDetailsCardProps) => {
  const {
    isSelected,
    isOwnerBlocked,
    ownerName,
    ownerNationalId,
    ownerReference,
    blockDurationMinutes = 0,
  } = props

  const t = useScopedI18n('application.additionalDetails')

  return (
    <label
      htmlFor={ownerReference}
      className={cn(isOwnerBlocked && 'pointer-events-none select-none')}
    >
      <div
        className={cn(
          ' flex cursor-pointer items-center justify-between rounded-lg border border-neutral-2 p-4 transition-colors hover:bg-primary-1',
          isSelected && 'border-primary-6 bg-primary-1',
          isOwnerBlocked && 'relative bg-neutral-1'
        )}
      >
        <div className='flex items-center gap-3'>
          {isOwnerBlocked ? (
            <BlockedOwnerIcon />
          ) : (
            <div className='flex size-9 items-center justify-center rounded-full border bg-primary-1'>
              <OwnerIcon />
            </div>
          )}
          <div>
            <p
              dir='rtl'
              className={
                (cn('text-base font-bold'),
                isOwnerBlocked ? 'text-neutral-3 ' : 'text-neutral-5')
              }
            >
              {ownerName}
            </p>
            <p
              className={
                (cn('text-xs '),
                isOwnerBlocked ? 'text-neutral-3 ' : 'text-neutral-5')
              }
            >
              ID: {ownerNationalId}
            </p>
          </div>
        </div>
        {isOwnerBlocked && (
          <div className='absolute bottom-0 left-0 h-6 w-full rounded-b-lg bg-error-6/90 px-[9px] py-[3px] text-center'>
            <p className=' text-xs text-base-white'>
              {t('exceeded_available_attempts_title', {
                time: blockDurationMinutes,
              })}
            </p>
          </div>
        )}
        <RadioGroupItem
          value={ownerReference}
          id={ownerReference}
          className='flex size-4 items-center justify-center border-2 p-2'
          disabled={isOwnerBlocked}
        />
      </div>
    </label>
  )
}

export default OwnerDetailsCard
