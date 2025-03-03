import '@/app/globals.css'
// import { Footer } from '@/shared/components/layout/footer/footer'
import { Header } from '@/shared/components/layout/header'
import Providers from '@/routes/_common/providers'
import { AppParams } from '@/shared/types//routing.types'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import WhatsAppButton from '@/shared/components/layout/WhatsApp-btn'
export const metadata: Metadata = {
  title: 'PhysioSky ',
  description: 'physiotherapy clinic website ',
}
type PageProps = {
  children: React.ReactNode
  params: { locale: string } & AppParams
}

export default function RootLayout({ children, params }: PageProps) {
  const { locale } = params

  return (
    <html
      className='h-full'
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <head>{/* <PublicEnvScript /> */}</head>
      <body className='font-cairo flex h-full flex-col text-base text-base-black'>
        {/* uncomment it if you want to remove the browser native event source to test the not supported sse browsers  */}
        {/* <script type='text/javascript'>window.EventSource = undefined</script> */}
        <Providers>
          {/* <Nav/> */}
          <Header />
          <main className='flex-1'>
            {children}
            <Toaster
              richColors
              closeButton
              toastOptions={{
                className: 'capitalize',
                descriptionClassName: 'lowercase first-letter:capitalize',
              }}
              position={locale === 'ar' ? 'bottom-left' : 'bottom-right'}
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
              visibleToasts={1}
            />
          </main>
          {/* <Footer /> */}
        </Providers>
        <WhatsAppButton />
        {/* <Scripts /> */}
      </body>
    </html>
  )
}
