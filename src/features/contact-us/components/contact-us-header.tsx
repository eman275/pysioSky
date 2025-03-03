import BackToHomeButton from '@/shared/components/layout/back-to-home-button'
import { getScopedI18n } from '@/shared/locales/server'
const ContactUsHeader = async () => {
  const tContact = await getScopedI18n('contact-us')
  return (
    <div className='flex gap-3 lg:gap-4'>
      <BackToHomeButton />

      <div className='flex flex-col gap-1'>
        <div className='text-xs font-bold'>
          {tContact('home')} {'>'}{' '}
          <span className='text-neutral-5'>{tContact('contact_us')}</span>
        </div>
        <div className='text-[22px] font-bold'>{tContact('contact_us')}</div>
      </div>
    </div>
  )
}

export default ContactUsHeader
