'use client'
import FailedAlert from '@/shared/components/ui/failed-alert'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import useGetIsMutatingByKey from '@/shared/hooks/use-get-is-mutating-by-key'
import { FLEET_LIST_PAGE_SIZE } from '@/shared/lib/constants/pagination'
import { useScopedI18n } from '@/shared/locales/client'
import PageRecoverState from '@/shared/ui-states/page-recover-state'
import { useEffect } from 'react'
import { generateCreateVehicleManuallyMutationKey } from '../../resources/fleet-details.helpers'
import { useGetVehiclesListQuery } from '../../resources/get-vehicles-list'
import useFleetListStore from '../hooks/use-fleet-list-store'
import FleetListSkeleton from './fleet-list-skeleton'
import NoVehicleCard from './no-vehicle-card'
import Pagination from './pagination'
import SelectAllRow from './select-all-row'
import VehicleListItem from './vehicle-list-item'
import FlagErrorIcon from '@/shared/components/icons/flag-error.svg'
import React from 'react'

export default function VehiclesList() {
  const t = useScopedI18n('application.fleetDetails')

  const clientQs = useClientQueryString()
  const pageNumber = clientQs.getByKey('pageNumber') || 1
  const hideApplicationItems = clientQs.getByKey('action')

  const isAddingNewVehicle = useGetIsMutatingByKey(
    generateCreateVehicleManuallyMutationKey()
  )

  const {
    data: vehiclesList,
    isPending,
    isSuccess,
    isError,
    isRefetching,
    refetch: refetchVehicleList,
  } = useGetVehiclesListQuery({
    pageIndex: +pageNumber,
  })

  const totalCount = vehiclesList?.metadata?.totalCount ?? 0
  const {
    setVehiclesList,
    vehiclesList: list,
    totalErrors,
  } = useFleetListStore()
  const fleetListLength = list?.length || 0
  const isEmptyFleetList = fleetListLength <= 0

  useEffect(() => {
    if (vehiclesList?.items) {
      setVehiclesList(vehiclesList.items, vehiclesList.totalInvalidVehicles)
    }
  }, [vehiclesList, setVehiclesList])

  const handlePageChange = (newPageIndex: number) => {
    clientQs.set([{ key: 'pageNumber', value: String(newPageIndex) }])
  }

  return (
    <>
      {/* loading state */}
      {isPending && <FleetListSkeleton />}

      {/* empty state */}
      {isSuccess && isEmptyFleetList && !isAddingNewVehicle && (
        <NoVehicleCard />
      )}

      {hideApplicationItems && !isAddingNewVehicle && <NoVehicleCard />}

      {isError && (
        <PageRecoverState
          description='Failed to load vehicle list'
          title='Something went wrong'
          retry={refetchVehicleList}
          isLoading={isRefetching}
        />
      )}

      {/* success state */}
      {isSuccess && !isEmptyFleetList && !hideApplicationItems && (
        <div className=' w-full'>
          <SelectAllRow />
          {totalErrors > 0 && (
            <div className='my-4'>
              <FailedAlert
                description={t('failed_vehicles', {
                  totalError: totalErrors,
                })}
                startIcon={<FlagErrorIcon />}
              />
            </div>
          )}
          <div className='mt-4 flex flex-col gap-4'>
            {list?.map((item) => (
              <VehicleListItem
                key={item.applicationVehicleReference}
                item={item}
              />
            ))}
          </div>
        </div>
      )}

      <section className='flex justify-center '>
        {!isEmptyFleetList &&
          totalCount > FLEET_LIST_PAGE_SIZE &&
          !hideApplicationItems && (
            <Pagination
              totalCount={vehiclesList?.metadata.totalCount}
              pageIndex={+pageNumber}
              onPageChange={handlePageChange}
              pageSize={FLEET_LIST_PAGE_SIZE}
            />
          )}
      </section>
    </>
  )
}
