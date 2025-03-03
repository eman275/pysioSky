import { FetchError } from '@/shared/types/api.types'
import {
  QueryKey,
  UndefinedInitialDataOptions,
  queryOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

export default function generateQueryOptions<
  TQueryFnData = unknown,
  TError = AxiosError<FetchError>,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
) {
  return queryOptions<TQueryFnData, TError, TData, TQueryKey>(options)
}
