import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import useClientQueryString from '@/shared/hooks/use-client-query-string'

const PurchasedPoliciesStatusTabs = () => {
  const t = useScopedI18n('userAccount.userAccount')
  const locale = useCurrentLocale()
  const clientQs = useClientQueryString()

  const policyStatus = clientQs.getByKey('policy-status')

  const tabTriggers = [
    { value: 0, label: t('all_policies') },
    {
      value: 1,
      label: t('under_issuance'),
    },
    { value: 2, label: t('active') },
    { value: 3, label: t('expired') },
  ]

  const handleTabChange = (tab: string) => {
    clientQs.set([{ key: 'policy-status', value: String(tab) }])
  }

  return (
    <Tabs
      defaultValue={String(policyStatus)}
      dir={locale === 'en' ? 'ltr' : 'rtl'}
      onValueChange={handleTabChange}
    >
      <TabsList className='mb-6 w-full  min-w-fit  justify-between lg:w-[40%] '>
        {tabTriggers.map((tab) => (
          <TabsTrigger
            key={tab.value}
            className='flex-1 gap-2 py-3 text-sm text-base-black data-[state=active]:bg-primary-6 data-[state=active]:text-base-white'
            value={String(tab.value)}
          >
            <span className='text-sm font-bold'>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default PurchasedPoliciesStatusTabs
