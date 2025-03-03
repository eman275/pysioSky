'use client'
import { QueryStatus } from '@tanstack/query-core'
import { useEffect, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

type QueryStateContract = 'error' | 'success' | 'init'

interface FormResetParams<T extends FieldValues> {
  form: UseFormReturn<T>
  queryStatus: QueryStatus
  data: T | undefined
}

export default function useAsyncFormReset<T extends FieldValues>({
  form,
  queryStatus,
  data,
}: FormResetParams<T>) {
  const [oldQueryState, setOldQueryState] = useState<QueryStateContract>('init')

  useEffect(() => {
    if (oldQueryState !== 'success' && queryStatus === 'success') {
      form.reset(data)
      setOldQueryState('success')
    } else if (queryStatus === 'error') {
      setOldQueryState('error')
    }
  }, [form, oldQueryState, data, queryStatus])
}
