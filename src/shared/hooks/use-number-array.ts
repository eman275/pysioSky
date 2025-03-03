import { useMemo } from 'react'
import { useCurrentLocale } from '../locales/client'

export function useNumberArray(n: number) {
  const locale = useCurrentLocale()
  // const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

  const result = useMemo(() => {
    const numbers: string[] = []

    for (let i = 1; i <= n; i++) {
      if (locale === 'ar') {
        numbers.push(
          String(i)
            .split('')
            .map((digit) => numbers[Number(digit)])
            .join('')
        )
      } else {
        numbers.push(String(i))
      }
    }

    return numbers
  }, [locale, n])

  return result
}
