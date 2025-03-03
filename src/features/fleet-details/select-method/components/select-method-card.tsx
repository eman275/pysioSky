import { Button } from '@/shared/components/ui/button'
import React, { ReactNode } from 'react'

export interface VehiclesDetailsCardTypes {
  icon: ReactNode
  title: string
  description: string
  subTitle: string
  btnText: string
  onClickBtn(): void
  isBtnLoading?: boolean
}
export interface SelectMethodProps {
  data: VehiclesDetailsCardTypes
}

const SelectMethodCard = (props: SelectMethodProps) => {
  const { data } = props
  return (
    <div className='flex w-full flex-col items-center rounded-md border px-4 py-10 lg:w-[578px]'>
      <section className='flex grow flex-col items-center justify-center text-center'>
        <div className='mb-4'>{data.icon}</div>
        <p className='mb-2 text-base font-bold'>{data.title}</p>
        <p className='mb-2 text-sm'>{data.description}</p>
        <p className='mb-8 text-xs text-neutral-5'>{data.subTitle}</p>
      </section>

      <Button
        size='XS'
        variant='solid'
        colorScheme='primary'
        onClick={data.onClickBtn}
        className='w-full max-w-52'
        isLoading={data.isBtnLoading}
      >
        {data.btnText}
      </Button>
    </div>
  )
}

export default SelectMethodCard
