'use client'

import {
  Dialog,
  DialogCloseX,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { useScopedI18n } from '@/shared/locales/client'
import { ModalProps } from '@/shared/types/components.types'
type Props = ModalProps
function HowItWorksModal({ isOpened, setIsOpened }: Props) {
  const tModal = useScopedI18n('landing.howItWorksModal')

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogContent>
        <DialogHeader className='justify-between'>
          <DialogTitle className='font-bold md:text-xxl'>
            {tModal('how_does_it_work')}
          </DialogTitle>
          <DialogCloseX />
        </DialogHeader>
        How it works modal content here
      </DialogContent>
    </Dialog>
  )
}

export default HowItWorksModal
