import { useCurrentLocale } from '@/shared/locales/client'
import { LookupModel } from '../../fleet-details.types'
import { createArrayFromRange } from '@/shared/lib/utils'
import { useInputsConfigQuery } from '@/shared/resources/configuration/inputs.query'

export const useGetOptions = (
  list:
    | Omit<LookupModel, 'order'>[]
    | Omit<LookupModel, 'order'>
    | null
    | undefined
) => {
  const currentLocale = useCurrentLocale()
  const normalizedList = Array.isArray(list) ? list : list ? [list] : []

  const options = normalizedList.map(({ id, nameArabic, nameEnglish }) => ({
    id,
    label: currentLocale === 'en' ? nameEnglish ?? nameArabic : nameArabic,
    value: String(id),
  }))

  return options
}

export const useGetName = (item: LookupModel | null | undefined) => {
  const currentLocale = useCurrentLocale()
  const option =
    currentLocale === 'en'
      ? item?.nameEnglish ?? item?.nameArabic
      : item?.nameArabic

  return option
}

export const useGetModelYearOptions = () => {
  const { data: inputs } = useInputsConfigQuery()
  const vehicleManufactureYear = inputs?.vehicleManufactureYear
  const options = createArrayFromRange(
    vehicleManufactureYear?.minimum,
    vehicleManufactureYear?.maximum
  ).reverse()
  return options
}
