'use client'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import axios, { AxiosError, type AxiosInstance } from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { loadAppConfig } from '@/shared/lib/config/load-config'
import { TOAST_MESSAGE_ERROR_CODES } from '../lib/constants'

const config = loadAppConfig()
const baseURL = config.API_BASE_URL
export type ErrorsList = {
  errors: string[]
}

let networkErrorDisplayed = false

function useClientApi() {
  const locale = useCurrentLocale()
  const tError = useScopedI18n('common.error')
  const session = useSession()
  const accessToken = session?.data?.user.access_token
  const API: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  })

  API.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      networkErrorDisplayed = false
      return response
    },
    function (error: AxiosError) {
      if (error.response?.status === 401) {
        toast.error(tError('unauthorized'))
        signOut()
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response?.status === 500) {
        toast.error(tError('title'))
      }
      if (
        !networkErrorDisplayed &&
        error.code === TOAST_MESSAGE_ERROR_CODES.NETWORK_ERROR
      ) {
        toast.error(tError('toast_errors.ERR_NETWORK.title'))
        networkErrorDisplayed = true
      }
      return Promise.reject(error)
    }
  )
  return { API }
}

export default useClientApi
