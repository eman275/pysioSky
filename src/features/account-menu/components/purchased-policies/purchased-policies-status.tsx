import React from 'react'
import FrameIcon from '@/shared/components/icons/clock-pause.svg'
import ActiveIcon from '@/shared/components/icons/active-icon.svg'
import ExpireIcon from '@/shared/components/icons/expire-icon.svg'

import { useScopedI18n } from '@/shared/locales/client'
import { cn } from '@/shared/lib/utils'
import { PurchasedPoliciesStatusEnum } from '@/shared/types/user-account-active-tab'

type PurchasedPoliciesStatusProps = {
  status: number
}

const PurchasedPoliciesStatus = ({ status }: PurchasedPoliciesStatusProps) => {
  const t = useScopedI18n('userAccount.userAccount')

  const baseClass =
    'mt-4 flex w-full items-center justify-center gap-3 rounded-b-lg  lg:rounded-s-none lg:rounded-r-lg  px-4 py-[18px] text-sm font-bold text-base-white lg:mt-0 lg:w-auto'

  const renderPolicyStatus = (
    icon: React.ReactNode,
    bgColorClass: string,
    label: string
  ) => (
    <div className={cn(baseClass, bgColorClass)}>
      {icon}
      {label}
    </div>
  )

  return (
    <div>
      {status === PurchasedPoliciesStatusEnum.UNDER_ISSUANCE
        ? renderPolicyStatus(
            <FrameIcon />,
            'bg-tertiary-6',
            t('under_issuance')
          )
        : status === PurchasedPoliciesStatusEnum.ACTIVE
          ? renderPolicyStatus(
              <ActiveIcon />,
              'bg-success-6',
              t('policy_active')
            )
          : status === PurchasedPoliciesStatusEnum.EXPIRED
            ? renderPolicyStatus(<ExpireIcon />, 'bg-neutral-4', t('expired'))
            : null}
    </div>
  )
}

export default PurchasedPoliciesStatus
