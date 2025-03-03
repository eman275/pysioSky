'use client'
import ArrowIcon from '@/shared/components/icons/arrow-blue.svg'
import FleetIcon from '@/shared/components/icons/fleet-icon.svg'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { cn, formatDate } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AvailableQuoteType } from '../resources/types'
import QuoteTimer from './quote-timer'
import VehiclesListModal from './vehicles-list-modal'

export type AvailableQuotesCardProps = {
  availableQuotesCardInfo: AvailableQuoteType
  correlationId: string | undefined
}

const AvailableQuotesCard = (props: AvailableQuotesCardProps) => {
  const {
    availableQuotesCardInfo: {
      createdOn,
      applicationReference,
      entityId,
      entityCrNumber,
      expiresInSeconds,
      policyEffectiveDate,
      quotesCount,
      compVehiclesCount,
      tplVehiclesCount,
      totalVehicleCount,
      reference,
      code,
    },
    correlationId,
  } = props
  const t = useScopedI18n('userAccount.userAccount.available_quotes')
  const { isOpened, setIsOpened } = useDisclosure()
  const router = useRouter()

  const [isTimeout, setIsTimeout] = useState(false)

  const handleCountdownFinish = () => {
    setIsTimeout(true)
  }

  const onClickViewQuotes = () => {
    router.push(
      generateAppPath({
        crNumber: entityCrNumber,
        entityReference: entityId,
        correlationId,
        applicationReference,
        quoteRequestReference: reference,
      }).QUOTATION_LIST_URL
    )
  }

  const onClickViewModal = () => {
    setIsOpened(!isOpened)
  }

  return (
    <div className=' w-full rounded-lg border border-neutral-2 p-4 '>
      <div className='flex flex-col   items-start justify-between lg:flex-row lg:items-center'>
        <div>
          <div className='mb-4 flex items-center gap-4'>
            <div className='flex size-10 items-center justify-center rounded-full border bg-primary-1'>
              <FleetIcon />
            </div>
            <p className='text-lg font-bold'>{t('sme_motor_insurance')}</p>
          </div>
          <QuoteTimer
            timer={expiresInSeconds}
            handleCountdownFinish={handleCountdownFinish}
            requestDate={formatDate(new Date(createdOn), 'forClient')}
            isTimeout={isTimeout}
            requestId={code}
          />
        </div>

        {!isTimeout && (
          <Button
            className='mt-2 w-full lg:mt-0 lg:w-auto'
            variant='glassy'
            colorScheme='secondary'
            size='M'
            onClick={onClickViewQuotes}
          >
            {t('view_quotes', { total: quotesCount })}
          </Button>
        )}
      </div>
      <div className='my-4 grow border-b border-neutral-2 lg:border-b '></div>
      <div
        className={cn(
          'grid grid-cols-2 gap-[10px]',
          !!compVehiclesCount && !!tplVehiclesCount
            ? 'md:grid-cols-4'
            : ' md:grid-cols-3'
        )}
      >
        <div className='flex flex-col items-center justify-center rounded-lg border border-neutral-2 px-4 py-3'>
          <p className='text-xs text-neutral-5'>{t('policy_effective_date')}</p>
          <div className='text-base font-bold'>
            {formatDate(new Date(policyEffectiveDate), 'forClient')}
          </div>
        </div>

        {!!compVehiclesCount && (
          <div className='flex flex-col items-center justify-center rounded-lg border border-neutral-2 px-4 py-3'>
            <p className='text-xs text-neutral-5'>{t('comp')}</p>
            <div className='text-base font-bold'>
              {compVehiclesCount} {t('vehicles')}
            </div>
          </div>
        )}

        {!!tplVehiclesCount && (
          <div className='flex flex-col items-center justify-center rounded-lg border border-neutral-2 px-4 py-3'>
            <p className='text-xs text-neutral-5'>{t('tpl')}</p>
            <div className='text-base font-bold'>
              {tplVehiclesCount} {t('vehicles')}
            </div>
          </div>
        )}

        <div className='flex flex-col items-center justify-center rounded-lg border border-neutral-2 px-4 py-3'>
          <p className='text-xs text-neutral-5'>{t('vehicles_list')}</p>

          <Button
            className=' h-6 cursor-pointer items-center gap-2 p-0 text-base font-bold text-primary-5'
            variant='text'
            size='S'
            onClick={onClickViewModal}
            disabled={isTimeout}
          >
            {totalVehicleCount} {t('vehicles')}
            <div className='cursor-pointer rtl:rotate-180'>
              <ArrowIcon />
            </div>
          </Button>
        </div>
      </div>
      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent className=' h-[800px] w-auto gap-4 px-6 pb-[60px]   lg:w-[855px] lg:pb-10'>
          <VehiclesListModal
            correlationId={correlationId}
            reference={reference}
            entityId={entityId}
            entityCrNumber={entityCrNumber}
            applicationReference={applicationReference}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AvailableQuotesCard
