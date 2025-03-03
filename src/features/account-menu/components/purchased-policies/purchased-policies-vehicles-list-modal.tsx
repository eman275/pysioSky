import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import React from 'react'
import { useGetPurchasedPoliciesResponseVehiclesListQuery } from '../../resources/get-purchased-policies-vehicles-list'
import PurchasedPoliciesVehiclesCardsTab from './purchased-policies-comp-vehicle-cards-tab'
import WarningCardAlert from '@/features/quotations/components/shared-components/warning-card-alert'
import { DialogCloseX, DialogHeader } from '@/shared/components/ui/dialog'
import VehiclesListSkeleton from '../vehicles-list-skeleton'
import { Skeleton } from '@/shared/components/ui/loader/skeleton'

type PurchasedPoliciesVehiclesListModalProps = {
  reference: string
  correlationId: string | undefined
  totalVehicleCount: number
}

const PurchasedPoliciesVehiclesListModal = ({
  correlationId,
  reference,
  totalVehicleCount,
}: PurchasedPoliciesVehiclesListModalProps) => {
  const t = useScopedI18n('userAccount.userAccount.available_quotes')

  const locale = useCurrentLocale()

  const { data: vehiclesList, isPending } =
    useGetPurchasedPoliciesResponseVehiclesListQuery({
      correlationId: correlationId,
      policyReference: reference,
    })

  const { compVehicles, compVehiclesCount, tplVehicles, tplVehiclesCount } =
    vehiclesList ?? {}

  const tabTriggers = [
    {
      value: 'COMP_vehicles',
      label: `${compVehiclesCount} ${t('comp')} ${t('vehicles')}`,
    },
    {
      value: 'TPL_vehicles',
      label: `${tplVehiclesCount} ${t('tpl')} ${t('vehicles')}`,
    },
  ]

  const defaultValueTab =
    compVehiclesCount === 0 ? 'TPL_vehicles' : 'COMP_vehicles'

  const modalTitle =
    compVehiclesCount === 0
      ? `${tplVehiclesCount} ${t('tpl')} ${t('vehicles')}`
      : `${compVehiclesCount} ${t('comp')} ${t('vehicles')}`

  return (
    <div className='relative max-h-[80vh] w-full rounded-lg bg-base-white p-6'>
      <DialogHeader className='mb-4 flex items-center   justify-between'>
        <p className='text-xxl font-bold '>
          {t('vehicles_list')} ({totalVehicleCount})
        </p>
        <DialogCloseX />
      </DialogHeader>
      <Tabs
        defaultValue={defaultValueTab}
        dir={locale === 'en' ? 'ltr' : 'rtl'}
      >
        {isPending ? (
          <Skeleton className='mb-4 h-11 w-full self-start ' />
        ) : (
          <>
            {!!compVehiclesCount &&
              !!tplVehiclesCount &&
              compVehiclesCount > 0 &&
              tplVehiclesCount > 0 && (
                <TabsList className='mb-4 grid w-full grid-cols-2 gap-4 rounded-lg border'>
                  {tabTriggers.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      className='gap-2 py-3 text-sm text-base-black data-[state=active]:bg-primary-6 data-[state=active]:text-base-white'
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

        {(compVehiclesCount === 0 || tplVehiclesCount === 0) && (
          <p className='mb-4 text-xl font-semibold'>{modalTitle}</p>
        )}

        <WarningCardAlert
          enableCloseIcon
          title='alert'
          message={t('purchased_policies_alert_description')}
          isDismissible
        />

        <div className='relative flex h-full flex-col overflow-hidden'>
          {tabTriggers.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className='mt-4 h-[600px] grow overflow-y-auto scrollbar-none'
            >
              {isPending ? (
                <VehiclesListSkeleton />
              ) : (
                <PurchasedPoliciesVehiclesCardsTab
                  compVehicles={
                    tab.value === 'COMP_vehicles' ? compVehicles : tplVehicles
                  }
                  compVehiclesCount={
                    tab.value === 'COMP_vehicles'
                      ? compVehiclesCount
                      : tplVehiclesCount
                  }
                  isTplType={tab.value === 'TPL_vehicles' && true}
                />
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

export default PurchasedPoliciesVehiclesListModal
