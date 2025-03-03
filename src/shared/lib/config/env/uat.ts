import { ConfigContract } from '../types'

export default {
  API_BASE_URL: 'https://smemotorqc-backend.gettameeni.com/',
  FRESH_CHAT_TOKEN: '0da663a6-12f3-4ce9-9c74-70f6a04a9405',
  FRESH_CHAT_HOST: 'https://tameeni.freshchat.com',
  FRESH_CHAT_SITE_ID: 'MOTOR_SME',
  FRESH_CHAT_SCRIPT_URL: 'https://tameeni.freshchat.com/js/widget.js',
  QUOTE_REFETCH_INTERVAL_SEC: 10,
  MAX_QUOTE_REFETCH_COUNT: 18, // 10 * 18 = 180sec (3 minutes of pulling quotes)

  // auth
  IDENTITY_CLIENT_ID: 'Motor_SME_UAT',
  IDENTITY_AUTHORITY_URL: 'https://idpuat.gettameeni.com/',
  IDENTITY_REDIRECT_URI: 'https://smemotorqc.gettameeni.com',
  client_secret: 'rasan@123',
  SESSION_MAX_AGE: 120 * 60, //120 minutes
} satisfies ConfigContract
