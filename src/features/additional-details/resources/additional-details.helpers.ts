export const generateGetCrOwnersQueryKey = (
  entityId: string,
  correlationId: string
) => ['company-details', 'cr-owners', 'get', entityId, correlationId]

export const generateEditVatNumberMutationKey = (
  crNumber: string,
  correlationId: string
) => ['company-details', 'VAT', 'edit', crNumber, correlationId]

export const generateVerifyOwnerMutationKey = (correlationId: string) => [
  'company-details',
  'cr-owner',
  'verify',
  correlationId,
]
export const generateSendOtpMutationKey = (correlationId: string) => [
  'otp',
  'send',
  correlationId,
]
export const generateValidateOtpMutationKey = (correlationId: string) => [
  'otp',
  'validate',
  correlationId,
]
