type Props = {
  item: {
    title: string
    value: string
  }[]
}

const PolicyDetailsItem = ({ item }: Props) => {
  return (
    <div className='grid grid-cols-2 gap-4 bg-neutral-1 p-4  lg:grid-cols-6'>
      {item.map(({ title, value }, index) => (
        <div key={index} className='flex flex-col justify-start'>
          <p className='text-neutral-5'>{title}</p>
          <p>{value}</p>
        </div>
      ))}
    </div>
  )
}
export default PolicyDetailsItem
