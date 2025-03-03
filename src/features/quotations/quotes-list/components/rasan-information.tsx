'use client'
import RasanInfo from '@/shared/components/icons/rasan-info.svg'
import useAppParam from '@/shared/hooks/use-app-params'
import { useScopedI18n } from '@/shared/locales/client'
import { useCrNumberQuery } from '@/shared/resources/application/cr-number.mutation'

const RasanInformation = () => {
  const t = useScopedI18n('application.quotations')
  const { crNumber } = useAppParam()
  const { data } = useCrNumberQuery({ crNumber })
  const companyName = data?.name
  const expiryDate = data?.expiryDate
  return (
    <div className='mb-4 flex items-start rounded-md border bg-white px-3 py-2 lg:flex-row lg:items-center'>
      <div className='mr-3 flex items-center'>
        <RasanInfo />
      </div>
      <div className='flex grow flex-col items-start sm:flex-row lg:justify-between'>
        <div className='flex grow'>
          <p className='font-bold'>{companyName}</p>
        </div>
        <div className='my-auto flex'>
          <p className='pr-3 text-xs font-normal'>
            {t('cr')} {crNumber}
          </p>
          <div className='mx-2 h-auto self-stretch border-l border-neutral-4'></div>
          <p className='pl-3 text-xs font-normal'>
            {t('expiry_date')} {expiryDate}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RasanInformation
