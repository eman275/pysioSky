'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { cn, formatThousandsSeparators } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import useBreakdownsList from '../hooks/use-break-list'
import SvgDecoration from '@/shared/components/icons/svg-decorations.svg'
import useSingleQuoteStore from '@/features/quotations/quotes-list/hooks/use-single-quote-store'

const PaymentSummaryCard = () => {
  const t = useScopedI18n('application.paymentDetails.aside')
  const tUnits = useScopedI18n('common.units')
  const tWords = useScopedI18n('common.words')
  const { breakdownsList } = useBreakdownsList()
  const { totalDeductibleAmount } = useSingleQuoteStore()

  return (
    <div className='relative'>
      <Card
        className={cn([
          'p-0  ',
          breakdownsList && 'border-dashed border-primary-5',
        ])}
        borderRadius='rounded-t-lg  '
      >
        {breakdownsList && (
          <>
            <CardHeader className='p-4 pb-2'>
              <CardTitle className='text-base'>
                {t('payment_summary')}
              </CardTitle>
            </CardHeader>

            <CardContent className='flex flex-col gap-2 p-4 pb-10 pt-0'>
              {breakdownsList.map((breakdown, index) => (
                <div
                  key={index}
                  className='flex flex-col justify-between lg:flex-row lg:gap-1 '
                >
                  <label
                    className={cn(
                      'text-sm ',
                      index == 0
                        ? 'font-bold text-base-black'
                        : 'text-neutral-5'
                    )}
                  >
                    {breakdown.breakdownName}
                  </label>
                  <span
                    className={cn(
                      'text-sm font-bold ',
                      index == 0 ? ' text-base-black' : 'text-neutral-5'
                    )}
                  >
                    {breakdown.amount} {tUnits('SAR')}
                  </span>
                </div>
              ))}
            </CardContent>
          </>
        )}
      </Card>
      <div className=' flex justify-between  bg-primary-6 p-4 text-white'>
        <h4 className='text-xxl text-white'>{tWords('total')}</h4>
        <div className='flex flex-col'>
          <b className='text-xxxl'>
            {tUnits('SAR')}{' '}
            {formatThousandsSeparators(totalDeductibleAmount, true)}{' '}
          </b>
          <small className='text-xs'>{t('including_taxes')}</small>
        </div>
      </div>
      <div className='relative bottom-[1px] w-full overflow-hidden'>
        <SvgDecoration />
      </div>
    </div>
  )
}

export default PaymentSummaryCard
