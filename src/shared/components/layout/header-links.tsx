'use client'
import Link from 'next/link'
import React from 'react'
// import { CAR_INSURANCE_URL } from '@/shared/lib/constants'
import { useScopedI18n } from '@/shared/locales/client'

// type Props = {
//   t?: any
// }

export const HeaderLinks = () => {
    const t = useScopedI18n('common.header')
  return (
    <div className=' flex flex-col items-center gap-3  lg:flex-row '>
      <Link
        href={''}
        className=' text-xxl lg:text-base  inset-x-0 m-auto w-28 font-bold text-primary-1 lg:relative '
      >
        {t('Services')}
      </Link>

      <Link
        href={''}
        className=' text-xxl lg:text-base  inset-x-0 m-auto w-28 font-bold text-primary-1 lg:relative '
      >
        {t('OurTeam')}
      </Link>
      <Link
        href={''}
        className=' text-xxl lg:text-base  inset-x-0 m-auto w-28 font-bold text-primary-1 lg:relative '
      >
        {t('AboutUs')}
      </Link>
      <Link
        href={''}
        className=' text-xxl lg:text-base  inset-x-0 m-auto w-28 font-bold text-primary-1 lg:relative '
      >
        {t('FAQ')}
      </Link>
      <Link
        href={''}
        className=' text-xxl lg:text-base  inset-x-0 m-auto w-28 font-bold text-primary-1 lg:relative '
      >
        {t('ContactUs')}
      </Link>
    </div>
  )
}
