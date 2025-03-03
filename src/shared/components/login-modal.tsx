'use client'
import { cn } from '@/shared/lib/utils'
import { ComponentProps } from 'react'
import LoginIframe from './login-iframe'
import TameeniLoader from './tameeni-loader/tameeni-loader'
import { Dialog, DialogClose, DialogCloseX, DialogContent } from './ui/dialog'
import useCleanup from '../hooks/use-cleanup'
import { useAppNavigationState } from '../hooks/use-app-store'

type Props = Pick<ComponentProps<typeof LoginIframe>, 'searchParams'> & {
  onOpenChange(_: boolean): void
  isLoading: boolean
  setIsLoading: SetState<boolean>
}

export default function LoginModal({
  searchParams,
  isLoading,
  setIsLoading,
  onOpenChange,
}: Props) {
  const { setIsNavigating } = useAppNavigationState()
  useCleanup(() => {
    setIsNavigating(false)
  })
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'h-[80vh] w-full lg:w-[500px]',
          isLoading && 'overflow-hidden'
        )}
      >
        <DialogClose className='absolute end-0'>
          <DialogCloseX />
        </DialogClose>
        {isLoading && (
          <div className='absolute inset-0 grid h-full w-full place-content-center place-items-center bg-black/15'>
            <TameeniLoader />
          </div>
        )}

        <LoginIframe
          onLoad={() => setIsLoading(false)}
          className={'h-full w-full'}
          searchParams={searchParams}
        />
      </DialogContent>
    </Dialog>
  )
}
