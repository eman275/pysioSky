import { QueryCrNumberResponse } from '@/shared/resources/application/cr-number.mutation'

export interface EditCrNumberInfoInterface {
  crNumber: string | undefined
  name: string | undefined
  expireDate: string
}

export interface CollapseInfoProps {
  crNumberInfo: Partial<QueryCrNumberResponse>
  onEditClick: () => void
}

export interface EntityListTypes {
  id: number
  nameEnglish: string
  nameArabic: string
  order: number
}
