import stepper from './stepper.en'
import quoteDetails from './quote-details.en'
import quotations from './quotations.en'
import fleetDetails from './fleet-details.en'
import additionalDetails from './additional-details.en'
import paymentDetails from './payment-details.en'
import applicantDetails from './applicant-details.en'
import companyDetailsEn from './company-details.en'

export default {
  stepper,
  quoteDetails,
  quotations,
  fleetDetails,
  additionalDetails,
  paymentDetails,
  applicantDetails,
  'company-details': companyDetailsEn,
} as const
