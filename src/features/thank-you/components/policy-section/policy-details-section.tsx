import PolicyDetailsItem from './policy-details-item'

type Props = {
  tplDetails: {
    title: string
    value: string
  }[]
  compDetails: {
    title: string
    value: string
  }[]
}

const PolicyDetailsSection = ({ tplDetails, compDetails }: Props) => {
  return (
    <div className='flex w-full flex-col gap-2'>
      {tplDetails.length > 0 && <PolicyDetailsItem item={tplDetails} />}
      {compDetails.length > 0 && (
        <>
          <div className='w-0 border border-x-0 border-t-0 border-b-neutral-3 lg:w-full'></div>
          <PolicyDetailsItem item={compDetails} />
        </>
      )}
    </div>
  )
}
export default PolicyDetailsSection
