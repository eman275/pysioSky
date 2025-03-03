import { LookupModel } from '@/features/fleet-details/fleet-details.types'

export type PolicyItem = {
  policyNumber: string
  quoteReferenceNo: string
  vehicleCount: number
  taxableAmount: number
  vatAmount: number
  totalAmount: number
  isAcknowledged: boolean
}
export type PolicyDetails = {
  reference: string
  insuranceCompany: LookupModel
  entity: {
    name: string
    crNumber: number
    crExpiryDate: string
  }
  effectiveDate: string
  expiryDate: string
  isExpired: boolean
  taxableAmount: number
  vatAmount: number
  totalAmount: number
  vatPercentage: string
  payment: {
    merchantTransactionId: string
    method: LookupModel
  }
  status: number
  isAcknowledged: boolean
  totalVehicleCount: number
  tplDetails: PolicyItem
  compDetails: PolicyItem
}

export type PoliciesResponse = {
  details: PolicyDetails
  correlationId: string
}
