'use client'
import React from 'react'

import ReactSelect from 'react-select'

import { cn } from '@/shared/lib/utils'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import { SelectProps, getClassNames, getComponents } from './common'

type Props = SelectProps & {
  onChange?: (selected: string[]) => void
  values?: string[]
}

const MultiSelect = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: Props, ref: React.Ref<any>) => {
    const locale = useCurrentLocale()
    const tCommon = useScopedI18n('common')

    const {
      values,
      options,
      className,
      onChange,
      onClear,
      placeholder,
      isInvalid = false,
      isClearable = false,
      isDisabled,
      isLoading,
      isSearchable,
    } = props

    const selectedOptions = React.useMemo(
      () => options?.filter((item) => values?.includes(item.value)),
      [values, options]
    )

    return (
      <div className={cn(className)}>
        <ReactSelect
          key={`react_select_key_${selectedOptions?.join(',')}`}
          instanceId={React.useId()}
          isMulti={true}
          options={options}
          unstyled
          ref={ref}
          value={selectedOptions}
          noOptionsMessage={() => tCommon('words.no_results')}
          placeholder={placeholder || ''}
          onChange={(newOptions, meta) => {
            if (meta.action === 'clear') {
              onClear?.()
            } else {
              onChange?.(newOptions.map((item) => item.value))
            }
          }}
          components={getComponents<true>()}
          classNames={getClassNames<true>({ isClearable, isInvalid })}
          isRtl={locale === 'ar'}
          isClearable={isClearable}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isSearchable={isSearchable}
        />
      </div>
    )
  }
)

MultiSelect.displayName = 'MultiSelect'

export default MultiSelect
