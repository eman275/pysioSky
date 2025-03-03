import useClientApi from '@/shared/hooks/use-client-api'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import {
  generateVehicleBodyTypeQueryKey,
  generateVehicleMakeQueryKey,
  generateVehicleModelQueryKey,
} from './fleet-details.helpers'
import { LookupModel } from '../fleet-details.types'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'

export type ModelLookupPayload = {
  makeId: number | null | undefined
}

export const useVehicleMakeLookUpQuery = () => {
  const { API } = useClientApi()

  const vehicleMakeRequest = async () => {
    const response = await API.get<LookupModel[]>(`/api/lookups/vehicle-make`)
    return response.data
  }

  return useAppQuery({
    queryKey: generateVehicleMakeQueryKey(),
    queryFn: vehicleMakeRequest,
  })
}

export const useVehicleModelLookUpQuery = ({ makeId }: ModelLookupPayload) => {
  const { API } = useClientApi()

  const params = generateQueryString([{ key: 'makeId', value: makeId }])

  const vehicleModelRequest = async () => {
    const response = await API.get<LookupModel[]>(
      `/api/lookups/vehicle-model${params}`
    )
    return response.data
  }

  return useAppQuery({
    queryKey: generateVehicleModelQueryKey(String(makeId)),
    queryFn: vehicleModelRequest,
    enabled: !!makeId,
  })
}

export const useVehicleBodyTypeLookUpQuery = () => {
  const { API } = useClientApi()

  const vehicleBodyTypeRequest = async () => {
    const response = await API.get<LookupModel[]>(
      `/api/lookups/vehicle-body-type`
    )
    return response.data
  }

  return useAppQuery({
    queryKey: generateVehicleBodyTypeQueryKey(),
    queryFn: vehicleBodyTypeRequest,
  })
}
