/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { decodeHashedObject, hashObject } from '@/shared/lib/utils'
import { SearchParamKeys as SearchParamKey } from '@/shared/types/routing.types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type QuerySearchParam = {
  key: SearchParamKey
  value: string | Record<string, unknown>
  isHashed?: boolean
}

function useClientQueryString() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const append = React.useCallback(
    (queriesList: QuerySearchParam[], newPathname?: string) => {
      const params = new URLSearchParams(
        Array.from(searchParams?.entries() ?? [])
      )
      queriesList.forEach(
        ({ key, value }) =>
          typeof value === 'string' && params.append(key, value)
      )
      const searchString = params.size > 0 ? `?${params.toString()}` : ''
      router.push(`${newPathname ? newPathname : pathname}${searchString}`, {
        scroll: false,
      })
    },

    [router, searchParams]
  )

  const set = React.useCallback(
    (queriesList: QuerySearchParam[], newPathname?: string) => {
      const params = new URLSearchParams(
        Array.from(searchParams?.entries() ?? [])
      )
      queriesList.forEach(({ key, value, isHashed }) => {
        if (typeof value === 'string' && !isHashed)
          return params.set(key, value)

        if (typeof value === 'object' && isHashed)
          return params.set(key, hashObject(value) ?? '')
      })
      const searchString = params.size > 0 ? `?${params.toString()}` : ''
      router.push(`${newPathname ? newPathname : pathname}${searchString}`, {
        scroll: false,
      })
    },
    [router, searchParams]
  )

  const setHashed = React.useCallback(
    (
      key: SearchParamKey,
      value: Record<string, unknown>,
      newPathname?: string
    ) => {
      const params = new URLSearchParams(
        Array.from(searchParams?.entries() ?? [])
      )
      const hashedValue = hashObject(value) ?? ''
      params.set(key, hashedValue)
      const searchString = params.size > 0 ? `?${params.toString()}` : ''
      router.push(`${newPathname ? newPathname : pathname}${searchString}`, {
        scroll: false,
      })
    },
    [router, searchParams]
  )

  const removeOneByKey = React.useCallback(
    (key: string, newPathname?: string) => {
      const params = new URLSearchParams(
        Array.from(searchParams?.entries() ?? [])
      )
      params.delete(key)
      const searchString = params.size > 0 ? `?${params.toString()}` : ''
      router.push(`${newPathname ? newPathname : pathname}${searchString}`, {
        scroll: false,
      })
    },
    [router, searchParams]
  )

  const removeMultiple = React.useCallback(
    (keys: SearchParamKey[], newPathname?: string) => {
      const params = new URLSearchParams(
        Array.from(searchParams?.entries() ?? [])
      )
      keys.forEach((key) => {
        params.delete(key)
      })

      const searchString = params.size > 0 ? `?${params.toString()}` : ''
      router.push(`${newPathname ? newPathname : pathname}${searchString}`, {
        scroll: false,
      })
    },
    [router, searchParams]
  )

  const getByKey = React.useCallback(
    <T = Record<string, unknown>>(
      key: SearchParamKey,
      options?: { hashed?: boolean }
    ) => {
      const { hashed } = options ?? {}

      const params = new URLSearchParams(
        Array.from(searchParams?.entries() ?? [])
      )
      const value = params.get(key) ?? ''
      return hashed ? decodeHashedObject<T>(value) : params.get(key)
    },
    [searchParams]
  )

  return {
    removeOneByKey,
    append,
    getByKey,
    set,
    setHashed,
    removeMultiple,
  }
}

export default useClientQueryString
