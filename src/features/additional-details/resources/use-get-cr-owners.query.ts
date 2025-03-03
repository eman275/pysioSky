import useAppParam from '@/shared/hooks/use-app-params'
import useClientApi from '@/shared/hooks/use-client-api'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generateGetCrOwnersQueryKey } from './additional-details.helpers'
import { CrOwnerContract } from './additional-details.types'

export type GetCrOwnersResponseContract = {
  crOwners?: CrOwnerContract[]
  vatNumber: string
  correlationId: string
}

export const useGetCrOwnersQuery = () => {
  const { entityReference: entityId, correlationId } = useAppParam()
  const { API } = useClientApi()

  const params = generateQueryString([
    { key: 'EntityReference', value: entityId },
    { key: 'CorrelationId', value: correlationId },
  ])
  const getCrOwnersRequest = async () => {
    const response = await API.get<GetCrOwnersResponseContract>(
      `/api/entities/cr-owners${params}`
    )
    return response.data
  }

  return useAppQuery({
    queryKey: generateGetCrOwnersQueryKey(entityId, correlationId),
    queryFn: getCrOwnersRequest,
    retry: 3,
  })
}
