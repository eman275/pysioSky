'use client'
import { Card } from '@/shared/components/ui/card'
import { useScopedI18n } from '@/shared/locales/client'
import DeductiblesContent from '../../quotes-list/components/deductibles-content'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store'

const PolicyDetailsTab = () => {
  const t = useScopedI18n('application.quotations')

  const {
    compCount,
    tplCount,
    totalCompTaxableAmount,
    totalTplTaxableAmount,
    totalVatAmount,
    vatPercentage,
    agencyVehicleCount,
    workshopVehicleCount,
  } = useSingleQuoteStore(
    ({
      compCount,
      tplCount,
      totalCompTaxableAmount,
      totalTplTaxableAmount,
      totalVatAmount,
      vatPercentage,
      agencyVehicleCount,
      workshopVehicleCount,
    }) => ({
      compCount,
      tplCount,
      totalCompTaxableAmount,
      totalTplTaxableAmount,
      totalVatAmount,
      vatPercentage,
      agencyVehicleCount,
      workshopVehicleCount,
    })
  )

  const contentSections = [
    {
      title: t('vehicles_comp', { total: compCount }),
      value: totalCompTaxableAmount,
    },
    {
      title: t('vehicles_tpl', { total: tplCount }),
      value: totalTplTaxableAmount,
    },
  ]

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
    <div className='flex flex-col gap-4'>
      <Card className='my-4 rounded-lg border border-dashed border-neutral-5 bg-neutral-1'>
        <div>
          {contentSections.map(({ title, value }, index) => (
            <DeductiblesContent
              key={index}
              title={title}
              value={value}
              color='black'
            />
          ))}
          <div className='my-2 border-b px-4'></div>
          <DeductiblesContent
            title={t('vat', { percentage: vatPercentage * 100 })}
            value={totalVatAmount}
            color='black'
          />
        </div>
      </Card>

      {compCount > 0 && (
        <div className='flex flex-col'>
          <div className='text-sm font-semibold text-neutral-5'>
            {t('repair_type_section.title')}
          </div>
          <div className='flex flex-col gap-2 bg-neutral-1 px-3 py-2 lg:flex-row lg:justify-between lg:gap-6'>
            {RepairTypeDetail}
          </div>
        </div>
      )}
    </div>
  )
}

export default PolicyDetailsTab
