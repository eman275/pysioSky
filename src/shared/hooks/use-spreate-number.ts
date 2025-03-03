import { useMemo } from 'react'
import { useCurrentLocale } from '../locales/client'

export const useFormattedNumber = (
  number: string | number
): { formattedNumber: string; formattedCurrencyNumber: string } => {
  const currentLocale = useCurrentLocale()
  const formattedNumber = useMemo(() => {
    const numStr = number.toString()
    const part1 = numStr.substring(0, 2)
    const part2 = numStr.substring(2, 6)
    const part3 = numStr.substring(6)

    if (currentLocale === 'ar') {
      const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
      const arabicPart1 = part1
        .split('')
        .map((digit) => arabicNumbers[Number(digit)])
        .join('')
      const arabicPart2 = part2
        .split('')
        .map((digit) => arabicNumbers[Number(digit)])
        .join('')
      const arabicPart3 = part3
        .split('')
        .map((digit) => arabicNumbers[Number(digit)])
        .join('')
      return `${arabicPart1}-${arabicPart2}-${arabicPart3}`
    } else {
      return `${part1}-${part2}-${part3}`
    }
  }, [number, currentLocale])

  const formattedCurrencyNumber = useMemo(() => {
    const num = typeof number === 'string' ? parseFloat(number) : number
    const formatter = new Intl.NumberFormat(
      currentLocale === 'ar' ? 'ar-EG' : 'en-US'
    )
    return formatter.format(num)
  }, [number, currentLocale])

  return { formattedNumber, formattedCurrencyNumber }
}
