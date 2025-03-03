import Pagination from '@/features/fleet-details/fleet-list/components/pagination'
import VehicleDetailsCardInfo from '@/features/fleet-details/fleet-list/components/vehicle-details-card-info'
import { usePagination } from '@/shared/hooks/use-pagination'
import { TPL_VEHICLES_PAGE_SIZE } from '@/shared/lib/constants'
import { useScopedI18n } from '@/shared/locales/client'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store'
type Props = {
  isTitle?: boolean
}
const TplVehiclesCardsTab = ({ isTitle = false }: Props) => {
  const { tplDetails, tplCount } = useSingleQuoteStore(
    ({ tplDetails, tplCount }) => ({ tplDetails, tplCount })
  )

  const { paginatedData, currentPage, handlePageChange } = usePagination(
    tplDetails?.vehicles || [],
    TPL_VEHICLES_PAGE_SIZE
  )
  const t = useScopedI18n('application.quotations')

  return (
    <>
      <div className='mt-4 flex flex-col gap-3'>
        {isTitle && <div className='text-base'>{t('vehicle_list')}</div>}
        {paginatedData.map((item) => (
          <VehicleDetailsCardInfo
            enableModifiedTooltip={item.isInsuranceTypeModified}
            disableActions
            disableSumInsured
            key={item.reference}
            vehicleDetailsCardInfo={item}
          />
        ))}
      </div>
      <section className='flex justify-center'>
        {tplCount > TPL_VEHICLES_PAGE_SIZE && (
          <Pagination
            totalCount={tplCount}
            pageIndex={currentPage}
            onPageChange={handlePageChange}
            pageSize={TPL_VEHICLES_PAGE_SIZE}
          />
        )}
      </section>
    </>
  )
}

export default TplVehiclesCardsTab
