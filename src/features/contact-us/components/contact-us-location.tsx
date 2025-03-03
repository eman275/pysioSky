import Location from '@/shared/components/icons/contact-us-location.svg'
import { getScopedI18n } from '@/shared/locales/server'

const ContactUsLocation = async () => {
  const tContact = await getScopedI18n('contact-us')
  return (
    <div className='flex w-full flex-col items-center justify-center gap-4 border-neutral-2 bg-white px-4 py-6 lg:w-[330px]'>
      <div className='h-fit w-fit rounded-full bg-neutral-1 p-2'>
        <Location />
      </div>
      <div className='flex flex-col'>
        <div className='mb-2 text-center font-bold'>
          {tContact('our_location')}
        </div>
        <div className='flex flex-col'>
          <div className='text-center text-xs'>
            {tContact('location_address')}
          </div>
          <div className='text-center text-xs'>
            {tContact('postal_code')}: 13249.
          </div>
        </div>
        <div className='mt-6 h-36'>
          <iframe
            className='h-full w-full'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30212.482414843304!2d46.7409649483583!3d24.84750129930597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2efeb19c89864b%3A0xbf8bae365f2bf3e1!2zUlVNQjM3MjMsIDM3MjMgQWwgVGhvdW1hbWFoIFJkLCA4Mzc02Iwg2K3ZiiDYp9mE2YXZiNmG2LPZitip2IwgUml5YWRoIDEzMjQ5LCBTYXVkaSBBcmFiaWE!5e0!3m2!1sen!2seg!4v1725120010875!5m2!1sen!2seg&output=embed'
            loading='lazy'
          />
        </div>
      </div>
    </div>
  )
}

export default ContactUsLocation
