import FAQInactiveIcon from '@/shared/components/icons/faq-inactive-icon.svg'
import FAQActiveIcon from '@/shared/components/icons/faq-active-icon.svg'

import { cn } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
type Props = {
  isActive: boolean
}
const FAQBarItem = ({ isActive }: Props) => {
  const tFAQ = useScopedI18n('faq')
  return (
    <div
      className={cn(
        'flex w-full min-w-32 flex-col items-center justify-center gap-3 rounded-lg  border px-2 py-6',
        isActive
          ? 'border-secondary-6 bg-secondary-1 text-secondary-6'
          : 'border-neutral-2 bg-neutral-1 text-neutral-6'
      )}
    >
      {isActive ? <FAQActiveIcon /> : <FAQInactiveIcon />}
      <div className='text-center text-sm font-bold'>
        {tFAQ('faq_bar.title')}
      </div>
    </div>
  )
}

export default FAQBarItem
