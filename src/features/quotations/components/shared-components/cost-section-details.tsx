'use client'
import React, { PropsWithChildren, ReactNode } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/layout/collapsible'
import CollapsibleMotion from '@/shared/components/layout/motion/collapsible-motion'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { PropsWithClassName } from '../../../../shared/types/components.types'
import CostSectionArrows from './cost-section-arrows'
import OriginalPriceContent from './original-price-content'
import PriceDetailsContent from './price-details-content'
import PriceResetFlag from './price-reset-flag'
import { formatThousandsSeparators } from '@/shared/lib/utils'

type Props = {
  isCollapsible: boolean
  totalDeductibles: number
  originalDeductibles: number
  actions?: ReactNode
  subQuoteReference: string
} & PropsWithClassName &
  PropsWithChildren

const CostSectionDetails = ({
  isCollapsible,
  className,
  totalDeductibles,
  originalDeductibles,
  subQuoteReference,
  actions,
  children,
}: Props) => {
  const { isOpened, onToggle } = useDisclosure({
    isDefaultOpened: !isCollapsible,
  })
  const isNewPrice =
    formatThousandsSeparators(originalDeductibles, true) !==
    formatThousandsSeparators(totalDeductibles, true)

  return (
    <div className={className}>
      <Collapsible open={!isCollapsible || isOpened} onOpenChange={onToggle}>
        <CollapsibleTrigger className='w-full'>
          <div className='flex flex-row'>
            <div className='flex w-full flex-col'>
              {isNewPrice && (
                <OriginalPriceContent totalDeductibles={originalDeductibles} />
              )}
              <PriceDetailsContent
                isNewPrice={isNewPrice}
                totalDeductibles={totalDeductibles}
              />
            </div>
            {isCollapsible && <CostSectionArrows isOpened={isOpened} />}
          </div>
        </CollapsibleTrigger>
        {isNewPrice && <PriceResetFlag subQuoteReference={subQuoteReference} />}
        <CollapsibleContent asChild>
          <CollapsibleMotion isOpened={!isCollapsible || isOpened}>
            {children}
          </CollapsibleMotion>
        </CollapsibleContent>
      </Collapsible>
      {actions}
    </div>
  )
}

export default CostSectionDetails
