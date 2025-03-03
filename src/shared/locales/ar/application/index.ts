import quotations from './quotations.ar'
import fleetDetails from './fleet-details.ar'
import quoteDetails from './quote-details.ar'
import stepper from './stepper.ar'
import additionalDetails from './additional-details.ar'
import paymentDetails from './payment-details.ar'
import applicantDetails from './applicant-details.ar'
import companyDetailsAr from './company-details.ar'

export default {
  stepper,
  quoteDetails,
  quotations,
  fleetDetails,
  additionalDetails,
  paymentDetails,
  applicantDetails,
  'company-details': companyDetailsAr,
} as const
