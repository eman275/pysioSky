'use client'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'
import { ModalProps } from '@/shared/types/components.types'

type Props = ModalProps

export const AwarenessVideoModal = ({ isOpened, setIsOpened }: Props) => {
  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogContent
        className={cn('h-[80vh] w-3/5 p-0 md:rounded-none md:p-0')}
      >
        {/* TODO: update video src with the real one */}
        <iframe
          width='100%'
          height='100%'
          src='https://www.youtube.com/embed/Oflbho9ZG2U?autoplay=1'
          allow='autoplay'
        />
      </DialogContent>
    </Dialog>
  )
}
