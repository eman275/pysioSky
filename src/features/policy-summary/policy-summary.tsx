'use client'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import PolicyDetailTab from './components/summary-ploicy-tabs/policy-detail-tab'
import FleetDetailsTab from './components/summary-ploicy-tabs/fleet-details-tab'
import PolicyHolderDetailsTab from './components/summary-ploicy-tabs/policy-holder-details-tab'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'

export default function PolicySummary() {
  const t = useScopedI18n('application.paymentDetails.summary')
  const locale = useCurrentLocale()
  return (
    <>
      <Tabs
        variant='underlined'
        defaultValue='policy_details'
        dir={locale === 'en' ? 'ltr' : 'rtl'}
      >
        <div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center lg:gap-0'>
          <TabsList className='grid w-full grid-cols-3 '>
            <TabsTrigger value='policy_details'>
              {t('policy_details')}
            </TabsTrigger>
            <TabsTrigger value='fleetDetails'>{t('fleet_details')}</TabsTrigger>
            <TabsTrigger value='policy_holder_detail'>
              {t('policy_holder_details')}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className='mt-6' value='policy_details'>
          <PolicyDetailTab />
        </TabsContent>
        <TabsContent className='mt-6' value='fleetDetails'>
          <FleetDetailsTab />
        </TabsContent>
        <TabsContent className='mt-6' value='policy_holder_detail'>
          <PolicyHolderDetailsTab />
        </TabsContent>
      </Tabs>
    </>
  )
}
