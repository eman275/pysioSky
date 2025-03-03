import BackToHomeButton from '@/shared/components/layout/back-to-home-button'
import { getScopedI18n } from '@/shared/locales/server'
const FAQHeader = async () => {
  const tFAQ = await getScopedI18n('faq')
  return (
    <div className='flex gap-3 lg:gap-4'>
      <BackToHomeButton />

      <div className='flex flex-col gap-1'>
        <div className='text-xs font-bold'>
          {tFAQ('home')} {'>'}{' '}
          <span className='text-neutral-5'>{tFAQ('faq_sub_title')}</span>
        </div>
        <div className='text-[22px] font-bold'>{tFAQ('faq_title')}</div>
      </div>
    </div>
  )
}

export default FAQHeader
