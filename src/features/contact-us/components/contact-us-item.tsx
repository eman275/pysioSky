'use client'
type Props = {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  isAlwaysLtr?: boolean
}

const ContactUsItem = ({
  icon,
  title,
  description,
  isAlwaysLtr,
  onClick,
}: Props) => {
  return (
    <div
      className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-2 bg-white px-4 py-8'
      onClick={onClick}
    >
      <div className='rounded-full bg-neutral-1 p-2'>{icon}</div>
      <div className='flex flex-col items-center gap-1'>
        <div
          className='text-base font-bold'
          dir={isAlwaysLtr ? 'ltr' : undefined}
        >
          {title}
        </div>
        <div className='text-center text-xs'>{description}</div>
      </div>
    </div>
  )
}

export default ContactUsItem
