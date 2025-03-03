import useAppParam from '@/shared/hooks/use-app-params'
import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import { generateSendOtpMutationKey } from './additional-details.helpers'

type Payload = {
  crOwnerReference: string
  mobileNumber: string
}

type Response = {
  otpReference: string
  correlationId: string
  expiresInSeconds: number
}

export default function useSendOtpMutation() {
  const { correlationId } = useAppParam()
  const { API } = useClientApi()

  const sendOtpRequest = ({ mobileNumber, ...payload }: Payload) => {
    return API.post<Response>('/api/otp', {
      ...payload,
      mobileNumber,
      correlationId,
      culture: 0,
    })
  }
  return useAppMutation({
    mutationKey: generateSendOtpMutationKey(correlationId),
    mutationFn: sendOtpRequest,
  })
}
