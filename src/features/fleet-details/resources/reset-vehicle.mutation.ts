import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import {
  generateResetVehiclesMutationKey,
  generateVehiclesListQueryKey,
} from './fleet-details.helpers'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import useAppParam from '@/shared/hooks/use-app-params'
import { useScopedI18n } from '@/shared/locales/client'

type Payload = {
  resetType: 'all' | 'invalid'
}
export const useResetVehicleMutation = () => {
  const { API } = useClientApi()
  const queryClient = useQueryClient()
  const { correlationId, applicationReference } = useAppParam()
  const t = useScopedI18n('application.fleetDetails')

  const resetVehicleRequest = async (payload: Payload) => {
    return await API.delete(`/api/application-vehicles/reset`, {
      data: {
        applicationReference,
        correlationId,
        invalid: payload.resetType === 'invalid',
      },
    })
  }

  return useAppMutation({
    mutationKey: generateResetVehiclesMutationKey(),
    mutationFn: resetVehicleRequest,
    onSuccess() {
      toast.success(t('vehicle_deleted_successfully'))

      queryClient.invalidateQueries({
        queryKey: generateVehiclesListQueryKey(),
      })
    },
  })
}
