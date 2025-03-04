'use client'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'


import { Sheet, SheetContent, SheetHeader } from '../ui/sheet'

import { HeaderLinks } from './header-links'
import SocialMediaLinks from './social-media'
import Link from 'next/link'

function BurgerMenu() {
  const t = useScopedI18n('common.header')
  const locale = useCurrentLocale()

  const { isOpened, setIsOpened } = useDisclosure()

  const handelDropdownMenuTrigger = () => {
    setIsOpened(true)
  }

  return (
    <div className='block lg:ms-2 lg:hidden'>
      <button
        data-collapse-toggle='navbar-multi-level'
        type='button'
        className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        aria-controls='navbar-multi-level'
        aria-expanded='false'
        onClick={handelDropdownMenuTrigger}
      >
        <span className='sr-only'>Open main menu</span>
        <svg
          className='h-5 w-5'
          //   aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 17 14'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M1 1h15M1 7h15M1 13h15'
          />
        </svg>
      </button>

      <Sheet open={isOpened} onOpenChange={setIsOpened}>
        <SheetContent
          className='flex h-full w-[100%] flex-col rounded-lg  bg-[#FAEBD7] '
          side={locale == 'en' ? 'left' : 'right'}
        >
          <SheetHeader
            className='mb-6 flex-row justify-between space-y-0'
            dir={locale == 'en' ? 'rtl' : 'ltr'}
          >
            <img
              className=' w-36'
              alt={'logo'}
              src='/images/PhysioSky-Logo.png'
            />
          </SheetHeader>
          <HeaderLinks />
          <div className='mt-40 flex items-center justify-center'>
            <SocialMediaLinks />
          </div>
          <div>
            <Link
              href='https://wa.me/201553878925'
              target='_blank'
              rel='noopener noreferrer'
              className=' mt-40 flex items-center justify-center rounded-lg border border-error-5 bg-error-5  px-4 py-3 font-bold text-base-white'
            >
              {t('BookNow')}
            </Link>
            {/* <WhatsAppButton /> */}

          </div>
          {/* <AccountMenuTabsWrapper /> */}
          {/* <SheetFooter className='absolute bottom-5 cursor-pointer flex-row gap-2'>
            <ChangeLangButton />
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
  )
}
export default BurgerMenu
