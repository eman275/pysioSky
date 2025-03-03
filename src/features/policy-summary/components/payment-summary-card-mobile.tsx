import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/layout/collapsible'
import CollapsibleMotion from '@/shared/components/layout/motion/collapsible-motion'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { cn, formatThousandsSeparators } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'
import ChevronUpIcon from '@/shared/components/icons/chevron-up-blue.svg'
import ChevronDownIcon from '@/shared/components/icons/chevron-down-blue.svg'
import { Card } from '@/shared/components/ui/card'
import StepNextButton from '@/shared/components/ui/step-next-button'
import useBreakdownsList from '../hooks/use-break-list'
import useSingleQuoteStore from '@/features/quotations/quotes-list/hooks/use-single-quote-store'
type Props = {
  onClick: () => void
}
const PaymentSummaryCardMobile = ({ onClick }: Props) => {
  const { isOpened, onToggle } = useDisclosure()
  const tButton = useScopedI18n('application.paymentDetails')

  const tUnits = useScopedI18n('common.units')
  const tWords = useScopedI18n('common.words')
  const t = useScopedI18n('application.paymentDetails.aside')
  const { breakdownsList } = useBreakdownsList()
  const { totalDeductibleAmount } = useSingleQuoteStore()

  return (
    <Card className=' fixed inset-x-0 bottom-0 z-10 flex-col gap-4 !rounded-2xl px-8 pb-8 pt-6 shadow-[0px_-4px_4px_0px] shadow-black/25 lg:hidden'>
      <Collapsible open={isOpened} onOpenChange={onToggle}>
        <CollapsibleTrigger className='w-full'>
          {isOpened ? (
            <div className='mb-5 flex items-center justify-between'>
              <p className='text-left text-xxl font-bold'>
                {t('payment_summary')}
              </p>
              <div className='flex size-6 items-center justify-center rounded-full border border-primary-6 bg-primary-1'>
                <ChevronUpIcon />
              </div>
            </div>
          ) : (
            <div className=' flex justify-between '>
              <h4 className='text-xxl '>{tWords('total')}</h4>
              <div className='flex items-center  gap-3'>
                <div className='flex flex-col'>
                  <b className='text-xxxl'>
                    {tUnits('SAR')}{' '}
                    {formatThousandsSeparators(totalDeductibleAmount, true)}{' '}
                  </b>
                  <small className='text-xs'>{t('including_taxes')}</small>
                </div>
                <div className='flex size-6 items-center justify-center rounded-full border border-primary-6 bg-primary-1'>
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <CollapsibleMotion
            isOpened={isOpened}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-2 pt-0'>
              {breakdownsList.map((breakdown, index) => (
                <div key={index} className='flex  justify-between  lg:gap-1 '>
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
            </div>
            <div className=' flex w-full justify-between border'></div>
            <div className=' flex justify-between'>
              <h4 className='text-xxl '>{tWords('total')}</h4>
              <div className='flex items-center  gap-3'>
                <div className='flex flex-col'>
                  <b className='text-xxxl'>
                    {tUnits('SAR')}{' '}
                    {formatThousandsSeparators(totalDeductibleAmount, true)}{' '}
                  </b>
                  <small className='text-xs'>{t('including_taxes')}</small>
                </div>
              </div>
            </div>
          </CollapsibleMotion>
        </CollapsibleContent>
      </Collapsible>
      <StepNextButton
        size='S'
        label={tButton('proceed_to_payment')}
        className='mt-6 w-full md:w-full'
        onClick={onClick}
      />
    </Card>
  )
}

export default PaymentSummaryCardMobile
