import { ColumnDef } from '@tanstack/react-table'
import { useScopedI18n } from '../locales/client'

export type PolicyDetails = {
  id: string
  vehicles: string
  repairType: string
  deductibleAmount: string
}

const usePolicyDetailsTableColumns = (): ColumnDef<PolicyDetails>[] => {
  const t = useScopedI18n('application.quotations')
  const columns: ColumnDef<PolicyDetails>[] = [
    {
      accessorKey: 'vehicles',
      header: t('quotation_summary.comp_vehicles', { total: 18 }),
    },
    {
      accessorKey: 'repairType',
      header: t('quotation_summary.repair_type'),
    },
    {
      accessorKey: 'deductibleAmount',
      header: t('quotation_summary.deductible_amount'),
    },
  ]

  return columns
}

export default usePolicyDetailsTableColumns
