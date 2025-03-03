import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import {
  generateDeleteVehicleMutationKey,
  generateVehiclesListQueryKey,
} from './fleet-details.helpers'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export interface DeleteVehiclePayload {
  references: string[]
  correlationId: string
}
export const useDeleteVehicleMutation = () => {
  const { API } = useClientApi()
  const queryClient = useQueryClient()

  const deleteVehicleRequest = async (payload: DeleteVehiclePayload) => {
    return await API.delete(`/api/application-vehicles`, { data: payload })
  }

  return useAppMutation({
    mutationKey: generateDeleteVehicleMutationKey(),
    mutationFn: deleteVehicleRequest,
    onSuccess() {
      toast.success('Vehicle deleted successfully!')
      queryClient.invalidateQueries({
        queryKey: generateVehiclesListQueryKey(),
      })
    },
  })
}
