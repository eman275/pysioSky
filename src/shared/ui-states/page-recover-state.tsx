import NoDataIcon from '@/shared/components/icons/no-data.svg'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription } from '@/shared/components/ui/card'
import { useScopedI18n } from '@/shared/locales/client'
import { ReactNode } from 'react'

type Props = {
  title?: string
  description?: string
  actionButton?: ReactNode
  retry?: () => void
  isLoading?: boolean
}
const PageRecoverState = ({
  title,
  retry,
  description,
  actionButton,
  isLoading,
}: Props) => {
  const tError = useScopedI18n('common.error')
  return (
    <Card className='flex-center relative my-4 flex min-h-32 border-none bg-transparent lg:min-h-80'>
      <CardContent className='flex w-full flex-col items-center justify-center gap-3'>
        <NoDataIcon width='97' height='59' />
        <CardDescription className='flex flex-col items-center gap-1 text-xs'>
          <b>{title ?? tError('failed_to_load_data')}</b>
          <span className='text-neutral-5'>
            {description ?? tError('your_request_failed')}
          </span>
        </CardDescription>
        {actionButton ?? (
          <Button
            type='button'
            onClick={retry}
            colorScheme='secondary'
            size='XS'
            className='min-w-[75px]'
            isLoading={isLoading}
          >
            {tError('try_again')}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default PageRecoverState
