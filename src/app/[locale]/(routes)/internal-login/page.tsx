'use client'
import LoginIframe from '@/shared/components/login-iframe'
import TameeniLoaderOverlay from '@/shared/components/tameeni-loader/tameeni-loader-overlay'
import { useSession } from 'next-auth/react'
import { ComponentProps } from 'react'

type Props = Pick<ComponentProps<typeof LoginIframe>, 'searchParams'>

const InternalLoginPage = ({ searchParams }: Props) => {
  const { status } = useSession()

  if (status === 'loading') return <TameeniLoaderOverlay />

  return (
    <LoginIframe searchParams={searchParams} className='min-h-screen w-full' />
  )
}

export default InternalLoginPage
