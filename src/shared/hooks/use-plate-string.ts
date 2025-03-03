import { useMemo } from 'react'
import { useLocalizedName } from './use-localized-name'
import { PlateDetailsContract } from '@/features/fleet-details/fleet-details.types'
import { useCurrentLocale } from '../locales/client'

export const useGeneratePlateString = (
  plateDetails: PlateDetailsContract | null
): string => {
  const locale = useCurrentLocale()
  const firstPlateLetter = useLocalizedName(
    plateDetails?.firstPlateLetter?.nameEnglish,
    plateDetails?.firstPlateLetter?.nameArabic
  )

  const secondPlateLetter = useLocalizedName(
    plateDetails?.secondPlateLetter?.nameEnglish,
    plateDetails?.secondPlateLetter?.nameArabic
  )

  const thirdPlateLetter = useLocalizedName(
    plateDetails?.thirdPlateLetter?.nameEnglish,
    plateDetails?.thirdPlateLetter?.nameArabic
  )

  return useMemo(() => {
    if (locale == 'ar')
      return `${firstPlateLetter} ${secondPlateLetter} ${thirdPlateLetter}`
    else return `${firstPlateLetter}${secondPlateLetter}${thirdPlateLetter}`
  }, [firstPlateLetter, secondPlateLetter, thirdPlateLetter, locale])
}
