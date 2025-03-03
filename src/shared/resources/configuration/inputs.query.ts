import { generateConfInputsQueryKey } from '@/features/company-details/resources/additional-details.helpers'
import useClientApi from '@/shared/hooks/use-client-api'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'

export type InputConfigurationResponse = {
  vehicleManufactureYear: {
    minimum: number
    maximum: number
  }
  vehicleEstimatedValue: {
    minimum: number
    maximum: number
  }
  policyEffectiveDate: {
    minimum: string
    maximum: string
  }
}

export const useInputsConfigQuery = () => {
  const { API } = useClientApi()

  const dateConfigRequest = async () => {
    const response = await API.get<InputConfigurationResponse>(
      `/api/configuration/input`
    )
    return response.data
  }

  return useAppQuery({
    queryKey: generateConfInputsQueryKey(),
    queryFn: dateConfigRequest,
  })
}
