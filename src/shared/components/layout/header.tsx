import Link from 'next/link'
import ChangeLangButton from './change-lang-button'
import { getScopedI18n } from '@/shared/locales/server'
import BurgerMenu from './burger-menu'
import { HeaderLinks } from './header-links'
import SocialMediaLinks from './social-media'

export const Header = async () => {
  const t = await getScopedI18n('common.header')

  return (
    
    <header className='bg-white lg:border-b lg:border-neutral-2 '>
      <div className='container'>
        <div className='relative flex h-14 items-center justify-between lg:h-20'>
          <BurgerMenu  />

          <div className='hidden lg:block'>
            <HeaderLinks   />
          </div>

          <img
            className='absolute inset-x-0 m-auto  w-36 lg:relative lg:m-0 lg:me-10 lg:w-52'
            alt={'logo'}
            src='/images/PhysioSky-Logo.png'
          />

          <div className=' hidden  lg:flex '>
            <SocialMediaLinks/>
          </div>
          <Link
            href='https://wa.me/201553878925'
            target='_blank'
            rel='noopener noreferrer'
            className=' hidden rounded-sm border border-primary-1  px-4 py-3 font-bold text-primary-1 lg:block'
          >
            {t('BookNow')}
          </Link>

          <ChangeLangButton />
          {/* <BurgerMenu /> */}
        </div>
      </div>
    </header>
  )
}
