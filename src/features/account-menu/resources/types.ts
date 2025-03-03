import {
  LookupModel,
  PlateDetailsContract,
  Vehicle,
} from '@/features/fleet-details/fleet-details.types'
import { EntityAddressDetails } from '@/shared/resources/application/cr-number.mutation'

export type AvailableQuoteType = {
  reference: string
  code: string | null
  applicationReference: string
  entityId: string
  entityCrNumber: string
  createdOn: string
  expiresOn: string
  expiresInSeconds: number
  policyEffectiveDate: string
  quotesCount: number
  compVehiclesCount: number
  tplVehiclesCount: number
  totalVehicleCount: number
}

export type InsuranceCompanyType = {
  id: number
  nameEnglish: string
  nameArabic: string
  imageUrl: string
}

export type EntityType = {
  name: string
  crNumber: number
  crExpiryDate: string
  address: EntityAddressDetails | null | undefined
}

export type VehicleDetailsType = {
  policyNumber: string
  quoteReferenceNo: string
  vehicleCount: number
  taxableAmount: number
  vatAmount: number
  totalAmount: number
  isAcknowledged: boolean
}

export type PurchasedPoliciesType = {
  reference: string
  insuranceCompany: InsuranceCompanyType
  entity: EntityType
  effectiveDate: string
  expiryDate: string
  isExpired: boolean
  taxableAmount: number
  vatAmount: number
  totalAmount: number
  paymentMerchantReference: string
  status: number
  isAcknowledged: boolean
  totalVehicleCount: number
  tplDetails: VehicleDetailsType | null
  compDetails: VehicleDetailsType | null
}

export type QuoteDetails = {
  reference: string
  code: string
  createdOn: string
  expiresOn: string
  expiresInSeconds: number
  tplVehicleCount: number
  compVehicleCount: number
  totalVehicleCount: number
  quotesCount: number
  tplVehicles: Vehicle[]
  compVehicles: Vehicle[]
}

export type Deductible = {
  deductibleAmount: number
  repairMethod: number
}

export type PoliciesVehicleType = {
  vehicleUniqueType: number
  vehicleIdentifier: number
  manufactureYear: number
  make: Omit<LookupModel, 'order'>
  model: Omit<LookupModel, 'order'>
  bodyType: Omit<LookupModel, 'order'>
  plateDetails: PlateDetailsContract | null
  vehicleEstimatedValue: number
  insuranceType: number
  reference: string
  isEstimatedValueModified: boolean
  isInsuranceTypeModified: boolean
  deductible: Deductible | null
}
