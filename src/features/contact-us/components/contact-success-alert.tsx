import CheckCircleIcon from '@/shared/components/icons/check-circle.svg'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { useScopedI18n } from '@/shared/locales/client'
import { ModalProps } from '@/shared/types/components.types'

export default function ContactSuccessAlert({
  isOpened,
  setIsOpened,
  onClose,
}: ModalProps) {
  const tContact = useScopedI18n('contact-us.success_popup')
  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogContent className='flex flex-col items-center gap-6 px-6 py-10 text-center outline-none lg:max-w-[540px]'>
        <CheckCircleIcon />

        <h6 className='text-xxl font-bold'>{tContact('title')}</h6>
        <p>{tContact('description')}</p>
        <div className='flex justify-center'>
          <Button
            onClick={onClose}
            colorScheme='secondary'
            size='M'
            className='w-40'
          >
            {tContact('action_btn_text')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
