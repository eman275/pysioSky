'use client'

import React from 'react'
import { TabsContent } from '@/shared/components/ui/tabs'
import AvailableQuotes from './available-quotes'
import { UserAccountActiveTabEnum } from '@/shared/types/user-account-active-tab'
import AccountMenuTabsWrapper from './account-menu-tab-wrapper'
import PurchasedPolicies from './purchased-policies/purchased-policies'

const AccountMenuCard = () => {
  const tabContent = (
    <div className='col-span-6 lg:col-span-4'>
      <TabsContent value={UserAccountActiveTabEnum.PURCHASED_POLICIES}>
        <PurchasedPolicies />
      </TabsContent>
      <div className='col-span-6 lg:col-span-4'>
        <TabsContent value={UserAccountActiveTabEnum.AVAILABLE_QUOTES}>
          <AvailableQuotes />
        </TabsContent>
      </div>
    </div>
  )

  return <AccountMenuTabsWrapper>{tabContent}</AccountMenuTabsWrapper>
}

export default AccountMenuCard
