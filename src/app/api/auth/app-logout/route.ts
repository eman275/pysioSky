// /api/auth/federated-logout
import { auth } from '@/auth'
import { loadAppConfig } from '@/shared/lib/config/load-config'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
export async function GET() {
  const config = loadAppConfig()
  const authParams = await auth()
  const token = authParams?.user.access_token
  const idToken = authParams?.id_token
  try {
    if (!token) {
      console.warn('No JWT token found when calling /federated-logout endpoint')
      return NextResponse.redirect(config.IDENTITY_REDIRECT_URI)
    }
    if (!idToken) {
      console.warn(
        "Without an id_token the user won't be redirected back from the IdP after logout."
      )
    }
    // construct end session request (logout)
    const endSessionURL = `${config.IDENTITY_AUTHORITY_URL}connect/endsession`
    const endSessionParams = new URLSearchParams({
      id_token_hint: String(idToken),
    })

    // remove all auth cookies to logout from browser
    cookies()
      .getAll()
      .forEach((cookie) => {
        if (cookie.name.includes('authjs')) {
          cookies().set(cookie.name, '', { maxAge: 0, secure: true })
        }
      })

    // goto identity server to logout
    return NextResponse.redirect(`${endSessionURL}?${endSessionParams}`)
  } catch (error) {
    console.error(error)
    // redirect to home if logout failed
    return NextResponse.redirect(config.IDENTITY_REDIRECT_URI)
  }
}
