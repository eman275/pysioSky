export const generateTermsAndConditionsMutationKey = (
  insuranceCompanyId: number
) => ['quotations', 'terms-and-conditions', insuranceCompanyId]

export const generateQuotesQueryKey = (quoteId: string) => [
  'quotations',
  'list',
  quoteId,
]

export const generateSingleQuoteQueryKey = (quoteId: string) => [
  'quotations',
  'quote',
  'details',
  quoteId,
]

export const generateQuotesStreamQueryKey = (quoteId: string) => [
  'quotations',
  'stream',
  quoteId,
]

export const generateQuotesExpirationQueryKey = (quoteId: string) => [
  'quotations',
  'expiry',
  quoteId,
]

export const generateCreateQuotesMutationKey = () => ['create-quotations']
export const generateCreateQuotesQueryKey = (quoteRequestReference: string) => [
  'quotations-query',
  quoteRequestReference,
]
export const generateResetQuoteMutationKey = () => ['quote', 'reset']
