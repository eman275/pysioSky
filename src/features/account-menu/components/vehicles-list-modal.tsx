'use-client'

import WarningCardAlert from '@/features/quotations/components/shared-components/warning-card-alert'
import NextArrow from '@/shared/components/icons/next-arrow.svg'
import { Button } from '@/shared/components/ui/button'
import { DialogCloseX, DialogHeader } from '@/shared/components/ui/dialog'
import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import {
  COMP_VEHICLES_PAGE_SIZE,
  TPL_VEHICLES_PAGE_SIZE,
} from '@/shared/lib/constants'
import { formatDate } from '@/shared/lib/utils'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import { useState } from 'react'
import { useGetQuotesVehiclesListQuery } from '../resources/get-quotes-vehicles-list'
import AvailableVehiclesCardsTab from './available-vehicle-cards-tab'
import QuoteTimer from './quote-timer'
import VehiclesListSkeleton from './vehicles-list-skeleton'
import React from 'react'
import { useRouter } from 'next/navigation'
import { generateAppPath } from '@/shared/hooks/use-app-routes'

type VehiclesListModalProps = {
  reference: string
  correlationId: string | undefined
  entityId: string
  entityCrNumber: string
  applicationReference: string
}

const VehiclesListModal = ({
  correlationId,
  reference,
  entityId,
  entityCrNumber,
  applicationReference,
}: VehiclesListModalProps) => {
  const t = useScopedI18n('userAccount.userAccount.available_quotes')

  const locale = useCurrentLocale()
  const { data: vehiclesList, isPending } = useGetQuotesVehiclesListQuery({
    correlationId: correlationId,
    quoteRequestReference: reference,
  })

  const {
    compVehicles,
    compVehicleCount,
    tplVehicles,
    tplVehicleCount,
    quotesCount,
    code,
    createdOn: requestDate,
    expiresInSeconds: timer,
    totalVehicleCount,
  } = vehiclesList?.quoteDetails ?? {}

  const tabTriggers = [
    {
      value: 'COMP_vehicles',
      label: `${compVehicleCount} ${t('comp')} ${t('vehicles')}`,
    },
    {
      value: 'TPL_vehicles',
      label: `${tplVehicleCount} ${t('tpl')} ${t('vehicles')}`,
    },
  ]

  const [isTimeout, setIsTimeout] = useState(false)
  const router = useRouter()
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

  const modalTitle =
    compVehicleCount === 0
      ? `${tplVehicleCount} ${t('tpl')} ${t('vehicles')}`
      : `${compVehicleCount} ${t('comp')} ${t('vehicles')}`

  return (
    <div className='relative max-h-[80vh] w-full rounded-lg bg-base-white p-6'>
      <DialogHeader className='flex items-center justify-between   '>
        <p className='mb-4 text-xxl font-bold '>
          {t('vehicles_list')} {`(${totalVehicleCount})`}
        </p>
        <DialogCloseX />
      </DialogHeader>
      {timer && (
        <QuoteTimer
          timer={timer}
          handleCountdownFinish={handleCountdownFinish}
          requestDate={
            requestDate && formatDate(new Date(requestDate), 'forClient')
          }
          isTimeout={isTimeout}
          requestId={code}
        />
      )}
      <Tabs
        defaultValue='COMP_vehicles'
        dir={locale === 'en' ? 'ltr' : 'rtl'}
        className='mt-4'
      >
        {(compVehicleCount === 0 || tplVehicleCount === 0) && (
          <p className='mb-4 text-xl font-semibold'>{modalTitle}</p>
        )}
        <WarningCardAlert
          enableCloseIcon
          title='alert'
          message={t('alert_description')}
          isDismissible
        />

        {isPending ? (
          <Skeleton className='mt-4 h-11 w-full self-start ' />
        ) : (
          <>
            {!!compVehicleCount &&
              !!tplVehicleCount &&
              compVehicleCount > 0 &&
              tplVehicleCount > 0 && (
                <TabsList className='mt-4 grid w-full grid-cols-2 gap-4 rounded-lg border'>
                  {tabTriggers.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      className='gap-2 py-3 text-sm  data-[state=active]:bg-primary-6 data-[state=active]:text-base-white'
                      value={tab.value}
                    >
                      <span className='flex text-xxs font-bold lg:text-sm'>
                        {tab.label}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              )}
          </>
        )}

        <div className='relative flex h-full flex-col overflow-hidden'>
          {tabTriggers.map((tab) => {
            return (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className='h-[400px] grow overflow-y-auto scrollbar-none'
              >
                {isPending ? (
                  <VehiclesListSkeleton />
                ) : (
                  <AvailableVehiclesCardsTab
                    vehicles={
                      tab.value === 'COMP_vehicles' ? compVehicles : tplVehicles
                    }
                    totalCount={
                      tab.value === 'COMP_vehicles'
                        ? Number(compVehicleCount)
                        : Number(tplVehicleCount)
                    }
                    pageSize={
                      tab.value === 'COMP_vehicles'
                        ? COMP_VEHICLES_PAGE_SIZE
                        : TPL_VEHICLES_PAGE_SIZE
                    }
                  />
                )}
              </TabsContent>
            )
          })}
          <div className='sticky bottom-0  mt-8 flex justify-end'>
            <Button
              className='flex justify-between gap-6 px-6 py-4'
              variant='solid'
              colorScheme='secondary'
              size='L'
              onClick={onClickViewQuotes}
            >
              {t('view_quotes', { total: quotesCount })}
              <div className='rtl:rotate-180'>
                <NextArrow />
              </div>
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

export default VehiclesListModal
