import React from 'react'
import VehicleDetailsCardInfo from '@/features/fleet-details/fleet-list/components/vehicle-details-card-info'
import Pagination from '@/features/fleet-details/fleet-list/components/pagination'
import { COMP_VEHICLES_PAGE_SIZE } from '@/shared/lib/constants'
import { usePagination } from '@/shared/hooks/use-pagination'
import RepairTypeActions from '../../quote-customization/components/repair-type-actions'
import RepairTypeContent from '../../quotes-list/components/repair-type-content'
import { useScopedI18n } from '@/shared/locales/client'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store'

type Props = {
  isTitle?: boolean
}

type RepairTypeSection = {
  isTitle: boolean
  reference: string
  selectedOption: string
}
const RepairTypeSection = React.memo(
  ({ isTitle, reference, selectedOption }: RepairTypeSection) => {
    return isTitle ? (
      <RepairTypeActions
        vehicleReference={reference}
        currentSelectedDeductibleReference={selectedOption}
      />
    ) : (
      <RepairTypeContent reference={reference} />
    )
  },
  (prevProps, nextProps) => {
    // Custom comparison function
    return prevProps.selectedOption === nextProps.selectedOption
  }
)

RepairTypeSection.displayName = 'RepairTypeSection'

const COMPVehiclesCardsTab = ({ isTitle = false }: Props) => {
  const { compVehicles, compCount, deductibles } = useSingleQuoteStore(
    ({ compVehicles, compCount, deductibles }) => ({
      compVehicles,
      compCount,
      deductibles,
    })
  )
  const { paginatedData, currentPage, handlePageChange } = usePagination(
    compVehicles || [],
    COMP_VEHICLES_PAGE_SIZE
  )

  const t = useScopedI18n('application.quotations')

  return (
    <>
      <div className='mt-4 flex flex-col gap-3'>
        {isTitle && (
          <div className='text-base'>{t('edit_repair_method.title')}</div>
        )}

        {paginatedData?.map((item) => {
          const selected = deductibles[item.reference].currentSelected
          return (
            <VehicleDetailsCardInfo
              enableEditBtn={item.isEstimatedValueModified}
              repairTypeSection={
                <RepairTypeSection
                  isTitle={isTitle}
                  reference={item.reference}
                  selectedOption={selected as string}
                />
              }
              disableActions
              selectedOption={selected as string}
              key={item.reference}
              vehicleDetailsCardInfo={item}
            />
          )
        })}
      </div>

      {compCount > COMP_VEHICLES_PAGE_SIZE && (
        <section className='flex justify-center'>
          <Pagination
            totalCount={compCount}
            pageIndex={currentPage}
            onPageChange={handlePageChange}
            pageSize={COMP_VEHICLES_PAGE_SIZE}
          />
        </section>
      )}
    </>
  )
}

export default COMPVehiclesCardsTab
