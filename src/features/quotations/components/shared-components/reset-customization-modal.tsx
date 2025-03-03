import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
import ResetIcon from '@/shared/components/icons/reset-gary-icon.svg'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { useQuoteResetMutation } from '../../quotes-list/resources/reset-quote.mutation'
import useAppParam from '@/shared/hooks/use-app-params'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type Props = {
  setIsOpened: (open: boolean) => void
  isOpened: boolean
  subQuoteRef?: string
}
const ResetCustomizationModal = ({
  isOpened,
  setIsOpened,
  subQuoteRef,
}: Props) => {
  const t = useScopedI18n('application.quotations')
  const queryClient = useQueryClient()
  const resetMutation = useQuoteResetMutation()
  const { correlationId, quoteReference } = useAppParam()
  const resetHandler = () => {
    resetMutation.mutate(
      {
        subQuoteResponseReference: quoteReference || (subQuoteRef as string),
        correlationId,
      },
      {
        onSuccess: () => {
          toast.success('Quote rested successfully!')
          queryClient.invalidateQueries({ queryKey: ['quotations'] })
        },
        onSettled: () => {
          setIsOpened(false)
        },
      }
    )
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogContent>
        <div className='flex w-full flex-col px-6 py-8 xl:max-w-[400px]'>
          <div className='flex items-center justify-center'>
            <div className='mb-6 flex size-14 items-center justify-center rounded-full border bg-neutral-2 px-4 py-[16.5px] text-center '>
              <ResetIcon />
            </div>
          </div>
          <p className='mb-1 text-center text-base font-bold'>
            {t('reset_customization_modal.title')}
          </p>
          <div className='text-center text-sm font-normal text-neutral-5'>
            {t('reset_customization_modal.description')}
          </div>

          <div className='mt-6 flex items-center justify-between gap-2'>
            <Button
              className='grow border-0'
              variant='glassy'
              colorScheme='neutral'
              onClick={() => setIsOpened(false)}
              size='S'
            >
              {t('reset_customization_modal.cancel_button')}
            </Button>
            <Button
              className='grow'
              colorScheme='danger'
              onClick={resetHandler}
              isLoading={resetMutation.isPending}
              size='S'
            >
              {t('reset_customization_modal.reset_button')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ResetCustomizationModal
