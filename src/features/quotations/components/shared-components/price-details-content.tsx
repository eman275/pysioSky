import { formatThousandsSeparators } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import NewPriceFlag from './new-price-flag'

type Props = {
  totalDeductibles: number
  isNewPrice?: boolean
}

const PriceDetailsContent = ({ totalDeductibles, isNewPrice }: Props) => {
  const t = useScopedI18n('application.quotations')
  const tUnits = useScopedI18n('common.units')

  return (
    <div className='flex justify-between'>
      <div className='flex flex-col'>
        <div className='flex items-center gap-2'>
          <p
            className={`text-xxl font-bold ${
              isNewPrice ? 'text-primary-6' : ''
            }`}
          >
            {tUnits('SAR')} {formatThousandsSeparators(totalDeductibles, true)}
          </p>
          {isNewPrice && <NewPriceFlag />}
        </div>
        {!isNewPrice && <p className='text-xxs'>{t('using_deductibles')}</p>}
      </div>
    </div>
  )
}

export default PriceDetailsContent
