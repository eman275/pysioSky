import React from 'react'
import VehicleDetailsCardInfo from '@/features/fleet-details/fleet-list/components/vehicle-details-card-info'
import { usePagination } from '@/shared/hooks/use-pagination'
import Pagination from '@/features/fleet-details/fleet-list/components/pagination'
import { Vehicle } from '@/features/fleet-details/fleet-details.types'

export type AvailableVehiclesCardsTabProps = {
  vehicles: Vehicle[] | undefined
  totalCount: number
  pageSize: number
}

const AvailableVehiclesCardsTab = ({
  totalCount,
  vehicles,
  pageSize,
}: AvailableVehiclesCardsTabProps) => {
  const { paginatedData, currentPage, handlePageChange } = usePagination(
    vehicles || [],
    pageSize
  )

  return (
    <>
      <div className='mt-4 flex flex-col gap-3'>
        {paginatedData.map((item, index) => {
          return (
            <VehicleDetailsCardInfo
              disableActions
              key={index}
              vehicleDetailsCardInfo={item}
            />
          )
        })}
      </div>

      {totalCount > 0 && totalCount > pageSize && (
        <section className='flex justify-center'>
          <Pagination
            totalCount={totalCount}
            pageIndex={currentPage}
            onPageChange={handlePageChange}
            pageSize={pageSize}
          />
        </section>
      )}
    </>
  )
}

export default AvailableVehiclesCardsTab
