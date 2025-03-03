import { useMemo } from 'react'
import { useCurrentLocale } from '../locales/client'

export const useLocalizedName = (
  nameEnglish: string | undefined,
  nameArabic: string | undefined
): string | undefined => {
  const locale = useCurrentLocale()
  const localizedName = useMemo(() => {
    let localized = locale === 'en' ? nameEnglish : nameArabic

    if (!nameEnglish) localized = nameArabic
    if (!nameArabic) localized = nameEnglish
    if (!localized) localized = ''

    return localized
  }, [locale, nameEnglish, nameArabic])

  return localizedName
}
