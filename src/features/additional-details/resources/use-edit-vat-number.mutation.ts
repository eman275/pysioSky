import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import { generateEditVatNumberMutationKey } from './additional-details.helpers'
import useAppParam from '@/shared/hooks/use-app-params'
import useClientApi from '@/shared/hooks/use-client-api'

type Payload = {
  vatNumber: string
}

export default function useEditVatNumberMutation() {
  const { crNumber, correlationId } = useAppParam()
  const { API } = useClientApi()
  return useAppMutation({
    mutationKey: generateEditVatNumberMutationKey(crNumber, correlationId),
    mutationFn: (payload: Payload) =>
      API.put<never>('/api/entities', {
        crNumber,
        correlationId,
        ...payload,
      }),
  })
}
