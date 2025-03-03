import landing from './landing'
import common from './common'
import validations from './validations/validations.ar'
import application from './application'
import contactUs from './contact-us/contact-us.ar'
import userAccount from './user-account'
import thankYou from './thank-you/thank-you.ar'
import faq from './faq'

export default {
  landing,
  common,
  validations,
  application,
  userAccount,
  'contact-us': contactUs,
  'thank-you': thankYou,
  faq: faq,
} as const
