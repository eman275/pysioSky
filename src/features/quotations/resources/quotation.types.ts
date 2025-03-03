import { LookupModel } from '@/features/fleet-details/fleet-details.types'
import { SelectOptionContract } from '@/shared/components/ui/select/common'

export enum REPAIR_METHOD_TYPE_ENUM {
  AGENCY = 1,
  WORKSHOP = 2,
}

export type GetQuotesStreamPayload = {
  quoteRequestReference: string
  canStream?: boolean
  canStreamForSeconds?: number
}

export type Feature = {
  id: number
  nameEnglish: string
  nameArabic: string
  imageUrl: string | null
  isPaid: boolean
  descriptionEnglish: string
  descriptionArabic: string
  taxableAmount: number
  vatAmount: number
  totalAmount: number
}

export type QuoteDetails = {
  reference: string
  isModified: boolean
  hasDiscounts: boolean
  discountsTotalPercentage: number
  discountsTotalAmount: number
  vatPercentage: number
  hasCustomizations: boolean
  originalTotalAmount: number
  taxableAmount: number
  vatAmount: number
  totalAmount: number
  tplDetails: {
    reference: string
    vehicleCount: number
    taxableAmount: number
    features: Feature[]
  } | null
  compDetails: {
    reference: string
    vehicleCount: number
    taxableAmount: number
    features: Feature[]
  } | null
}

export type QuotesStreamData = {
  reference: string
  receivedOn: string
  insuranceCompany: LookupModel
  subQuotes: QuoteDetails[]
}

export type GetQuotesStreamResponse = {
  isStreamComplete: boolean
  data: Record<string, QuotesStreamData>
}

export type COMPPremium = {
  reference: string
  taxableAmount: number
  vatAmount: number
  totalAmount: number
  repairMethod: number
  isUserSelected: boolean
  isDefault: boolean
}

export type Deductible = {
  amount: number
  referenceNo: string
  isUserSelected: boolean
  agencyPremium: COMPPremium | null
  workshopPremium: COMPPremium | null
}

export type COMPVehicle = {
  reference: string
  vehicleUniqueType: number
  vehicleIdentifier: number
  isOwnershipTransfer: number
  manufactureYear: number
  make: Omit<LookupModel, 'order'>
  model: Omit<LookupModel, 'order'>
  bodyType: Omit<LookupModel, 'order'>
  plateDetails: {
    firstPlateLetter: Omit<LookupModel, 'order'>
    secondPlateLetter: Omit<LookupModel, 'order'>
    thirdPlateLetter: Omit<LookupModel, 'order'>
    plateNumber: string
  }
  vehicleEstimatedValue: number
  insuranceType: number
  isEstimatedValueModified: boolean
  isInsuranceTypeModified: boolean
  vehicleVin: string
  totalLossPercentage: number
  maxLiability: number
  deductibles: Deductible[]
}

export type COMPDetails = {
  reference: string
  premium: null
  vehicleCount: number
  features: Feature[]
  vehicles: COMPVehicle[]
}

export type TPLVehicle = {
  reference: string
  vehicleUniqueType: number
  vehicleIdentifier: number
  isOwnershipTransfer: number
  manufactureYear: number
  make: Omit<LookupModel, 'order'>
  model: Omit<LookupModel, 'order'>
  bodyType: Omit<LookupModel, 'order'>
  plateDetails: {
    firstPlateLetter: Omit<LookupModel, 'order'>
    secondPlateLetter: Omit<LookupModel, 'order'>
    thirdPlateLetter: Omit<LookupModel, 'order'>
    plateNumber: string
  }
  vehicleEstimatedValue: number
  insuranceType: number
  isEstimatedValueModified: boolean
  isInsuranceTypeModified: boolean
  vehicleVin: string
  deductibles: null
  totalLossPercentage: number
  maxLiability: number
}
export type TPLDetails = {
  reference: string
  vehicleCount: number
  vehicles: TPLVehicle[]
  features: Feature[]
  taxableAmount: number
  vatAmount: number
  totalAmount: number
}

export type SingleQuoteResponse = {
  quote: {
    reference: string
    receivedOn: string
    insuranceCompany: LookupModel
    subQuotes: {
      reference: string
      policyEffectiveDate: string
      policyExpiryDate: string
      compDetails: COMPDetails | null
      tplDetails: TPLDetails | null
      vatPercentage: number
      isModified: boolean
      originalTotalAmount: number
    }[]
  }
}

export type DeductibleOption = SelectOptionContract & {
  vehicleRef: string
  taxableAmount: number
  vatAmount: number
  totalAmount: number
  isSelected: boolean
  isModified: boolean
}
export type DeductibleOptionRecord = Record<
  string,
  {
    currentSelected: string | null
    workshopOptions: DeductibleOption[]
    agencyOptions: DeductibleOption[]
  }
>
export type SingleQuoteStoreState = {
  vatPercentage: number
  tplCount: number
  compCount: number
  originalTotalAmount: number
  totalDeductibleAmount: number
  totalCompTaxableAmount: number
  totalCompVatAmount: number
  totalTplTaxableAmount: number
  totalTplVatAmount: number
  totalVatAmount: number
  agencyVehicleCount: number
  workshopVehicleCount: number
  isModified: boolean
  deductibles: DeductibleOptionRecord
  compFeatures: Feature[]
  tplFeatures: Feature[]
  compVehicles: COMPVehicle[] | undefined
  tplDetails: TPLDetails | null | undefined
  insuranceCompany: LookupModel | null
  policyEffectiveDate: string | undefined
  policyExpiryDate: string | undefined
  didSetDeductiblesOnce: boolean
  wasInvalidating: boolean
}

export type SingleQuoteStoreMethods = {
  setQuoteData: (data: Partial<SingleQuoteStoreState>) => void
  updateDeductibles: (vehicleRef: string, deductibleReference: string) => void
  setDidSetDeductiblesOnce(value: boolean): void
  setWasInvalidating(value: boolean): void
}
