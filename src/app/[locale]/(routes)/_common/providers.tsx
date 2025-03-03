'use client'

import { convertToMilliseconds } from '@/shared/lib/utils'
import { I18nProviderClient, useCurrentLocale } from '@/shared/locales/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useRouter } from 'next/navigation'

export default function Providers({ children }: { children: React.ReactNode }) {
  const locale = useCurrentLocale()
  const { prefetch } = useRouter()

  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: convertToMilliseconds(5, 'minutes'),
        },
      },
    })
  )

  // prefetch login page
  useEffect(() => {
    prefetch('/internal-login')
  }, [prefetch])

  return (
    <QueryClientProvider client={client}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <I18nProviderClient locale={locale}>
        <SessionProvider>{children}</SessionProvider>
      </I18nProviderClient>
    </QueryClientProvider>
  )
}
