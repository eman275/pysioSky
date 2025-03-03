import React from 'react'
import { TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { useScopedI18n } from '@/shared/locales/client'
import ArrowIcon from '@/shared/components/icons/arrow-blue.svg'
import UserAccountIcon from '@/shared/components/icons/user-account-icon.svg'
import { UserAccountActiveTabEnum } from '@/shared/types/user-account-active-tab'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
type AccountMenuProps = {
  activeTab: UserAccountActiveTabEnum
}

const AccountMenu = (props: AccountMenuProps) => {
  const { activeTab } = props
  const t = useScopedI18n('userAccount.userAccount.account_menu')
  const clientQs = useClientQueryString()

  const pageNumber = clientQs.getByKey('pageNumber') || 1

  const policyStatus = clientQs.getByKey('policy-status') || null

  return (
    <div className='w-full rounded-lg border border-neutral-2 px-3 py-4 lg:h-[194px] '>
      <div className='flex items-center gap-4'>
        <UserAccountIcon />
        <p className='text-sm font-bold'>User Name here</p>
      </div>
      <div className='my-4 border-b border-neutral-2'></div>

      <div className=''>
        <TabsList className='flex flex-col gap-4 text-start'>
          <TabsTrigger
            className='flex w-full items-center justify-between'
            value={UserAccountActiveTabEnum.PURCHASED_POLICIES}
          >
            <Link
              href={`/user-account?active-tab=${UserAccountActiveTabEnum.PURCHASED_POLICIES}&pageNumber=${pageNumber}&policy-status=${policyStatus}`}
            >
              {t('purchased_policies')}
            </Link>
            {activeTab === UserAccountActiveTabEnum.PURCHASED_POLICIES && (
              <div className='rtl:rotate-180'>
                <ArrowIcon />
              </div>
            )}
          </TabsTrigger>

          <TabsTrigger
            value={UserAccountActiveTabEnum.AVAILABLE_QUOTES}
            className={cn(
              'flex w-full items-center justify-between',
              activeTab === UserAccountActiveTabEnum.AVAILABLE_QUOTES &&
                'rounded-lg border border-primary-2 bg-primary-7'
            )}
          >
            <Link
              href={`/user-account?active-tab=${UserAccountActiveTabEnum.AVAILABLE_QUOTES}&pageNumber=${pageNumber}`}
            >
              {t('available_quotes')}
            </Link>

            {activeTab === UserAccountActiveTabEnum.AVAILABLE_QUOTES && (
              <div className='rtl:rotate-180'>
                <ArrowIcon />
              </div>
            )}
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  )
}

export default AccountMenu
