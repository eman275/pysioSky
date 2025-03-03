export const APPLICATION_URL = 'sme-application'

export const generatePublicPaths = () => {
  return {
    HOME: '/',
  }
}

type Args = {
  crNumber?: string
  entityReference?: string
  correlationId?: string
  applicationReference?: string
  pageNumber?: number
  quoteRequestReference?: string
  quoteReference?: string
  paymentStatus?: boolean
  invoiceReference?: string
}

export const generateAppPath = ({
  crNumber,
  entityReference,
  correlationId,
  applicationReference,
  quoteRequestReference,
  quoteReference,
  pageNumber = 1,
  paymentStatus = false,
  invoiceReference,
}: Args) => {
  const SME_URL = `${APPLICATION_URL}/${crNumber}/${entityReference}/${correlationId}`
  const COMPANY_DETAILS_URL = `${SME_URL}/company-details`
  const COMPANY_BASIC_URL = `/${COMPANY_DETAILS_URL}/basic-details`
  const ADDITIONAL_DETAILS_URL = `/${COMPANY_DETAILS_URL}/additional-details`
  const FLEET_DETAILS_URL = `${SME_URL}/${applicationReference}/fleet-details`
  const SELECTED_METHOD = `/${FLEET_DETAILS_URL}/select-method`
  const INSERT_YOUR_FLEET_DETAILS_URL = `/${FLEET_DETAILS_URL}/insert-your-fleet-details?pageNumber=${pageNumber}`
  const QUOTATION_LIST_URL = `/${SME_URL}/${applicationReference}/${quoteRequestReference}/quotes/quotation-list`
  const QUOTE_CUSTOMIZATION_URL = `/${SME_URL}/${applicationReference}/${quoteRequestReference}/${quoteReference}/quotes/quotes-customization`
  const QUOTE_ADDITIONAL_DETAILS_URL = `/${SME_URL}/${applicationReference}/${quoteRequestReference}/${quoteReference}/additional-details`
  const POLICY_SUMMARY_URL = `/${SME_URL}/${applicationReference}/${quoteRequestReference}/${quoteReference}/policy-summary${
    paymentStatus ? '?status=failed' : ''
  }`
  const POLICY_SUCCESS = `/${invoiceReference}/thank-you`

  return {
    COMPANY_BASIC_URL,
    SELECTED_METHOD,
    ADDITIONAL_DETAILS_URL,
    INSERT_YOUR_FLEET_DETAILS_URL,
    QUOTATION_LIST_URL,
    QUOTE_CUSTOMIZATION_URL,
    QUOTE_ADDITIONAL_DETAILS_URL,
    POLICY_SUMMARY_URL,
    POLICY_SUCCESS,
  } as const
}
