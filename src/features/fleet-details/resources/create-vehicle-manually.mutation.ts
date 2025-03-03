import useClientApi from '@/shared/hooks/use-client-api'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import { useQueryClient } from '@tanstack/react-query'
import { VehicleError, VehicleItem } from '../fleet-details.types'
import {
  generateCreateVehicleManuallyMutationKey,
  generateVehiclesListQueryKey,
} from './fleet-details.helpers'
import { CreateVehicleManuallyPayload } from './types'
import { useScopedI18n } from '@/shared/locales/client'
import { getToastCard } from '../fleet-list/helpers'

export type QueryCreateVehicleManuallyResponse = {
  applicationReference: number
  vehicles: VehicleItem[]
  errors: VehicleError[]
  correlationId: string
  status: boolean
}

export const useCreateVehicleManuallyMutation = () => {
  const { API } = useClientApi()
  const queryClient = useQueryClient()
  const clientQs = useClientQueryString()
  const t = useScopedI18n('application.fleetDetails')

  const createVehicleManuallyRequest = async (
    payload: CreateVehicleManuallyPayload
  ) => {
    return await API.post<QueryCreateVehicleManuallyResponse>(
      `/api/application-vehicles`,
      payload
    )
  }

  return useAppMutation({
    mutationKey: generateCreateVehicleManuallyMutationKey(),
    mutationFn: createVehicleManuallyRequest,
    onSuccess(data) {
      const isSuccess = Boolean(data?.data?.vehicles?.[0]?.status)
      getToastCard(
        isSuccess,
        t('vehicle_add_successfully'),
        t('vehicle_add_warning')
      )
      clientQs.set([{ key: 'pageNumber', value: '1' }])

      queryClient.invalidateQueries({
        queryKey: generateVehiclesListQueryKey(),
      })
    },
  })
}
