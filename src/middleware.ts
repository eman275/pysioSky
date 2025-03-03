//middleware.ts
import { createI18nMiddleware } from 'next-international/middleware'
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  resolveLocaleFromRequest: () => 'ar',
})
const protectedRoutes = [
  'company-details',
  'fleet-details',
  'quotation-list',
  'additional-details',
  'policy-summary',
  'user-account',
]

export default async function middleware(req: NextRequest) {
  const session = await auth()
  const { nextUrl } = req

  const isAuthenticated = !!session
  const isProtectedPage = !!protectedRoutes.find((route) =>
    nextUrl.pathname.includes(route)
  )
  const searchParams = req.nextUrl.searchParams
  const from = searchParams.get('from')

  if (isProtectedPage && !isAuthenticated) {
    return NextResponse.redirect(nextUrl.origin)
  }

  if (req.url.includes('/internal-login') && isAuthenticated) {
    return NextResponse.redirect(new URL(String(from || '/'), req.url))
  }

  return I18nMiddleware(req)
}

export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)',
    '/account/:path*',
  ],
}
