import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import {
  generateEditVehicleMutationKey,
  generateVehiclesListQueryKey,
} from './fleet-details.helpers'
import { useQueryClient } from '@tanstack/react-query'
import { useScopedI18n } from '@/shared/locales/client'
import { getToastCard } from '../fleet-list/helpers'
import { VehicleItem } from '../fleet-details.types'

export interface EditedVehicle {
  applicationVehicleReference: string
  newVehicleEstimatedValue: number
  newInsuranceType?: number
  newSelectedMakeId?: number
  newSelectedModelId?: number
  newSelectedBodyTypeId?: number
  newSelectedManufactureYear?: number
}

export interface EditVehiclePayload {
  vehicles: EditedVehicle[]
  correlationId: string
}
export const useEditVehicleMutation = () => {
  const { API } = useClientApi()
  const queryClient = useQueryClient()
  const t = useScopedI18n('application.fleetDetails')

  const createVehicleManuallyRequest = async (payload: EditVehiclePayload) => {
    return await API.put(`/api/application-vehicles`, payload)
  }

  return useAppMutation({
    mutationKey: generateEditVehicleMutationKey(),
    mutationFn: createVehicleManuallyRequest,
    onSuccess(data) {
      const isSuccess =
        data?.data?.vehicles.filter((item: VehicleItem) => item.errors)
          .length == 0
      getToastCard(
        isSuccess,
        t('vehicle_edited_successfully'),
        t('vehicle_edit_warning')
      )
      queryClient.invalidateQueries({
        queryKey: generateVehiclesListQueryKey(),
      })
    },
  })
}
