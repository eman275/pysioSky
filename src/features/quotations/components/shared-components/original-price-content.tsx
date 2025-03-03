import { formatThousandsSeparators } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'

type Props = {
  totalDeductibles: number
}

const OriginalPriceContent = ({ totalDeductibles }: Props) => {
  const t = useScopedI18n('application.quotations')
  const tUnits = useScopedI18n('common.units')
  return (
    <div className='flex items-center gap-2'>
      <p className='text-xxs font-semibold text-neutral-5'>
        {t('original_price')}
      </p>
      <p className='text-xs font-normal text-neutral-5 line-through'>
        {tUnits('SAR')} {formatThousandsSeparators(totalDeductibles, true)}
      </p>
    </div>
  )
}

export default OriginalPriceContent
