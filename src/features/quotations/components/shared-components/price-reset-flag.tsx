import { Button } from '@/shared/components/ui/button'
import ResetIcon from '@/shared/components/icons/reset-btn.svg'
import { useScopedI18n } from '@/shared/locales/client'
import ResetCustomizationModal from './reset-customization-modal'
import useDisclosure from '@/shared/hooks/use-disclosure'

type Props = {
  subQuoteReference?: string
}

const PriceResetFlag = ({ subQuoteReference }: Props) => {
  const t = useScopedI18n('application.quotations')
  const { isOpened, setIsOpened } = useDisclosure()

  const resetHandler = () => {
    setIsOpened(true)
  }

  return (
    <>
      <div className='flex items-center justify-between rounded bg-primary-1 px-[6px]'>
        <div className='text-xxs'>{t('per_your_customization')}</div>
        <Button
          className='flex items-center p-0'
          variant='text'
          size='XXS'
          startIcon={<ResetIcon />}
          onClick={resetHandler}
        >
          {t('reset')}
        </Button>
      </div>

      <ResetCustomizationModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        subQuoteRef={subQuoteReference as string}
      />
    </>
  )
}

export default PriceResetFlag
