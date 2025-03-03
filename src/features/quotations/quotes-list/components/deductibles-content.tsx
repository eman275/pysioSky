import { cn, formatThousandsSeparators } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'
interface Pros {
  color: 'black' | 'gray'
  title: string
  value?: number
}

const DeductiblesContent = ({ title, value = 0, color }: Pros) => {
  const tUnits = useScopedI18n('common.units')

  return (
    <div className='mb-1 flex items-center justify-between gap-2'>
      <p
        className={cn(
          color === 'gray' ? 'text-xs text-neutral-5' : 'text-sm text-black'
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          'font-bold',
          color === 'gray' ? 'text-xs text-neutral-5' : 'text-sm text-black'
        )}
      >
        {`${tUnits('SAR')} ${formatThousandsSeparators(value, true)}`}
      </p>
    </div>
  )
}

export default DeductiblesContent
