import useClientApi from '@/shared/hooks/use-client-api'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'

type Payload = {
  mobileNumber: string
  emailAddress: string
  purposeId: number
  details: string
}
export default function useSendContactTicketMutation() {
  const { API } = useClientApi()
  const sendContactTicket = (payload: Payload) =>
    API.post('/api/home/contact', payload)
  const mutation = useAppMutation({
    mutationKey: ['contact-ticket'],
    mutationFn: sendContactTicket,
  })

  return mutation
}
