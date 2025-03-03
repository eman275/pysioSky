'use client'
import LoginIframe from '@/shared/components/login-iframe'
import LoginModal from '@/shared/components/login-modal'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react'
type SearchParamsContract = Pick<
  ComponentProps<typeof LoginIframe>,
  'searchParams'
>['searchParams']

function InternalLoginPageParallelModal() {
  const urlParams = useSearchParams()
  const searchParams = Object.fromEntries(
    urlParams.entries()
  ) as SearchParamsContract
  const router = useRouter()
  const session = useSession()
  const pathname = usePathname()
  const sessionStatus = session?.status
  const [isLoading, setIsLoading] = useState(true)
  const clientQs = useClientQueryString()
  const prevAppRef = useRef<string>('')
  const redirectionUriRef = useRef<string>('')

  prevAppRef.current = clientQs.getByKey('applicationReference') ?? ''
  redirectionUriRef.current = clientQs.getByKey('postLoginRedirectionUrl') ?? ''

  const isInternalLogin = pathname.includes('internal-login')

  const navigateToPrevPage = useCallback(() => {
    const isInvalidAppRef =
      prevAppRef.current === 'null' || !Boolean(prevAppRef.current)

    router.replace(
      `/?${new URLSearchParams({
        ...(!isInvalidAppRef && {
          applicationReference: prevAppRef.current,
        }),
      })}`
    )
  }, [router])

  const navigateToPostLoginUrl = useCallback(() => {
    router.push(redirectionUriRef.current || '/')
  }, [router])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsLoading(true)
      navigateToPrevPage()
    }
  }

  useEffect(() => {
    if (sessionStatus === 'loading') {
      setIsLoading(true)
    }

    if (sessionStatus === 'authenticated') {
      if (prevAppRef.current) {
        navigateToPostLoginUrl()
      }
    }
  }, [navigateToPostLoginUrl, sessionStatus])

  if (!isInternalLogin || sessionStatus !== 'unauthenticated') return null

  return (
    <LoginModal
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      onOpenChange={handleOpenChange}
      searchParams={searchParams}
    />
  )
}

export default InternalLoginPageParallelModal
