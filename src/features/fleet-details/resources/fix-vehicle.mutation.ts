import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import { useQueryClient } from '@tanstack/react-query'
import { InsuranceType } from '../fleet-details.types'
import {
  generateFixVehicleMutationKey,
  generateVehiclesListQueryKey,
} from './fleet-details.helpers'

export interface FixVehiclePayload {
  applicationVehicleReference: string
  vehicleIdentifier: number
  vehicleUniqueType: number
  isOwnershipTransfer: boolean
  manufactureYear: number
  newVehicleEstimatedValue: number
  newInsuranceType: InsuranceType
  correlationId: string
}

export const useFixVehicleMutation = () => {
  const { API } = useClientApi()
  const queryClient = useQueryClient()

  const fixVehicleRequest = async (payload: FixVehiclePayload) => {
    return await API.put('/api/application-vehicles/fix', payload)
  }

  return useAppMutation({
    mutationKey: generateFixVehicleMutationKey(),
    mutationFn: fixVehicleRequest,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: generateVehiclesListQueryKey(),
      })
    },
  })
}
