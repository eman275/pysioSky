export type SearchParamKeys =
  | 'form-mode'
  | 'pageNumber'
  | 'action'
  | 'subQuote'
  | 'quote'
  | 'active-tab'
  | 'refId'
  | 'status'
  | 'policy-status'
  | 'applicationReference'
  | 'postLoginRedirectionUrl'
  | 'postLinkingRedirectionUrl'
  | 'auto'

export type AppParams = {
  crNumber: string
  entityId: string
  correlationId: string
  smeApplicationReference: string
  quoteRequestReference: string
  quoteReference: string
  refId: string
}
