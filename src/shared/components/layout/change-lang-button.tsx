'use client'
import React from 'react'
import ArabicIcon from '@/shared/components/icons/arabic-icon.svg'
import EnglishIcon from '@/shared/components/icons/english-icon.svg'
import SVGglobe from '@/shared/components/icons/ui-globe.svg'

import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import { usePathname, useSearchParams } from 'next/navigation'
const localeToIconMap = {
  en: <ArabicIcon />,
  ar: <EnglishIcon />,
} as const

function ChangeLangButton() {
  const searchParams = useSearchParams()
  const t = useScopedI18n('common.header')
  const currentLocale = useCurrentLocale()
  const pathname = usePathname()
  const onChangeLanguageClick = React.useCallback(async () => {
    // Exclude locale from pathname
    const params = new URLSearchParams(
      Array.from(searchParams?.entries() ?? [])
    )

    const formatPath = pathname?.slice(4)
    const path =
      currentLocale === 'ar'
        ? `/en/${formatPath}?${params.toString()}`
        : `/ar/${formatPath}?${params.toString()}`
    window.location.href = path
  }, [currentLocale, pathname, searchParams])

  return (
    <div className=' '>
      <button
        onClick={onChangeLanguageClick}
        className='flex-center flex h-9 w-9 lg:hidden'
      >
        <SVGglobe />
      </button>
      <button
        onClick={onChangeLanguageClick}
        className='hidden h-10 items-center gap-2 rounded-lg bg-neutral-1 px-4 text-sm font-bold text-neutral-6 transition-all hover:opacity-90 hover:shadow lg:flex'
      >
        <span className='h-4 w-5'>{localeToIconMap[currentLocale]}</span>
        <span>{t('lang')}</span>
      </button>
    </div>
  )
}

export default ChangeLangButton
