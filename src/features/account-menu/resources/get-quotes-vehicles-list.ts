import useClientApi from '@/shared/hooks/use-client-api'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generateVehicleListQueryKey } from './user-account.helpers'
import { QuoteDetails } from './types'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export type VehiclesListResponse = {
  quoteDetails: QuoteDetails
  correlationId: string
}

type QueryVehiclesListPayload = {
  quoteRequestReference: string
  correlationId: string | undefined
}

export const useGetQuotesVehiclesListQuery = (
  payload?: QueryVehiclesListPayload
) => {
  const { API } = useClientApi()
  const queryClient = useQueryClient()
  const params = generateQueryString([
    { key: 'QuoteRequestReference', value: payload?.quoteRequestReference },
    { key: 'CorrelationId', value: payload?.correlationId },
  ])

  const getVehicleListRequest = async () => {
    const response = await API.get<VehiclesListResponse>(
      `/api/dashboard/quote-details/${params}`
    )
    return response.data
  }

  const query = useAppQuery({
    queryKey: generateVehicleListQueryKey(payload?.quoteRequestReference),
    queryFn: getVehicleListRequest,
  })

  const { isSuccess, data } = query

  useEffect(() => {
    if (data && isSuccess) {
      const interval = setInterval(() => {
        const currentData = queryClient.getQueryData<VehiclesListResponse>(
          generateVehicleListQueryKey(payload?.quoteRequestReference)
        )

        if (currentData && currentData.quoteDetails.expiresInSeconds > 0) {
          const updatedQuoteDetails = {
            ...currentData.quoteDetails,
            expiresInSeconds: currentData.quoteDetails.expiresInSeconds - 1,
          }

          queryClient.setQueryData(
            generateVehicleListQueryKey(payload?.quoteRequestReference),
            { ...currentData, quoteDetails: updatedQuoteDetails }
          )
        } else if (currentData?.quoteDetails.expiresInSeconds === 0) {
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [queryClient, payload?.quoteRequestReference, data, isSuccess])

  return query
}
