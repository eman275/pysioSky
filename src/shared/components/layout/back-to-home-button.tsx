'use client'
import { ButtonIcon } from '@/shared/components/ui/button'
import React from 'react'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import { useRouter } from 'next/navigation'
import Arrow from '@/shared/components/icons/arrow.svg'

export default function BackToHomeButton() {
  const { isLarge } = useScreenSize()
  const router = useRouter()
  const handleGoBack = () => {
    router.push('/')
  }
  return (
    <ButtonIcon
      onClick={handleGoBack}
      size={isLarge ? 'S' : 'XXS'}
      variant='outlined'
      colorScheme='neutral'
      className='rounded-full border border-neutral-2 bg-base-white hover:border-neutral-2'
    >
      <Arrow className='h-4 w-4 lg:h-6 lg:w-6 rtl:rotate-180' />
    </ButtonIcon>
  )
}
