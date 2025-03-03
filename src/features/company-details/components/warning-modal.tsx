import React from 'react'
import TriangleIcon from '@/shared/components/icons/alert-triangle.svg'
import { Button } from '@/shared/components/ui/button'
interface EditCrNumberWarningModalProps {
  onClickMainBtn(): void
  onClickSubMainBtn?(): void
  title: string
  subTitle: string
  mainBtn: string
  subBtn?: string
  col?: boolean
  disableSubBtn?: boolean
}

const WarningModal = (props: EditCrNumberWarningModalProps) => {
  const {
    onClickMainBtn,
    onClickSubMainBtn,
    title,
    subTitle,
    mainBtn,
    subBtn,
    col,
    disableSubBtn,
  } = props
  return (
    <div className='flex flex-col justify-center'>
      <div className='flex  justify-center '>
        <div className='mb-6 flex size-14 items-center justify-center rounded-full border bg-error-1 '>
          <TriangleIcon />
        </div>
      </div>

      <p className='mb-1 text-center text-base font-bold'>{title}</p>
      <p className='mb-6 text-center text-sm text-neutral-5'>{subTitle}</p>

      <div
        className={`${
          col ? 'flex-col' : ''
        } flex items-center justify-between  gap-2`}
      >
        {col ? (
          <>
            <Button
              className='w-full'
              variant='glassy'
              colorScheme='secondary'
              size='XS'
              onClick={onClickMainBtn}
            >
              {mainBtn}
            </Button>
            {disableSubBtn ? null : (
              <Button
                className='w-full'
                variant='solid'
                size='XS'
                onClick={onClickSubMainBtn}
              >
                {subBtn}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              className='w-full'
              variant='glassy'
              size='XS'
              onClick={onClickSubMainBtn}
            >
              {subBtn}
            </Button>
            <Button
              className='w-full'
              variant='solid'
              colorScheme='secondary'
              size='XS'
              onClick={onClickMainBtn}
            >
              {mainBtn}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default WarningModal
