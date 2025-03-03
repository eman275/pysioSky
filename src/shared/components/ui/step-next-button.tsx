import SVGarrow from '@/shared/components/icons/right-arrow.svg'
import { cn } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import { Button } from './button'

type ButtonCustomProps = {
  label?: string
}

export default function StepNextButton({
  className,
  label,
  isLoading,
  ...props
}: React.ComponentProps<typeof Button> & ButtonCustomProps) {
  const tCommon = useScopedI18n('common.words')
  return (
    <Button
      isLoading={isLoading}
      size={'L'}
      endIcon={
        <div className='rtl:rotate-180'>
          <SVGarrow className='h-6 w-6' />
        </div>
      }
      variant={'solid'}
      colorScheme={'secondary'}
      type='submit'
      className={cn(
        'ms-auto mt-6 flex w-2/5 items-center justify-between md:w-60',
        className
      )}
      {...props}
    >
      {label ? label : tCommon('next')}
    </Button>
  )
}
