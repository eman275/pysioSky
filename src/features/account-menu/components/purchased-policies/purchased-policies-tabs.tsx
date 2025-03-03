import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import { PurchasedPoliciesEnum } from '@/shared/types/user-account-active-tab'
import PolicyDetailsTabIContent from './policy-details-tab-content'
import CompanyDetailsTabIContent from './company-details-tab-content'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import { EntityType, VehicleDetailsType } from '../../resources/types'

type PurchasedPoliciesTabsProps = {
  companyDetails: EntityType
  tplDetails: VehicleDetailsType | null
  compDetails: VehicleDetailsType | null
}

const PurchasedPoliciesTabs = (props: PurchasedPoliciesTabsProps) => {
  const { companyDetails, tplDetails, compDetails } = props
  const t = useScopedI18n('userAccount.userAccount')
  const locale = useCurrentLocale()

  return (
    <Tabs
      defaultValue={PurchasedPoliciesEnum.POLICIES_DETAILS}
      dir={locale === 'en' ? 'ltr' : 'rtl'}
    >
      <TabsList className='mb-4 w-full justify-between  lg:w-[44%] '>
        <TabsTrigger
          value={PurchasedPoliciesEnum.COMPANY_DETAILS}
          className='flex-1 px-4'
        >
          {t('company_details')}
        </TabsTrigger>
        <TabsTrigger
          value={PurchasedPoliciesEnum.POLICIES_DETAILS}
          className='flex-1 px-4'
        >
          {t('policy_details')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={PurchasedPoliciesEnum.COMPANY_DETAILS}>
        <CompanyDetailsTabIContent companyDetails={companyDetails} />
      </TabsContent>
      <TabsContent value={PurchasedPoliciesEnum.POLICIES_DETAILS}>
        <PolicyDetailsTabIContent
          tplDetails={tplDetails}
          compDetails={compDetails}
        />
      </TabsContent>
    </Tabs>
  )
}

export default PurchasedPoliciesTabs
