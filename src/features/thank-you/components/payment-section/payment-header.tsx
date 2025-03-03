import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
type Props = {
  url?: string
  title: string
}
const PaymentHeader = ({ url, title }: Props) => (
  <div className='flex items-start gap-4'>
    <Avatar className='h-16 w-[88px] rounded-lg border border-neutral-2 bg-neutral-1'>
      <AvatarImage src={url} className='object-contain' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <p className='text-xxl font-bold'>{title}</p>
  </div>
)

export default PaymentHeader
