export type ConfigContract = {
  API_BASE_URL: string
  FRESH_CHAT_TOKEN: string
  FRESH_CHAT_HOST: string
  FRESH_CHAT_SITE_ID: string
  FRESH_CHAT_SCRIPT_URL: string
  QUOTE_REFETCH_INTERVAL_SEC: number
  MAX_QUOTE_REFETCH_COUNT: number

  // auth
  IDENTITY_CLIENT_ID: string
  IDENTITY_AUTHORITY_URL: string
  IDENTITY_REDIRECT_URI: string
  client_secret: string
  SESSION_MAX_AGE: number
}
