'use client'

import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'
import useFleetListStore from '../hooks/use-fleet-list-store'
import { useGetVehiclesListQuery } from '../../resources/get-vehicles-list'
import { Button } from '@/shared/components/ui/button'
import AddVehicleIcon from '@/shared/components/icons/add-vehicle-icon.svg'

export default function FleetListHeader() {
  const clientQs = useClientQueryString()
  const hideApplicationItems = Boolean(clientQs.getByKey('action'))
  const t = useScopedI18n('application.fleetDetails')
  const { setActiveContent, toggleDialog } = useFleetListStore()
  const { data: vehicles } = useGetVehiclesListQuery()

  const totalCount = hideApplicationItems
    ? 0
    : vehicles?.metadata?.totalCount ?? 0

  const onClickHandler = () => {
    toggleDialog(true)
    setActiveContent('add-vehicle')
  }

  return (
    <>
      <section className='col-span-4'>
        <p className='mb-6 text-lg font-bold text-neutral-5'>
          {t('add_vehicle.add_vehicle_details')}
        </p>
      </section>
      <section className='col-span-8'>
        <div className='mb-6 flex items-center justify-between gap-16'>
          <div className='flex items-center gap-3'>
            <p className='text-lg font-bold'>{t('vehicles_list')}</p>
            <div className='flex h-[35px] items-center justify-center rounded-[30px] border bg-neutral-2 px-3 py-1 font-bold'>
              {totalCount}
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              className='lg:hidden'
              variant='glassy'
              size='XS'
              onClick={onClickHandler}
            >
              <AddVehicleIcon />
              {t('vehicle')}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
