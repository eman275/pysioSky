import useAppParam from '@/shared/hooks/use-app-params'
import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import { generateVerifyOwnerMutationKey } from './additional-details.helpers'

type Payload = {
  ownerReference: string
  mobileNumber: string
}

type Response = {
  isVerified: boolean
  correlationId: string
}
export default function useVerifyCompanyOwnerMutation() {
  const { correlationId } = useAppParam()
  const { API } = useClientApi()
  const verifyOwnerRequest = (payload: Payload) => {
    return API.post<Response>('/api/entities/verify-owner', {
      ...payload,
      correlationId,
    })
  }
  return useAppMutation({
    mutationKey: generateVerifyOwnerMutationKey(correlationId),
    mutationFn: verifyOwnerRequest,
  })
}
