import { Card } from '@/shared/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import React, { useMemo } from 'react'
import COMPVehiclesCardsTab from '../../components/quotation-details-tabs/comp-vehicle-cards-tab'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store'
import TplVehiclesCardsTab from '../../components/quotation-details-tabs/tpl-vehicle-cards-tab'

const VehicleCustomizationContent = () => {
  const t = useScopedI18n('application.quotations')
  const locale = useCurrentLocale()
  const tabDirection = locale === 'en' ? 'ltr' : 'rtl'
  const { compCount, tplCount } = useSingleQuoteStore(
    ({ compCount, tplCount }) => ({ compCount, tplCount })
  )

  const tabTriggers = useMemo(() => {
    const tabs = []
    if (compCount > 0) {
      tabs.push({
        value: 'COMP_vehicles',
        label: t('quotation_summary.comp_vehicles', { total: compCount }),
      })
    }
    if (tplCount > 0) {
      tabs.push({
        value: 'TPL_vehicles',
        label: t('quotation_summary.tpl_vehicles', { total: tplCount }),
      })
    }
    return tabs
  }, [compCount, tplCount, t])

  if (tabTriggers.length === 1 && compCount) return <CompCustomizationTab />
  if (tabTriggers.length === 1 && tplCount) return <TplCustomizationTab />

  return (
    tabTriggers.length > 1 && (
      <Tabs defaultValue={tabTriggers[0].value} dir={tabDirection}>
        <TabsList className='mb-4 grid grid-cols-2 gap-4 rounded-lg border'>
          {tabTriggers.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className='gap-2 py-3 text-sm text-base-black data-[state=active]:bg-primary-6 data-[state=active]:text-base-white'
              value={tab.value}
            >
              <span className='flex text-xxs font-bold xl:text-sm'>
                {tab.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabTriggers.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.value === 'COMP_vehicles' && <CompCustomizationTab />}
            {tab.value === 'TPL_vehicles' && <TplCustomizationTab />}
          </TabsContent>
        ))}
      </Tabs>
    )
  )
}

export default React.memo(VehicleCustomizationContent)

const CompCustomizationTab = () => {
  const t = useScopedI18n('application.quotations.quotation_summary')
  const { compCount, tplCount } = useSingleQuoteStore((state) => ({
    tplCount: state.tplCount,
    compCount: state.compCount,
  }))
  if (!compCount) return null
  return (
    <>
      {!tplCount && (
        <div className='text-xl font-semibold'>
          {t('comp_vehicles', { total: compCount })}
        </div>
      )}
      <Card className='p-4 pt-0'>
        <COMPVehiclesCardsTab isTitle />
      </Card>
    </>
  )
}

const TplCustomizationTab = () => {
  const t = useScopedI18n('application.quotations.quotation_summary')
  const { compCount, tplCount } = useSingleQuoteStore((state) => ({
    tplCount: state.tplCount,
    compCount: state.compCount,
  }))
  if (!tplCount) return null
  return (
    <>
      {!compCount && (
        <div className='text-xl font-semibold'>
          {t('tpl_vehicles', { total: tplCount })}
        </div>
      )}
      <Card className='p-4 pt-0'>
        <TplVehiclesCardsTab isTitle />
      </Card>
    </>
  )
}
