import { Button } from '@/shared/components/ui/button'
import NextArrow from '@/shared/components/icons/next-arrow.svg'

import React from 'react'
import { useScopedI18n } from '@/shared/locales/client'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
interface NextBtnProps {
  onClickNextBtn?(): void
  type?: 'button' | 'reset' | 'submit'
  isLoading?: boolean
  disable?: boolean
}

const NextBtn = (props: NextBtnProps) => {
  const t = useScopedI18n('common.words')
  const { onClickNextBtn, type, isLoading, disable } = props
  const { isLarge } = useScreenSize()
  return (
    <div className='fixed inset-x-0 bottom-0 z-10 flex h-28 w-full rounded-lg border border-solid border-gray-300 bg-base-white px-6  pb-8 pt-6 shadow-nextBtn lg:relative lg:h-auto lg:items-center lg:justify-end lg:border-none lg:bg-transparent  lg:px-0 lg:shadow-none'>
      <Button
        className='flex w-full  items-center justify-between lg:w-60'
        variant='solid'
        colorScheme='secondary'
        size={isLarge ? 'L' : 'S'}
        onClick={onClickNextBtn}
        type={type}
        isLoading={isLoading}
        disabled={disable}
      >
        {t('next')}
        <div className='rtl:rotate-180'>
          <NextArrow />
        </div>
      </Button>
    </div>
  )
}

export default NextBtn
