import SVGlogoGray from '@/shared/components/icons/logo-gray.svg'
import SVGlogo from '@/shared/components/icons/logo.svg'
import SVGfacebook from '@/shared/components/icons/so-facebook.svg'
import SVGinstagram from '@/shared/components/icons/so-instagram.svg'
import SVGsnapchat from '@/shared/components/icons/so-snapchat.svg'
import SVGx from '@/shared/components/icons/so-twitter-x.svg'
import SVGyoutube from '@/shared/components/icons/so-youtube.svg'
import SVGvision from '@/shared/components/icons/vision-2030.svg'
import SVGvisionSmall from '@/shared/components/icons/vision-2030-small-screen.svg'
import SVGappStore from '@/shared/components/icons/app-store.svg'
import SVGgooglePlay from '@/shared/components/icons/google-play.svg'
import SVGappGallery from '@/shared/components/icons/app-gallery.svg'
import SVGSmallAppStore from '@/shared/components/icons/small-app-store.svg'
import SVGSmallGooglePlay from '@/shared/components/icons/small-google-play.svg'
import SVGSmallAppGallery from '@/shared/components/icons/small-app-gallery.svg'
import { getScopedI18n } from '@/shared/locales/server'
import { ContentDesktop } from './content-desktop'
import { ContentMobile } from './content-mobile'
import Link from 'next/link'

export const Footer = async () => {
  const t = await getScopedI18n('common.footer')

  const appLinks = [
    {
      href: 'https://apps.apple.com/us/app/tameeni/id1501339487',
      icon: <SVGappStore className='hidden lg:block' />,
      smallIcon: <SVGSmallAppStore className='lg:hidden' />,
    },
    {
      href: 'https://play.google.com/store/apps/details?id=tameeni.com',
      icon: <SVGgooglePlay className='hidden lg:block' />,
      smallIcon: <SVGSmallGooglePlay className='lg:hidden' />,
    },
    {
      href: 'https://appgallery.huawei.com/app/C104656303',
      icon: <SVGappGallery className='hidden lg:block' />,
      smallIcon: <SVGSmallAppGallery className='lg:hidden' />,
    },
  ]

  const socialLinks = [
    { href: 'https://www.facebook.com/Tameeniksa/', icon: <SVGfacebook /> },
    { href: 'https://twitter.com/TameeniKSA', icon: <SVGx /> },
    { href: 'https://www.instagram.com/tameeniksa/', icon: <SVGinstagram /> },
    { href: 'https://www.youtube.com/Tameeniksa', icon: <SVGyoutube /> },
    { href: 'https://www.snapchat.com/add/tameeniksa', icon: <SVGsnapchat /> },
  ]

  return (
    <footer className='mt-auto flex w-full flex-col pb-32 text-neutral-5 lg:pb-0'>
      <div className='bg-white pb-4 text-sm shadow-[0px_-1px_0px_0px] shadow-neutral-3 lg:pb-24 lg:pt-8'>
        <div className='container'>
          <div className='mb-8 hidden lg:block'>
            <SVGlogo />
          </div>
          <div className='flex flex-col pt-4 lg:flex-row lg:pt-0'>
            <ContentDesktop />
            <ContentMobile />
            <div className='flex-center w-full flex-col lg:w-1/3 lg:items-start lg:justify-start'>
              <h4 className='mb-2 text-base font-bold capitalize text-neutral-6 lg:mb-4'>
                {t('download_tameeni_app')}
              </h4>
              <ul className='mb-4 flex gap-2 lg:mb-8'>
                {appLinks.map(({ href, icon, smallIcon }, index) => (
                  <li key={index}>
                    <Link href={href} target='_blank'>
                      {icon}
                      {smallIcon}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className='mb-2 text-base font-bold capitalize text-neutral-6 lg:mb-4'>
                {t('follow_tameeni')}
              </h4>
              <ul className='flex items-center gap-5'>
                {socialLinks.map(({ href, icon }, index) => (
                  <li key={index}>
                    <Link href={href} target='_blank'>
                      {icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-neutral-1 py-3 text-xs shadow-inner lg:pb-5'>
        <div className='container'>
          <div className='relative flex flex-col items-start justify-between pe-12 lg:flex-row lg:items-center lg:pe-0'>
            <div>{t('copyright')}</div>
            <div className='absolute end-0 flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-full border border-neutral-3 bg-white lg:start-0  lg:mx-auto lg:-mt-12 lg:h-[102px] lg:w-[102px]'>
              <SVGvision className='hidden lg:block' />
              <SVGvisionSmall className='lg:hidden' />
            </div>
            <div className='flex items-center gap-1'>
              <span>
                {t('powered_by')}: {t('rasan')}
              </span>
              <SVGlogoGray />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
