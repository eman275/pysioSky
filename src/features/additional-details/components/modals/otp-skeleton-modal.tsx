import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import { Spinner } from '@/shared/components/ui/loader/spinner'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'

const OtpSkeletonModal = () => {
  const t = useScopedI18n('application.additionalDetails')
  const secondSkeletonItems = Array.from({ length: 2 }).map((_, index) => (
    <React.Fragment key={index}>
      <Skeleton className='h-6 w-[137px] rounded-3xl   ' />
    </React.Fragment>
  ))
  const thirdSkeletonItems = Array.from({ length: 4 }).map((_, index) => (
    <React.Fragment key={index}>
      <Skeleton className='h-14  w-[88px] rounded-2xl  lg:w-[107px] ' />
    </React.Fragment>
  ))

  return (
    <div className='flex h-full flex-col items-center justify-center  gap-6  '>
      <Spinner />
      <p className=' text-base font-bold text-base-black lg:text-xxl'>
        {t('resending_otp')}
      </p>
      <Skeleton className='h-6  w-[269px] items-center rounded-3xl  lg:w-[308px] ' />
      <div className='flex justify-between gap-28 lg:gap-44'>
        {secondSkeletonItems}
      </div>
      <div className='flex items-center gap-2'>{thirdSkeletonItems}</div>
      <Skeleton className='h-[63px]  w-[269px] items-center rounded-3xl  lg:w-[308px] ' />
      <Skeleton className='h-6 w-[137px] rounded-3xl   ' />
    </div>
  )
}

export default OtpSkeletonModal
