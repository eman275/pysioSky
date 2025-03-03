'use client'

import React from 'react'
import PlusIcon from '@/shared/components/icons/plus.svg'
import MinusIcon from '@/shared/components/icons/minus-icon.svg'
import { useScopedI18n } from '@/shared/locales/client'
import PolicyPremiumFeatureItem from './policy-premium-feature-item'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { Feature } from '../../resources/quotation.types'
import { cn } from '@/shared/lib/utils'

interface PolicyPremiumFeatureProps {
  tplFeatures?: Feature[]
  compFeatures?: Feature[]
  isModified?: boolean
  isCollapsible?: boolean
  compVehicleNumber: number | undefined
  tplVehicleNumber: number | undefined
  isTitle?: boolean
}

const PolicyPremiumFeatures = ({
  isModified = false,
  tplFeatures = [],
  compFeatures = [],
  isCollapsible = false,
  compVehicleNumber = 0,
  tplVehicleNumber = 0,
  isTitle = false,
}: PolicyPremiumFeatureProps) => {
  const t = useScopedI18n('application.quotations')
  const { isOpened: isDetailsVisible, setIsOpened } = useDisclosure({
    isDefaultOpened: !isCollapsible,
  })

  const handleToggleDetails = () => setIsOpened((prevState) => !prevState)

  const shouldShowToggle =
    (compFeatures.length > 3 || tplFeatures.length > 3) && isCollapsible

  const getDisplayedFeatures = (features: Feature[]) =>
    isDetailsVisible ? features : features.slice(0, 3)

  const displayedTplFeatures = getDisplayedFeatures(tplFeatures)
  const displayedCompFeatures = getDisplayedFeatures(compFeatures)

  const getTitle = (type: 'TPL' | 'COMP', vehicleNumber: number) =>
    tplVehicleNumber && compVehicleNumber
      ? `${type}  .  ${vehicleNumber} Vehicle`
      : `All Vehicles to be ${type}  .  ${vehicleNumber} vehicle`

  const tplTitle = getTitle('TPL', tplVehicleNumber)
  const compTitle = getTitle('COMP', compVehicleNumber)

  const isBorder =
    displayedCompFeatures.length > 0 && displayedTplFeatures.length > 0

  return (
    <div className='flex flex-col gap-3'>
      {isTitle && (
        <div className='text-base font-semibold'>
          {t('premium_features.title')}
        </div>
      )}
      <div className={cn(isBorder ? 'grid grid-cols-2 gap-3' : 'flex')}>
        {displayedCompFeatures.length > 0 && (
          <PolicyPremiumFeatureItem
            features={displayedCompFeatures}
            title={compTitle}
            isModified={isModified}
          />
        )}
        {displayedTplFeatures.length > 0 && (
          <div className={cn(isBorder && 'border-l-2 pl-3')}>
            <PolicyPremiumFeatureItem
              features={displayedTplFeatures}
              title={tplTitle}
              isModified={isModified}
            />
          </div>
        )}
      </div>

      {shouldShowToggle && (
        <div
          className='flex cursor-pointer items-center gap-1 text-xs font-bold'
          onClick={handleToggleDetails}
        >
          {isDetailsVisible ? <MinusIcon /> : <PlusIcon />}
          <p>
            {isDetailsVisible ? t('hide_all_benefits') : t('show_all_benefits')}
          </p>
        </div>
      )}
    </div>
  )
}

export default PolicyPremiumFeatures
