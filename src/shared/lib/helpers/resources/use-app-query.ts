'use client'
import { useScopedI18n } from '@/shared/locales/client'
import { FetchError } from '@/shared/types/api.types'
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { env } from 'next-runtime-env'
import React from 'react'
import { toast } from 'sonner'
import useHandleAppError from './use-handle-app-error'
import { useSession } from 'next-auth/react'

export default function useAppQuery<
  TQueryFnData = unknown,
  _ = never,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<
    TQueryFnData,
    AxiosError<FetchError>,
    TData,
    TQueryKey
  >
) {
  const t = useScopedI18n('common.error')
  const { handleAppError } = useHandleAppError()
  const session = useSession()
  const query = useQuery({
    ...options,
    enabled: Boolean(
      options.enabled &&
        session.status === 'authenticated' &&
        session.data?.user?.access_token
    ),
  })

  // handle error generically
  React.useEffect(() => {
    const { data: error, status, request } = query.error?.response ?? {}
    // show that server request failed in dev mode
    // for QC debug purpose
    if (
      status === 500 &&
      !['production', 'uat'].includes(env('NEXT_PUBLIC_APP_ENV') || '')
    ) {
      return void toast.error('Server request failed', {
        description: `Please check the following server request url ${request?.responseURL}`,
      })
    }

    // handle error generically

    if (query.isError && error) {
      handleAppError(error.errorCode)
    }
  }, [handleAppError, query.error, query.isError, t])

  return query
}
