import { FetchError } from '@/shared/types/api.types'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import useHandleAppError from './use-handle-app-error'

export default function useAppMutation<
  TData = unknown,
  TVariables = unknown,
  TContext = unknown,
>(
  options: UseMutationOptions<
    TData,
    AxiosError<FetchError>,
    TVariables,
    TContext
  >
) {
  const { handleAppError } = useHandleAppError()
  return useMutation<TData, AxiosError<FetchError>, TVariables, TContext>({
    ...options,
    onError(error, ...args) {
      if (error.response?.data) {
        const code = error.response.data.errorCode

        handleAppError(code)

        options.onError?.(error, ...args)
      }
    },
  })
}
