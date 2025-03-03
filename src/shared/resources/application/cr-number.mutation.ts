import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'

import {
  generateGetCrNumberDataMutationKey,
  generateGetCrNumberDataQueryKey,
} from '@/shared/resources/application/cr-number-details.helpers'
import { QueryFunction, QueryKey, useQueryClient } from '@tanstack/react-query'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generateVehiclesListQueryKey } from '@/features/fleet-details/resources/fleet-details.helpers'

export type EntityAddressDetails = {
  buildingNumber: string
  street: string
  district: string
  city: string
  postCode: string
  additionalNumber: string
}

export type QueryCrNumberResponse = {
  entityReference: string
  isActive: boolean
  crNumber: string
  name: string
  expiryDate: string
  correlationId: string
  entityAddress: EntityAddressDetails | null | undefined
}

type QueryCrNumberPayload = {
  crNumber: string | undefined
}

export const useCrNumberQuery = ({ crNumber }: QueryCrNumberPayload) => {
  const { API } = useClientApi()

  const crNumberRequest: QueryFunction<
    QueryCrNumberResponse,
    QueryKey
  > = async ({ queryKey }) => {
    const crNumber = queryKey[2]
    const response = await API.post<QueryCrNumberResponse>(
      `/api/entities?crNumber=${crNumber}`
    )
    return { ...response.data, crNumber } as QueryCrNumberResponse
  }

  return useAppQuery<QueryCrNumberResponse, QueryCrNumberPayload>({
    queryKey: generateGetCrNumberDataQueryKey(crNumber as string),
    queryFn: crNumberRequest,
  })
}

export const useCrNumberMutation = () => {
  const { API } = useClientApi()
  const queryClient = useQueryClient()

  const crNumberRequest = async (payload: QueryCrNumberPayload) => {
    const response = await API.post<QueryCrNumberResponse>(
      `/api/entities?crNumber=${payload.crNumber}`
    )
    return response.data
  }

  return useAppMutation({
    mutationKey: generateGetCrNumberDataMutationKey(),
    mutationFn: crNumberRequest,
    onSuccess: (data, { crNumber }) => {
      const newData = { ...data, crNumber }
      queryClient.setQueryData(
        generateGetCrNumberDataQueryKey(crNumber as string),
        newData
      )
      queryClient.invalidateQueries({
        queryKey: generateVehiclesListQueryKey(),
      })
    },
  })
}
