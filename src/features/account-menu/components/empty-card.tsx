import React from 'react'
import NoDateIcon from '@/shared/components/icons/no-data-icon.svg'
import { Button } from '@/shared/components/ui/button'
import { useRouter } from 'next/navigation'
import { generatePublicPaths } from '@/shared/hooks/use-app-routes'

type EmptyCardProps = {
  title: string
  subtitle: string
  btnText: string
}

const EmptyCard = ({ title, subtitle, btnText }: EmptyCardProps) => {
  const router = useRouter()

  const onClickBtn = () => {
    router.push(generatePublicPaths().HOME)
  }
  return (
    <div className='flex h-auto w-auto flex-col items-center  justify-center rounded-lg border border-neutral-2 py-40 '>
      <NoDateIcon />
      <p className='mt-[14px] text-xs font-bold text-base-black'>{title}</p>
      <p className='text-xs font-bold text-neutral-5'>{subtitle}</p>

      <Button
        className='mt-3 flex w-[180px] items-center justify-center gap-6 px-10 py-4'
        variant='solid'
        colorScheme='secondary'
        size='XXS'
        onClick={onClickBtn}
      >
        {btnText}
      </Button>
    </div>
  )
}

export default EmptyCard
