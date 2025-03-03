type Props = { referenceNo: string; title: string }

const PaymentReference = ({ referenceNo, title }: Props) => {
  return (
    <div className='flex flex-1 flex-col items-center gap-1 rounded-lg border bg-neutral-1 p-4'>
      <p className='text-sm text-neutral-5'>{title}</p>
      <p className='font-bold'>{referenceNo}</p>
    </div>
  )
}
export default PaymentReference
