import useClientApi from '@/shared/hooks/use-client-api'
import { loadAppConfig } from '@/shared/lib/config/load-config'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { useRef, useState } from 'react'
import {
  GetQuotesStreamPayload,
  GetQuotesStreamResponse,
  QuotesStreamData,
} from '../../resources/quotation.types'
import { generateQuotesStreamQueryKey } from './quotations.helpers'
import { wait } from '@/shared/lib/utils'

const EventSourceConstructor = NativeEventSource || EventSourcePolyfill
global.EventSource = EventSourceConstructor as typeof EventSource

const headers = {
  Accept: 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
}

const MAX_SSE_RETRIES = 3
const HEART_BEAT_TIMEOUT = 120000
const WAITING_TIME_BETWEEN_POLLS = 3000
const STREAM_ERROR_RETRY_DELAY = 2000

const normalizeData = (data: QuotesStreamData[]) => {
  return data.reduce(
    (acc, item) => {
      acc[item.reference] = item
      return acc
    },
    {} as Record<string, QuotesStreamData>
  )
}

const useGetQuotesStreamQuery = ({
  quoteRequestReference,
  canStream = false,
  canStreamForSeconds = 0,
}: GetQuotesStreamPayload) => {
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)
  const { API } = useClientApi()
  const config = loadAppConfig()
  const sseConnectedRef = useRef(false)
  const queryClient = useQueryClient()

  const streamParams = generateQueryString([
    { key: 'quoteRequestReference', value: quoteRequestReference },
    { key: 'canStreamForSeconds', value: canStreamForSeconds },
  ])

  const handleStreamMessage = (data: QuotesStreamData[]) => {
    queryClient.setQueryData(
      generateQuotesStreamQueryKey(quoteRequestReference),
      (
        oldData: GetQuotesStreamResponse = { data: {}, isStreamComplete: false }
      ) => ({
        data: {
          ...oldData.data,
          ...normalizeData(data),
        },
      })
    )
  }

  const fetchSSE = async (): Promise<GetQuotesStreamResponse> => {
    return new Promise((resolve, reject) => {
      let retryCount = 1
      setIsPending(true)
      const trySSE = () => {
        // need to switch to each url based on env
        const url = `${config.API_BASE_URL}api/quotes/stream${streamParams}`
        const eventSource = new EventSourceConstructor(url, {
          headers,
          heartbeatTimeout: HEART_BEAT_TIMEOUT,
        } as EventSourceInit)

        eventSource.onopen = () => {
          console.log('SSE connection opened')
          sseConnectedRef.current = true
        }

        eventSource.onmessage = (event) => {
          console.log('SSE received a message')
          if (event.data === 'closed') {
            eventSource.close()
            console.log('SSE received end')
            handleStreamMessage([])
            return setIsPending(false)
          }
          const data = JSON.parse(event.data)
          handleStreamMessage(data)
          resolve(data)
        }

        eventSource.onerror = () => {
          eventSource.close()
          if (retryCount < MAX_SSE_RETRIES && !sseConnectedRef.current) {
            console.log('SSE failed, retrying SSE connection')
            setTimeout(() => {
              retryCount++
              trySSE()
            }, STREAM_ERROR_RETRY_DELAY)
          } else if (!sseConnectedRef.current) {
            console.log('SSE failed, switching to polling')
            fetchPolling()
            reject(new Error('SSE connection failed'))
          }
        }

        return () => eventSource.close()
      }

      trySSE()
    })
  }

  const fetchPolling = async (): Promise<void> => {
    const startTime = Date.now()

    const poll = async (): Promise<void> => {
      try {
        const pollingParams = generateQueryString([
          { key: 'quoteRequestReference', value: quoteRequestReference },
        ])
        const passedTime = (Date.now() - startTime) / 1000
        const newRemainingTimeInSeconds = canStreamForSeconds - passedTime

        // Break out of recursion condition
        if (newRemainingTimeInSeconds <= 0) {
          handleStreamMessage([])
          setIsPending(false)
          return
        }

        const response = await API.get<QuotesStreamData[]>(
          `/api/quotes/poll${pollingParams}`
        )

        if (response.status === 204) {
          // delay before next poll
          await wait(WAITING_TIME_BETWEEN_POLLS)
          return poll()
        }

        handleStreamMessage(response.data)
        // delay before next poll
        await wait(WAITING_TIME_BETWEEN_POLLS)
        return poll()
      } catch (error) {
        const e = error as AxiosError
        if (e.response?.status === 502) {
          // delay before retrying
          await wait(WAITING_TIME_BETWEEN_POLLS)
          return poll()
        }

        setIsError(true)
        setIsPending(false)
        console.log('Polling request failed', error)
        return
      }
    }

    return poll()
  }

  const query = useAppQuery({
    queryKey: generateQuotesStreamQueryKey(quoteRequestReference),
    queryFn: fetchSSE,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: canStream,
  })

  return {
    ...query,
    isPending,
    isError,
  }
}

export default useGetQuotesStreamQuery
