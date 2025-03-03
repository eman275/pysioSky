import NextAuth, { type DefaultSession } from 'next-auth'
import DuendeIDS6Provider from 'next-auth/providers/duende-identity-server6'
import { loadAppConfig } from './shared/lib/config/load-config'

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id_token: string

    user: {
      /** The user's postal address. */
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
      access_token: string
      username: string
      identity_number: string
    } & DefaultSession['user']
  }

  interface Profile {
    iss: string
    nbf: number
    iat: number
    exp: number
    aud: string
    at_hash: string
    sid: string
    auth_time: number
    idp: string
    LoginType: string
    UserName: string
    IdentityNumber: string
    TahaqaqVerificationDate: string
    MigratedUserId: string
    CreatedOn: string
    EmailConfirmed: 'True' | 'False'
  }

  interface Account {
    access_token: string
  }
}

const config = loadAppConfig()

export const { handlers, signIn, signOut, auth } = NextAuth((req) => {
  const referrerUrl = req?.headers.get('referer')
  const locale =
    referrerUrl?.includes('/ar/') || referrerUrl?.endsWith('/ar') ? 'ar' : 'en'

  return {
    secret: process.env.AUTH_SECRET ?? 'secret',
    session: {
      maxAge: config.SESSION_MAX_AGE,
    },
    providers: [
      DuendeIDS6Provider({
        clientId: config.IDENTITY_CLIENT_ID,
        clientSecret: config.client_secret,
        issuer: config.IDENTITY_AUTHORITY_URL,
        wellKnown: `${config.IDENTITY_AUTHORITY_URL}.well-known/openid-configuration`,
        redirectProxyUrl: config.IDENTITY_REDIRECT_URI + '/api/auth',
        checks: ['pkce', 'state'],
        authorization: {
          params: {
            scope: 'openid profile email',
            ui_locales: locale,
          },
        },
      }),
    ],

    callbacks: {
      jwt(jwtParams) {
        const { token, user, account, profile } = jwtParams
        if (account && profile) {
          token.id_token = account.id_token
          token.access_token = account.access_token
          token.username = profile.UserName
          token.identity_number = profile.IdentityNumber
        }

        if (user) {
          token.id = user.id
        }

        return token
      },

      session(sessionParams) {
        const { session, token } = sessionParams

        return {
          ...session,
          id_token: token.id_token,
          user: {
            ...session.user,
            access_token: token.access_token,
            username: token.username,
            identity_number: token.identity_number,
          },
        }
      },
    },
  }
})
