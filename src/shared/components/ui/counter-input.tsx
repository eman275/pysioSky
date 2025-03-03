'use client'

import { cn } from '@/shared/lib/utils'
import { MinusIcon, PlusIcon } from 'lucide-react'
import React, { ChangeEventHandler, useCallback, useMemo } from 'react'
import { ButtonIcon } from './button'
import { Card } from './card'

type Props = {
  label?: string
  min?: number
  max?: number
  value?: number | string
  onValueChange(value: number): void
  className?: string
  inputRef?: React.Ref<HTMLInputElement>
  isInvalid?: boolean
  isDisabled?: boolean
}

const CounterInput = ({
  onValueChange,
  max,
  min,
  value: v = 0,
  label,
  inputRef,
  isInvalid,
  isDisabled,
}: Props) => {
  const value = Number(v)
  const isMax = useMemo(
    () => Boolean(typeof max === 'number' && value + 1 > max),
    [max, value]
  )

  const isMin = useMemo(
    () => Boolean(typeof min === 'number' && value - 1 < min),
    [min, value]
  )

  const handleIncrement = useCallback(() => {
    if (isMax) return
    onValueChange(value + 1)
  }, [isMax, onValueChange, value])

  const handleDecrement = useCallback(() => {
    if (isMin) return
    onValueChange(value - 1)
  }, [isMin, onValueChange, value])

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value

      if (isNaN(+value)) return
      if (typeof max === 'number' && +value > max) return

      onValueChange(+e.target.value)
    },
    [max, onValueChange]
  )

  return (
    <div className='flex flex-col'>
      {label && <p className='mb-2 text-sm font-bold'>{label}</p>}
      <Card
        as='button'
        type='button'
        className={cn(
          'flex h-[50px] w-full items-center justify-between focus-within:border-primary-6 focus-visible:outline-none',
          {
            'border-error-4 focus-within:border-error-4': isInvalid,
            'border-neutral-2 focus-within:border-neutral-2': isDisabled,
          }
        )}
      >
        <ButtonIcon
          disabled={isMin || isDisabled}
          type='button'
          variant='text'
          size='XXS'
          colorScheme='neutral'
          onClick={handleDecrement}
        >
          <MinusIcon />
        </ButtonIcon>

        <input
          disabled={isDisabled}
          ref={inputRef}
          className='w-full p-1 text-center caret-primary-6 outline-none disabled:bg-transparent disabled:text-neutral-4'
          value={value}
          onChange={handleOnChange}
        />

        <ButtonIcon
          disabled={isMax || isDisabled}
          type='button'
          variant='text'
          size='XXS'
          colorScheme='neutral'
          onClick={handleIncrement}
        >
          <PlusIcon />
        </ButtonIcon>
      </Card>
    </div>
  )
}

export default React.memo(CounterInput)
