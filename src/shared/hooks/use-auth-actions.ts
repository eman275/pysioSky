'use client'
import { signIn as nextSignIn } from 'next-auth/react'
import { env } from 'next-runtime-env'
import { usePathname, useRouter } from 'next/navigation'

type LoginParams = {
  postLoginRedirectionUrl?: string
}
export default function useAuthActions() {
  const router = useRouter()
  const pathname = usePathname()
  const isLocalEnv = env('NEXT_PUBLIC_APP_ENV') === 'local'
  const signIn = async (params?: LoginParams) => {
    const { postLoginRedirectionUrl } = params ?? {}
    const url = await nextSignIn('duende-identity-server6', {
      callbackUrl: '/post-login-loading',
    })

    if (!url) return

    if (isLocalEnv) {
      window.location.href = url as unknown as string
    } else {
      const searchParams = new URLSearchParams({
        url: url as unknown as string,
        ...(postLoginRedirectionUrl && {
          postLoginRedirectionUrl,
        }),

        from: pathname,
      })
      router.push(`/internal-login?${searchParams}`)
    }
  }

  const signOut = () => {
    window.location.href = '/api/auth/app-logout'
  }

  return {
    signIn,
    signOut: signOut,
  }
}
