import { useScopedI18n } from '@/shared/locales/client'

const NewPriceFlag = () => {
  const t = useScopedI18n('application.quotations')

  return (
    <p className='flex h-fit items-center rounded-[32px] border bg-primary-6 px-[6px] py-1 text-xxs font-semibold text-base-white'>
      {t('new_price')}
    </p>
  )
}

export default NewPriceFlag
