import useSingleQuoteStore from '@/features/quotations/quotes-list/hooks/use-single-quote-store'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'

const FleetDetailsTab = () => {
  const tSummary = useScopedI18n('application.paymentDetails')
  const t = useScopedI18n('application.quotations')
  const { compCount, tplCount, agencyVehicleCount, workshopVehicleCount } =
    useSingleQuoteStore((state) => ({
      tplCount: state.tplCount,
      compCount: state.compCount,
      agencyVehicleCount: state.agencyVehicleCount,
      workshopVehicleCount: state.workshopVehicleCount,
    }))

  const RepairTypeDetail = (
    <>
      {workshopVehicleCount > 0 && (
        <div className='flex-1'>
          <div className='flex justify-between gap-6 lg:justify-start'>
            <span className='text-sm'>
              {t('repair_type_section.sub_title', {
                total: workshopVehicleCount,
              })}
            </span>
            <span className='text-sm font-bold'>
              {t('repair_type_section.workshop')}
            </span>
          </div>
        </div>
      )}
      {agencyVehicleCount > 0 && (
        <div className='flex-1'>
          <div className='flex justify-between gap-6 lg:justify-start'>
            <span className='text-sm'>
              {t('repair_type_section.sub_title', {
                total: agencyVehicleCount,
              })}
            </span>
            <span className='text-sm font-bold'>
              {t('repair_type_section.agency')}
            </span>
          </div>
        </div>
      )}
    </>
  )

  return (
    <div>
      {tplCount && (
        <div className='mb-4 rounded-lg border border-neutral-2 px-3 py-2'>
          <p className='text-sm font-semibold text-base-black'>
            {tSummary('tpl_vehicles')} {tplCount || 0}
          </p>
        </div>
      )}
      {compCount && (
        <div className='rounded-lg border border-neutral-2 px-3 py-2'>
          <p className='mb-2 text-sm font-semibold text-base-black'>
            {tSummary('comp_vehicles')} {compCount || 0}
          </p>

          <>
            <p className='mb-1 text-sm font-semibold text-neutral-5'>
              {t('repair_type')}
            </p>
            <div className='flex flex-col gap-2 rounded-sm bg-neutral-1 px-3 py-2 lg:flex-row lg:items-center'>
              {RepairTypeDetail}
            </div>
          </>
        </div>
      )}
    </div>
  )
}

export default FleetDetailsTab
