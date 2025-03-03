'use client'
import { cn, formatNumberWithZeroPrefix } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import React, { useEffect, useState } from 'react'

type TimeUnits = {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

type TimerProps = {
  deadline: TimeUnits
  title?: React.ReactNode
  onCountdownFinish?: () => void // Event handler for countdown finish
  on5MinutesLeft?: () => void
  descriptionClassName?: string
  containerClassName?: string
  hideLabels?: boolean
  separator?: 'Comma' | 'Colon'
  isTimeout?: boolean
  disableDay?: boolean
  disableHours?: boolean
}

const Timer: React.FC<TimerProps> = ({
  deadline,
  title,
  onCountdownFinish,
  on5MinutesLeft,
  descriptionClassName,
  containerClassName,
  hideLabels,
  separator,
  isTimeout,
  disableDay,
  disableHours,
}) => {
  const tCommon = useScopedI18n('common.units')

  const calculateMillisecondsRemaining = (units: TimeUnits) => {
    let totalMilliseconds = 0
    if (units.days) totalMilliseconds += units.days * 24 * 60 * 60 * 1000
    if (units.hours) totalMilliseconds += units.hours * 60 * 60 * 1000
    if (units.minutes) totalMilliseconds += units.minutes * 60 * 1000
    if (units.seconds) totalMilliseconds += units.seconds * 1000
    return totalMilliseconds
  }

  const [remainingTime, setRemainingTime] = useState(
    calculateMillisecondsRemaining(deadline)
  )

  const [count, setCount] = useState(0)

  const calculateTimeRemaining = (milliseconds: number) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24))
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60)
    const seconds = Math.floor((milliseconds / 1000) % 60)
    return { days, hours, minutes, seconds }
  }

  const { days, hours, minutes, seconds } =
    calculateTimeRemaining(remainingTime)

  const timeUnits = [
    !disableDay && { value: days, label: 'days' },
    !disableHours && { value: hours, label: 'hours' },
    { value: minutes, label: 'minutes' },
    { value: seconds, label: 'seconds' },
  ].filter(Boolean) as { value: number; label: string }[]

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1000) {
          clearInterval(interval)
          if (onCountdownFinish) {
            onCountdownFinish()
          }
          return 0
        }

        // Trigger the on 5 minutes left callback when 5 minutes are left
        if (prev <= 5 * 60 * 1000 && on5MinutesLeft && count === 0) {
          on5MinutesLeft()
          setCount(1)
        }

        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [count, on5MinutesLeft, onCountdownFinish]) // Add on 5 minutes left to the dependency array

  // force timeout from outside
  useEffect(() => {
    if (isTimeout) {
      setRemainingTime(0)
    }
  }, [isTimeout])

  return (
    <div
      className={cn(
        'ms-auto flex w-full items-center justify-center gap-0 rounded-lg px-4 py-2 md:w-fit md:gap-1 lg:w-fit',
        containerClassName
      )}
      data-testid='timeout-container'
      role='timer'
    >
      <div className='flex items-center justify-center'>
        {title && (
          <div className='mr-6 text-xs font-bold md:text-sm'>{title}</div>
        )}
        {remainingTime > 0 && (
          <div
            className={cn(
              'flex gap-1 text-xs font-bold md:text-sm',
              descriptionClassName
            )}
            data-testid='timeout'
          >
            {timeUnits.map(({ value, label }, index) => (
              <div key={index}>
                <span key={index} data-testid={`timeout-${label}`}>
                  {formatNumberWithZeroPrefix(value!)}{' '}
                  {!hideLabels && tCommon(label as keyof typeof tCommon)}
                  {index < timeUnits.length - 1 && separator === 'Comma' && ','}
                </span>
                {index < timeUnits.length - 1 && separator === 'Colon' && ':'}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(Timer)
