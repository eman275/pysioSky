import { useScopedI18n } from '@/shared/locales/client'
import { formatThousandsSeparators } from '@/shared/lib/utils'
import useSingleQuoteStore from '../hooks/use-single-quote-store'
import { REPAIR_METHOD_TYPE_ENUM } from '../../resources/quotation.types'

type Props = {
  reference: string
  vehicleRepairType?: number
  totalDeductibleAmount?: number
}

const RepairTypeContent = ({
  reference,
  vehicleRepairType,
  totalDeductibleAmount,
}: Props) => {
  const tQuotation = useScopedI18n('application.quotations')
  const tUnit = useScopedI18n('common.units')
  const deductibles = useSingleQuoteStore((state) => state.deductibles)
  const deductibleData = deductibles[reference]

  const vehicleType =
    vehicleRepairType == REPAIR_METHOD_TYPE_ENUM.WORKSHOP
      ? tQuotation('quotation_summary.workshop')
      : tQuotation('quotation_summary.agency')

  // Determine the repair type and the corresponding deductible amount
  const selectedWorkshopOption = deductibleData?.workshopOptions.find(
    (option) => option.isSelected
  )
  const selectedAgencyOption = deductibleData?.agencyOptions.find(
    (option) => option.isSelected
  )

  const repairType = selectedWorkshopOption
    ? tQuotation('quotation_summary.workshop')
    : selectedAgencyOption
      ? tQuotation('quotation_summary.agency')
      : ''

  const deductibleAmount = selectedWorkshopOption
    ? selectedWorkshopOption.totalAmount
    : selectedAgencyOption
      ? selectedAgencyOption.totalAmount
      : 0

  return (
    <div className='flex h-full w-full flex-row items-end justify-between gap-3 bg-neutral-1 p-3 lg:flex-col lg:px-6'>
      <p className='whitespace-nowrap text-sm font-normal'>
        {tQuotation('quotation_summary.repair_type')}
        <span className='pl-1 font-bold'>
          {repairType ? repairType : vehicleType}
        </span>
      </p>
      <p className='text-xs text-neutral-5'>
        {tQuotation('quotation_summary.deductible')}
        <span className='pl-1 font-bold'>
          {tUnit('SAR')}
          {formatThousandsSeparators(
            deductibleAmount ? deductibleAmount : totalDeductibleAmount,
            true
          )}
        </span>
      </p>
    </div>
  )
}

export default RepairTypeContent
