'use client'

import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
import { useEffect } from 'react'
import PageRecoverState from './page-recover-state'
import { useRouter } from 'next/navigation'

export type PageErrorBoundaryProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function PageErrorBoundary({
  error,
  reset,
}: PageErrorBoundaryProps) {
  const router = useRouter()
  const tError = useScopedI18n('common.error')

  useEffect(() => {
    console.error(error)
  }, [error])

  const actions = (
    <div className='flex justify-between gap-3'>
      <Button
        size={'XXS'}
        colorScheme={'secondary'}
        onClick={() => router.push('/')}
      >
        {tError('go_homepage')}
      </Button>
      <Button size={'XXS'} variant={'outlined'} onClick={() => reset()}>
        {tError('try_again')}
      </Button>
    </div>
  )

  return (
    <section className='m-auto'>
      <PageRecoverState
        title={tError('title')}
        description={tError('description')}
        actionButton={actions}
      />
    </section>
  )
}
