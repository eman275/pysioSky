import React from 'react'
import { RadioGroup, RadioGroupItem } from './RadioGroup'
import { Label } from '@/shared/components/ui/label'

interface RadioGroupRowProps {
  defaultValue: string | undefined
  radioGroupValue1: string
  radioGroupTitle1: string
  radioGroupValue2: string
  radioGroupTitle2: string
  field: any
}

const RadioGroupRow: React.FC<RadioGroupRowProps> = ({
  defaultValue,
  radioGroupTitle1,
  radioGroupTitle2,
  radioGroupValue1,
  radioGroupValue2,
  field,
}) => {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      className='flex items-center justify-between'
      {...field}
    >
      <div className='flex items-center space-x-2'>
        <RadioGroupItem
          value={radioGroupValue1}
          id='r1'
          className={
            field.value == radioGroupValue1
              ? ' flex size-3 items-center justify-center border-primary-6 text-primary-6'
              : ''
          }
        />
        <Label htmlFor='r1'>{radioGroupTitle1}</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem
          value={radioGroupValue2}
          id='r2'
          className={
            field.value == radioGroupValue2
              ? ' size-3 border-primary-6 text-primary-6'
              : ''
          }
        />
        <Label htmlFor='r2'>{radioGroupTitle2}</Label>
      </div>
    </RadioGroup>
  )
}

export default RadioGroupRow
