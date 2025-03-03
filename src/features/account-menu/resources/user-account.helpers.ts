export const generateAvailableQuotesQueryKey = (pageIndex?: number) => {
  return ['available-quotes', pageIndex].filter(Boolean)
}

export const generateVehicleListQueryKey = (quoteRequestReference?: string) => {
  return ['vehicle-list', quoteRequestReference].filter(Boolean)
}

export const generatePurchasedPoliciesVehicleListQueryKey = (
  policyReference?: string
) => {
  return ['purchased-policies-vehicles-list', policyReference].filter(Boolean)
}
export const generatePurchasedPoliciesQueryKey = (
  pageIndex?: number,
  policyStatus?: string
) => {
  return ['purchased-policies', pageIndex, policyStatus].filter(Boolean)
}

export const generateTermsAndConditionsMutationKey = (
  insuranceCompanyId: number
) => ['terms-and-conditions', insuranceCompanyId].filter(Boolean)

export const generateReceiptsQueryKey = (insuranceCompanyId: string) =>
  ['receipts', insuranceCompanyId].filter(Boolean)

export const generatePolicyPaperQueryKey = (insuranceCompanyId: string) =>
  ['Policy-Paper', insuranceCompanyId].filter(Boolean)
