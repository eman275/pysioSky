'use client'
import React from 'react'
import ReactSelect, { ControlProps, components } from 'react-select'

import { cn } from '@/shared/lib/utils'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import { SelectProps, getClassNames, getComponents } from './common'

type Props = SelectProps & {
  onChange?: (selected: string | number) => void
  value?: string | number | null
  controllerStyle?: string
  defaultIndicator?: React.ReactNode
}
const SingleSelect = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: Props, ref: React.Ref<any>) => {
    const locale = useCurrentLocale()
    const tCommon = useScopedI18n('common')

    const {
      value,
      options = [],
      className,
      onChange,
      onClear,
      placeholder,
      isInvalid = false,
      isClearable = false,
      isDisabled,
      isLoading,
      isSearchable,
      startIcon,
      controllerStyle,
      defaultIndicator,
    } = props

    const selectedValue = React.useMemo(
      () => options?.find((item) => String(item.value) === String(value)),
      [value, options]
    )
    const Control = ({ children, ...props }: ControlProps<unknown, false>) => {
      return (
        <components.Control {...props} className={controllerStyle}>
          {startIcon && <span className='cursor-pointer'>{startIcon}</span>}
          {children}
        </components.Control>
      )
    }
    return (
      <div className={cn(className)}>
        <ReactSelect
          options={options}
          key={`react_select_key_${selectedValue?.value}`}
          unstyled
          ref={ref}
          value={selectedValue}
          noOptionsMessage={() => tCommon('words.no_results')}
          placeholder={placeholder || ''}
          onChange={(newValue, meta) => {
            if (meta.action === 'clear') {
              onClear?.()
            } else {
              onChange?.(String(newValue.value))
            }
          }}
          components={{
            ...getComponents(),
            Control,
            DropdownIndicator: defaultIndicator
              ? () => defaultIndicator
              : components.DropdownIndicator,
          }}
          classNames={getClassNames({ isClearable, isInvalid })}
          isMulti={false}
          isRtl={locale === 'ar'}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isLoading={isLoading}
          isSearchable={isSearchable}
          styles={{
            menu: (base, _) => ({
              ...base,
              fontSize: defaultIndicator ? '10px' : base.fontSize,
            }),
          }}
        />
      </div>
    )
  }
)

SingleSelect.displayName = 'SingleSelect'

export default SingleSelect
