import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import { generateCreateApplicationMutationKey } from './additional-details.helpers'

export type CreateApplicationResponse = {
  applicationReference: string
  correlationId: string
}

export interface CreateApplicationPayload {
  entityReference: string
  entitySizeId: number
  policyEffectiveDate: string
  contactEmail: string
  contactMobileNo: string
}

export const useCreateApplicationMutation = () => {
  const { API } = useClientApi()

  const createApplicationRequest = async (
    payload: CreateApplicationPayload
  ) => {
    return await API.post<CreateApplicationResponse>(
      `/api/applications`,
      payload
    )
  }

  return useAppMutation({
    mutationKey: generateCreateApplicationMutationKey(),
    mutationFn: createApplicationRequest,
  })
}
