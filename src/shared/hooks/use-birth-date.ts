'use client'
import { useScopedI18n } from '@/shared/locales/client'

export type SelectOptionType = {
  label: string
  value: number | string
}

const useBirthDate = () => {
  const t = useScopedI18n('common.months')

  const MONTHS = [
    { g: t('january'), h: t('moharram') },
    { g: t('february'), h: t('safar') },
    { g: t('march'), h: t('rabi_1') },
    { g: t('april'), h: t('rabi_2') },
    { g: t('may'), h: t('jumada_1') },
    { g: t('june'), h: t('jumada_2') },
    { g: t('july'), h: t('ragab') },
    { g: t('august'), h: t('shaaban') },
    { g: t('september'), h: t('ramadhan') },
    { g: t('october'), h: t('shawal') },
    { g: t('november'), h: t('zulqeda') },
    { g: t('december'), h: t('zulhejja') },
  ]
  const getMonths = (type: string): SelectOptionType[] => {
    return MONTHS.map((month, i) => ({
      label: type === 'h' ? month.h : month.g,
      value: i + 1,
    }))
  }
  const getYears = (type: string, minAge: number, maxAge: number) => {
    const years: SelectOptionType[] = []

    let i = new Date().getFullYear() - minAge
    while (years.length <= maxAge - minAge) {
      years.push({
        label: type === 'h' ? `${i - 578}` : `${i}`,
        value: type === 'h' ? i - 578 : i,
      })
      i--
    }
    return years
  }
  return { getMonths, getYears }
}

export default useBirthDate
