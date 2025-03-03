import React from 'react'

import NoData from '@/shared/components/icons/not-data.svg'
import { useScopedI18n } from '@/shared/locales/client'
import { Card } from '@/shared/components/ui/card'

const NoVehicleCard = () => {
  const t = useScopedI18n('application.fleetDetails')
  return (
    <Card className='grid h-full min-h-72 place-content-center place-items-center'>
      <NoData />
      <p className='text-xs font-bold'>{t('no_vehicle_card.title')}</p>
      <p className='text-xs text-neutral-5'>{t('no_vehicle_card.sub_title')}</p>
    </Card>
  )
}

export default NoVehicleCard
