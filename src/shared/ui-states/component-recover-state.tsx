import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import { RefreshCw } from 'lucide-react'

type Props = {
  message?: string
  isRetrying?: boolean
  retry?: () => void
}
const ComponentRecoverState = ({ message, retry, isRetrying }: Props) => {
  const t = useScopedI18n('common.words')
  return (
    <div className='flex items-center gap-1 text-error-6'>
      <span>{message}</span>
      <Button
        onClick={retry}
        variant='text'
        endIcon={<RefreshCw className={cn(isRetrying && 'animate-spin')} />}
      >
        {t('retry')}
      </Button>
    </div>
  )
}

export default ComponentRecoverState
