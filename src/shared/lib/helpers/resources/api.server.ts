import 'server-only'

import { auth } from '@/auth'
import { loadAppConfig } from '@/shared/lib/config/load-config'
import { getCurrentLocale } from '@/shared/locales/server'
import { signOut } from 'next-auth/react'
import { QueryParam, generateQueryString } from '../generate-query-string'
import isFormData from '../validators/is-form-data'

const config = loadAppConfig()

type PayloadContract = Record<string, unknown>

class FetchService {
  private baseUrl: string
  private requestInterceptors: ((request: Request) => Request)[]
  private responseInterceptors: ((response: Response) => Response)[]

  constructor(baseUrl: string = config.API_BASE_URL) {
    this.baseUrl = baseUrl
    this.requestInterceptors = []
    this.responseInterceptors = []
  }

  useRequestInterceptor(interceptor: (request: Request) => Request) {
    this.requestInterceptors.push(interceptor)
  }

  useResponseInterceptor(interceptor: (response: Response) => Response) {
    this.responseInterceptors.push(interceptor)
  }

  private applyRequestInterceptors(request: Request): Request {
    return this.requestInterceptors.reduce(
      (modifiedRequest, interceptor) => interceptor(modifiedRequest),
      request
    )
  }

  private applyResponseInterceptors(response: Response): Response {
    return this.responseInterceptors.reduce(
      (modifiedResponse, interceptor) => interceptor(modifiedResponse),
      response
    )
  }

  private async makeRequest<TData = unknown>({
    method,
    endpoint,
    payload,
    queries,
    additionalOptions,
    next,
    cache,
  }: {
    method: string
    endpoint: string
    payload?: PayloadContract
    queries?: QueryParam[]
    additionalOptions?: RequestInit
    next?: NextFetchRequestConfig
    cache?: RequestCache
  }): Promise<TData> {
    const queryParams = generateQueryString(queries)
    const { headers, ...restOfOptions } = additionalOptions ?? {}

    const sanitizedEndpointString = endpoint.startsWith('/')
      ? endpoint.slice(1)
      : endpoint

    const url = this.baseUrl + sanitizedEndpointString + queryParams

    const currentLocale = await getCurrentLocale()
    const session = await auth()
    const accessToken = session?.user?.access_token
    const data = payload as unknown as BodyInit
    const requestOptions: RequestInit = {
      method,
      body: isFormData(data) ? data : JSON.stringify(data),
      headers: {
        ...headers,
        ...(!isFormData(data) && { 'Content-Type': 'application/json' }),
        'Accept-Language': currentLocale,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      ...restOfOptions,
    }

    const request = new Request(url, requestOptions)
    const modifiedRequest = this.applyRequestInterceptors(request)

    const response = await fetch(modifiedRequest, { next, cache })
    const modifiedResponse = this.applyResponseInterceptors(response)

    // logout user if response status is 401
    if (response.status === 401) {
      signOut()
    }

    if (!response.ok) {
      return modifiedResponse.json().then((errorData) => {
        if (process.env.NODE_ENV === 'development') {
          console.info('error', errorData)
        }

        throw {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        }
      })
    }

    const responseData = await modifiedResponse.json()
    if (process.env.NODE_ENV === 'development') {
      console.info('success', responseData)
    }
    return responseData as TData
  }

  async get<TData = unknown>({
    endpoint,
    queries,
    options,
    next,
    cache,
  }: {
    endpoint: string
    queries?: QueryParam[]
    options?: RequestInit
    next?: NextFetchRequestConfig
    cache?: RequestCache
  }): Promise<TData> {
    return this.makeRequest<TData>({
      method: 'GET',
      endpoint,
      queries,
      additionalOptions: options,
      next,
      cache,
    })
  }

  async post<TData = unknown>({
    endpoint,
    payload,
    queries,
    options,
  }: {
    endpoint: string
    payload?: PayloadContract
    queries?: QueryParam[]
    options?: RequestInit
  }): Promise<TData> {
    return this.makeRequest<TData>({
      method: 'POST',
      endpoint,
      payload,
      queries,
      additionalOptions: options,
    })
  }

  async put<TData = unknown>({
    endpoint,
    payload,
    queries,
    options,
  }: {
    endpoint: string
    payload?: PayloadContract
    queries?: QueryParam[]
    options?: RequestInit
  }): Promise<TData> {
    return this.makeRequest<TData>({
      method: 'PUT',
      endpoint,
      payload,
      queries,
      additionalOptions: options,
    })
  }

  async update<TData = unknown>({
    endpoint,
    payload,
    queries,
    options,
  }: {
    endpoint: string
    payload: PayloadContract
    queries?: QueryParam[]
    options?: RequestInit
  }): Promise<TData> {
    return this.makeRequest<TData>({
      method: 'PATCH',
      endpoint,
      payload,
      queries,
      additionalOptions: options,
    })
  }

  async delete<TData = unknown>({
    endpoint,
    queries,
    options,
  }: {
    endpoint: string
    queries?: QueryParam[]
    options?: RequestInit
  }): Promise<TData> {
    return await this.makeRequest<TData>({
      method: 'DELETE',
      endpoint,
      queries,
      additionalOptions: options,
    })
  }
}

export const apiService = new FetchService()
