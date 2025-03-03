'use client'

import React, { ReactNode } from 'react'
import { useCurrentLocale } from '@/shared/locales/client'
import { Tabs } from '@/shared/components/ui/tabs'
import AccountMenu from './account-menu'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { UserAccountActiveTabEnum } from '@/shared/types/user-account-active-tab'
import { cn } from '@/shared/lib/utils'

type TabsWrapperProps = {
  children?: ReactNode
}

const AccountMenuTabsWrapper = ({ children }: TabsWrapperProps) => {
  const locale = useCurrentLocale()
  const clientQs = useClientQueryString()

  const activeTab = clientQs.getByKey('active-tab') as string

  const handleTabChange = (tab: string) => {
    clientQs.set([{ key: 'active-tab', value: tab }])
  }

  return (
    <Tabs
      defaultValue={activeTab}
      dir={locale === 'en' ? 'ltr' : 'rtl'}
      onValueChange={handleTabChange}
      className={cn(children && 'grid grid-cols-6 gap-3')}
      variant='vertical'
      value={activeTab as string}
    >
      <div className={cn('col-span-2 ', children && 'hidden lg:block')}>
        <AccountMenu activeTab={activeTab as UserAccountActiveTabEnum} />
      </div>
      {children}
    </Tabs>
  )
}

export default AccountMenuTabsWrapper
