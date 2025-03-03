import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import React from 'react'
import ArrowIcon from '@/shared/components/icons/arrow-blue.svg'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import useDisclosure from '@/shared/hooks/use-disclosure'
import PurchasedPoliciesVehiclesListModal from './purchased-policies-vehicles-list-modal'
import { Button } from '@/shared/components/ui/button'
import { InsuranceCompanyType } from '../../resources/types'

export type PurchasedPoliciesHeaderProps = {
  insuranceCompanyType: InsuranceCompanyType
  totalVehicleCount: number
  reference: string
  correlationId: string | undefined
}

const PurchasedPoliciesHeader = (props: PurchasedPoliciesHeaderProps) => {
  const {
    insuranceCompanyType: { imageUrl, nameArabic, nameEnglish },
    totalVehicleCount,
    correlationId,
    reference,
  } = props
  const t = useScopedI18n('userAccount.userAccount')
  const { isOpened, setIsOpened } = useDisclosure()
  const locale = useCurrentLocale()
  const companyName = locale == 'en' ? nameEnglish : nameArabic

  return (
    <div>
      <section className=' flex items-center gap-4 rounded-lg border border-primary-2 bg-primary-7 p-4'>
        <Avatar className='flex-center flex size-[68px] shrink-0 rounded-lg border border-neutral-2 bg-neutral-1 p-1'>
          <AvatarImage src={imageUrl} className='object-contain' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className=' text-lg font-bold'>{companyName} </p>
          <p className='flex items-center gap-3 text-sm'>
            {t('available_quotes.vehicles_list')} :
            <Button
              className=' flex cursor-pointer items-center p-0 font-bold text-primary-5 '
              variant='text'
              size='S'
              onClick={() => setIsOpened(true)}
            >
              {totalVehicleCount} {t('available_quotes.vehicles')}
              <div className='rtl:rotate-180'>
                <ArrowIcon />
              </div>
            </Button>
          </p>
        </div>
      </section>
      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent className=' h-[800px] w-auto gap-4  p-6 lg:w-[855px] lg:p-8 '>
          <PurchasedPoliciesVehiclesListModal
            reference={reference}
            correlationId={correlationId}
            totalVehicleCount={totalVehicleCount}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PurchasedPoliciesHeader
