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

          <Link
          href='https://www.google.com/maps/dir//Majarrah,+Block+12+26th+of+July+Corridor,+First+Al+Sheikh+Zayed,+Giza+Governorate+12588/@30.0260084,31.0124309,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x14585bbb4f26d1bf:0x4ba2776cc447ee4f!2m2!1d31.0150058!2d30.0260038?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D'
          target='_blank'
          >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className='hidden lg:block text-primary-1'
          >
            <path d='M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0' />
            <circle cx='12' cy='8' r='2' />
            <path d='M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712' />
          </svg>
        </Link>

          <ChangeLangButton />
          {/* <BurgerMenu /> */}
        </div>
      </div>
    </header>
  )
}
