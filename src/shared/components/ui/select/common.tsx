'use client'

import ChevronDownIcon from '@/shared/components/icons/chevron-down-icon.svg'
import { cn } from '@/shared/lib/utils'
import { XIcon } from 'lucide-react'
import {
  ClassNamesConfig,
  ClearIndicatorProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  SelectComponentsConfig,
  components,
} from 'react-select'

export type SelectOptionContract = {
  label: string
  value: string
}

export type SelectProps = {
  isInvalid?: boolean
  placeholder?: string
  isClearable?: boolean
  isSearchable?: boolean
  options: SelectOptionContract[]
  className?: string
  isLoading?: boolean
  isDisabled?: boolean
  startIcon?: React.ReactNode
  onClear?: () => void
}

export function getClassNames<T extends boolean = false>(args: {
  isInvalid: boolean
  isClearable: boolean
}): ClassNamesConfig<unknown, T, GroupBase<unknown>> {
  return {
    control: ({ isFocused, isDisabled, isMulti }) =>
      cn(
        controlStyles.base,
        isFocused ? controlStyles.focus : controlStyles.nonFocus,
        isDisabled && controlStyles.disabled,
        isMulti && controlStyles.multi,
        args.isInvalid && controlStyles.invalid
      ),

    placeholder: () => placeholderStyles,
    input: () => selectInputStyles,
    valueContainer: () => valueContainerStyles,
    singleValue: () => singleValueStyles,
    multiValue: () => multiValueStyles,
    multiValueLabel: () => multiValueLabelStyles,
    multiValueRemove: () => multiValueRemoveStyles,
    indicatorsContainer: () => indicatorsContainerStyles,
    clearIndicator: () => clearIndicatorStyles,
    indicatorSeparator: () =>
      cn(
        indicatorSeparatorStyles.base,
        args.isClearable
          ? indicatorSeparatorStyles.clearable
          : indicatorSeparatorStyles.nonClearable
      ),
    dropdownIndicator: ({ isDisabled }) =>
      cn(
        dropdownIndicatorStyles.base,
        isDisabled && dropdownIndicatorStyles.disabled
      ),
    menu: () => menuStyles,
    groupHeading: () => groupHeadingStyles,
    option: ({ isFocused, isSelected }) =>
      cn(
        isFocused && optionStyles.focus,
        isSelected && optionStyles.selected,
        optionStyles.base
      ),
    noOptionsMessage: () => noOptionsMessageStyles,
  }
}

// STYLES
const controlStyles = {
  base: 'bg-base-white rounded-lg border ps-2 pe-2 cursor-pointer !min-h-fit',
  focus: 'ring-1 ring-primary-6',
  nonFocus: 'border-neutral-3',
  disabled: 'bg-neutral-2 text-neutral-4 cursor-not-allowed',
  invalid: 'border-error-6',
  multi: 'py-[0.38rem] h-max',
}
const placeholderStyles = 'text-neutral-5 text-sm capitalize truncate'
const selectInputStyles = 'py-0.5 caret-primary-6'
const valueContainerStyles = 'p-1 h-fit gap-1'
const singleValueStyles = 'h-fit'
const multiValueStyles =
  'bg-neutral-1 rounded items-center ps-2 px-2 gap-1.5 text-sm rounded-2xl'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles = 'text-neutral-5 hover:text-error-4 h-4 w-4'
const indicatorsContainerStyles = ''
const clearIndicatorStyles =
  'bg-neutral-1 p-1 rounded-md hover:bg-error-1 hover:text-error-4'

const indicatorSeparatorStyles = {
  base: 'mx-4 hidden',
  clearable: 'bg-neutral-2',
  nonClearable: 'bg-transparent',
}
const dropdownIndicatorStyles = {
  base: 'p-1 hover:bg-neutral-2 bg-neutral-1 rounded-md hover:text-black',
  disabled: 'bg-transparent',
}

const menuStyles = 'p-1 mt-2 border border-gray-200 bg-white rounded-lg !z-20'
const groupHeadingStyles = 'ms-3 mt-2 mb-1 bg-neutral-1 text-sm'
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-neutral-2 active:bg-gray-200',
  selected: 'bg-primary-1 text-primary-6',
}
const noOptionsMessageStyles =
  'bg-neutral-1 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm'

// COMPONENTS
const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className='h-6 w-6 text-sm text-neutral-5' />
    </components.DropdownIndicator>
  )
}

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <XIcon />
    </components.ClearIndicator>
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <XIcon />
    </components.MultiValueRemove>
  )
}

export function getComponents<T extends boolean = false>(): Partial<
  SelectComponentsConfig<any, T, GroupBase<any>>
> {
  return {
    DropdownIndicator,
    ClearIndicator,
    MultiValueRemove,
  }
}
