'use client'
import TameeniLoaderOverlay from '@/shared/components/tameeni-loader/tameeni-loader-overlay'
import { useSession } from 'next-auth/react'
import { env } from 'next-runtime-env'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PostLoginLoading() {
  const { status: sessionStatus } = useSession() ?? {}
  const router = useRouter()

  useEffect(() => {
    if (
      sessionStatus === 'authenticated' &&
      env('NEXT_PUBLIC_APP_ENV') === 'local'
    ) {
      router.push('/')
    }
  }, [router, sessionStatus])

  return <TameeniLoaderOverlay transparent={false} />
}
