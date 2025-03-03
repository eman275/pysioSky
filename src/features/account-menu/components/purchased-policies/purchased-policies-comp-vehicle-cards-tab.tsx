import React from 'react'
import VehicleDetailsCardInfo from '@/features/fleet-details/fleet-list/components/vehicle-details-card-info'
import Pagination from '@/features/fleet-details/fleet-list/components/pagination'
import { COMP_VEHICLES_PAGE_SIZE } from '@/shared/lib/constants'
import { usePagination } from '@/shared/hooks/use-pagination'
import RepairTypeContent from '@/features/quotations/quotes-list/components/repair-type-content'
import { PoliciesVehicleType } from '../../resources/types'

type Props = {
  isTitle?: boolean
  compVehiclesCount: number | undefined
  compVehicles: PoliciesVehicleType[] | undefined
  isTplType: boolean
}

const PurchasedPoliciesVehiclesCardsTab = ({
  compVehicles,
  compVehiclesCount,
  isTplType,
}: Props) => {
  const { paginatedData, currentPage, handlePageChange } = usePagination(
    compVehicles || [],
    COMP_VEHICLES_PAGE_SIZE
  )

  return (
    <>
      <div className=' flex flex-col gap-3'>
        {paginatedData?.map((item) => {
          return (
            <VehicleDetailsCardInfo
              repairTypeSection={
                !isTplType && (
                  <RepairTypeContent
                    reference={item.reference}
                    vehicleRepairType={item?.deductible?.repairMethod}
                    totalDeductibleAmount={item?.deductible?.deductibleAmount}
                  />
                )
              }
              disableActions
              key={item.reference}
              vehicleDetailsCardInfo={item}
              disableSumInsured={isTplType}
            />
          )
        })}
      </div>

      {!!compVehiclesCount && compVehiclesCount > COMP_VEHICLES_PAGE_SIZE && (
        <section className='flex justify-center'>
          <Pagination
            totalCount={compVehiclesCount}
            pageIndex={currentPage}
            onPageChange={handlePageChange}
            pageSize={COMP_VEHICLES_PAGE_SIZE}
          />
        </section>
      )}
    </>
  )
}

export default PurchasedPoliciesVehiclesCardsTab
