/* eslint-disable @next/next/no-img-element */
'use client'
import Arrow from '@/shared/components/icons/arrow-right.svg'
import {
  Dialog,
  DialogCloseX,
  DialogContent,
  DialogHeader,
} from '@/shared/components/ui/dialog'
import InfoTooltip from '@/shared/components/ui/info-tooltip'
import Image from 'next/image'
import React, { useState } from 'react'
import ArrowBlue from '@/shared/components/icons/arrow-blue.svg'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import { useScopedI18n } from '@/shared/locales/client'

const CrImageModal: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { isLarge } = useScreenSize()
  const tCr = useScopedI18n('landing.cr_number_form')
  const showModal = () => {
    setIsOpened(true)
  }

  return (
    <>
      <InfoTooltip dialogTitle='Company CR number/Computer Number'>
        <div className='flex flex-col items-center justify-center lg:flex-row'>
          <div className=' border-b border-neutral-3 lg:border-none '>
            <p className=' mb-4 text-center text-sm font-semibold text-base-black'>
              {tCr('tooltip_text')}
            </p>
          </div>

          <div
            onClick={showModal}
            className='mt-9 flex cursor-pointer items-center whitespace-nowrap text-xs font-bold text-primary-6 lg:text-base-black '
          >
            {tCr('view_example')}
            <span className='rtl:rotate-180'>
              {isLarge ? <Arrow /> : <ArrowBlue />}
            </span>
          </div>
        </div>
      </InfoTooltip>

      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent
          contentContainerClassName='min-h-[80vh] w-screen lg:w-[800px]'
          className={'relative min-h-[80vh] w-screen lg:w-[800px]'}
        >
          <DialogHeader className='z-50  justify-between '>
            <DialogCloseX />
          </DialogHeader>
          <Image
            src='/images/cr-img.png'
            fill
            className='h-full w-full p-12'
            alt='info'
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CrImageModal
