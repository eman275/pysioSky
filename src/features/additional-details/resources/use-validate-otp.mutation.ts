import useAppParam from '@/shared/hooks/use-app-params'
import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import { generateValidateOtpMutationKey } from './additional-details.helpers'

type Payload = {
  crOwnerReference: string
  otpReference: string
  otpValue: string
}

export function useValidateOtpMutation() {
  const { correlationId } = useAppParam()
  const { API } = useClientApi()

  const validateOtpRequest = (payload: Payload) => {
    return API.post<never>('/api/otp/validate', {
      ...payload,
      correlationId,
    })
  }

  return useAppMutation({
    mutationKey: generateValidateOtpMutationKey(correlationId),
    mutationFn: validateOtpRequest,
  })
}
