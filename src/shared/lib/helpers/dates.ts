import {
  eachDayOfInterval,
  endOfMonth,
  formatISO,
  parseISO,
  format,
} from 'date-fns'
import { formatNumberWithZeroPrefix } from '../utils'
interface DateOptions {
  year: number
  month: number
}

export function getDaysOfMonth({ month, year }: DateOptions): number[] {
  const startDate: Date = new Date(year, month - 1, 1)
  const endDate: Date = new Date(
    year,
    month - 1,
    endOfMonth(startDate).getDate()
  )

  const daysOfMonth: Date[] = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  const dayNumbers: number[] = daysOfMonth.map((date) => date.getDate())

  return dayNumbers
}

export function formatDateForApi(date: string) {
  try {
    const [day, month, year] = date.split('/')

    return formatISO(new Date(`${month}/${day}/${year}`))
  } catch (error) {
    console.error(error)
    return ''
  }
}
export function formatDateForClient(date?: string) {
  if (!date) return ''
  try {
    const dateInstance = parseISO(date)
    return format(dateInstance, 'dd/MM/yyyy')
  } catch (error) {
    console.error(error)
    return ''
  }
}

export const constructFormDateFromMonthYear = (
  month?: number,
  year?: number
) => {
  return `${formatNumberWithZeroPrefix(month ?? 0)}/${year}`
}
