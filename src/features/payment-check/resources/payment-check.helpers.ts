export const generatePaymentCheckQueryKey = (paymentReference: string) => [
  'payment',
  'refId',
  paymentReference,
]
