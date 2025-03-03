import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { SelectOptionContract } from '../components/ui/select/common'
import { PlateDetailsContract } from '@/features/fleet-details/fleet-details.types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatThousandsSeparators = (
  amount?: number,
  isApproximated?: boolean
) => {
  const approximatedFlag =
    typeof isApproximated === 'boolean' ? isApproximated : true

  const approximatedAmount = approximatedFlag ? amount?.toFixed(2) : amount
  return (
    approximatedAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '-'
  )
}

export const formatNumberWithZeroPrefix = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`
}

export const formatNationalId = (nationalId: number | string) => {
  const input = String(nationalId)
  if (input.length !== 10) {
    // Ensure the input has the expected length
    console.error('invalid national id provided')
    return input
  }

  const formattedString = `${input.slice(0, 2)}-${input.slice(
    2,
    6
  )}-${input.slice(6)}`

  return formattedString
}
function utf8ToBase64(str: string) {
  return btoa(encodeURIComponent(str))
}

export const hashObject = (obj: Record<string, unknown>) => {
  try {
    const stringified = JSON.stringify(obj)
    const hashed = utf8ToBase64(stringified)
    return hashed
  } catch (error) {
    console.error((error as Error).message)
  }
}

function base64ToUtf8(base64String: string) {
  const binaryString = atob(base64String)
  const decodedString = decodeURIComponent(binaryString)
  return decodedString
}

export const decodeHashedObject = <T = Record<string, unknown>>(
  hash: string
) => {
  try {
    const decoded = base64ToUtf8(hash)
    const obj = JSON.parse(decoded)
    return obj as T
  } catch (error) {
    console.error((error as Error).message)
  }
}

/* convert to milliseconds function */
const conversionFactors = {
  seconds: 1000, // 1 second = 1000 milliseconds
  minutes: 1000 * 60, // 1 minute = 60 seconds = 60000 milliseconds
  hours: 1000 * 60 * 60, // 1 hour = 60 minutes = 3600 seconds = 3600000 milliseconds
} as const

export function convertToMilliseconds(
  unitNumber: number,
  unitType: keyof typeof conversionFactors
): number {
  if (!(unitType in conversionFactors)) {
    console.error('Invalid unit type. Please provide S, M, or H.')
  }

  return unitNumber * conversionFactors[unitType]
}

export const testDecimalPoints = (value: string, maxDecimalPlaces: number) => {
  const regex = new RegExp(`^-?\\d+(\\.\\d{0,${maxDecimalPlaces}})?$`)
  return regex.test(value)
}

export function nullify<T extends string | number>(value: T): T | null {
  if (value === '' || value === undefined || Number.isNaN(value)) {
    return null
  }
  return (typeof value === 'string' ? String(value) : Number(value)) as T
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const dateFormatsMap = {
  forApi: 'yyyy-MM-dd',
  forClient: 'dd/MM/yyyy',
}
export function formatDate(
  dateInput: Date | string | undefined,
  dateFormat: keyof typeof dateFormatsMap
) {
  if (!dateInput) return ''

  const date = new Date(dateInput)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date input')
  }

  const formatString = dateFormatsMap[dateFormat]

  return format(date, formatString)
}

export const createArrayFromRange = (
  min?: number,
  max?: number
): SelectOptionContract[] => {
  if (!max || !min) return []

  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value')
  }

  const result: SelectOptionContract[] = []
  for (let year = min; year <= max; year++) {
    result.push({
      label: year.toString(),
      value: year.toString(),
    })
  }

  return result
}

export const generatePlateString = (
  plateDetails: PlateDetailsContract | null,
  currentLocale: string
) => {
  const firstPlateLetter =
    currentLocale == 'en'
      ? plateDetails?.firstPlateLetter?.nameEnglish
      : plateDetails?.firstPlateLetter?.nameArabic
  const secondPlateLetter =
    currentLocale == 'en'
      ? plateDetails?.secondPlateLetter?.nameEnglish
      : plateDetails?.secondPlateLetter?.nameArabic
  const thirdPlateLetter =
    currentLocale == 'en'
      ? plateDetails?.thirdPlateLetter?.nameEnglish
      : plateDetails?.thirdPlateLetter?.nameArabic

  return `${firstPlateLetter}${secondPlateLetter}${thirdPlateLetter}`
}

export const generatePages = (
  itemCount: number | undefined,
  pageSize: number | undefined
) => {
  if (!itemCount || !pageSize) {
    return []
  }

  const pageCount = Math.ceil(itemCount / pageSize)
  return Array.from({ length: pageCount }, (_, i) => i + 1)
}

export const includesAny = (arr: string[], values: string[]) =>
  values.some((v) => arr.includes(v))
