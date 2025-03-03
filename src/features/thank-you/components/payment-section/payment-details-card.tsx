import { Card } from '@/shared/components/ui/card'
import { PaymentDetail } from './thank-you-payment-details'

type Props = { paymentDetails: PaymentDetail[] }
const PaymentDetailsCard = ({ paymentDetails }: Props) => {
  return (
    <Card className='flex w-full flex-col gap-6 border-2 border-dashed border-primary-6 bg-primary-1 p-4 md:w-[330px]'>
      {paymentDetails.map(({ title, value }) => (
        <div
          key={title}
          className='flex w-full justify-between gap-2 text-base font-bold'
        >
          <p className='text-sm text-neutral-5'>{title}</p>
          <p>{value}</p>
        </div>
      ))}
    </Card>
  )
}

export default PaymentDetailsCard
