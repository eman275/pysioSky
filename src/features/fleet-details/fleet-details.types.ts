import { VehicleErrorCodeKey } from '@/shared/lib/constants'

export interface PlateDetailsContract {
  firstPlateLetter: Omit<LookupModel, 'order'>
  secondPlateLetter: Omit<LookupModel, 'order'>
  thirdPlateLetter: Omit<LookupModel, 'order'>
  plateNumber: string
}

export type VehicleError = {
  code: VehicleErrorCodeKey
  message: string
}

export type VehicleItem = {
  applicationVehicleReference: string
  vehicleIdentifier: number
  vehicleUniqueType: number
  manufactureYear: number
  vehicleEstimatedValue: number
  isOwnershipTransfer: boolean
  insuranceType: number
  hasTrailer: boolean
  trailerEstimatedValue: string | null
  repairMethod: number
  make: Omit<LookupModel, 'order'>
  model: Omit<LookupModel, 'order'>
  bodyType: Omit<LookupModel, 'order'>
  plateDetails: PlateDetailsContract | null
  status: boolean
  errors: VehicleError[]
}

export type Vehicle = {
  vehicleUniqueType: number
  vehicleIdentifier: number
  manufactureYear: number
  make: Omit<LookupModel, 'order'>
  model: Omit<LookupModel, 'order'>
  bodyType: Omit<LookupModel, 'order'>
  plateDetails: PlateDetailsContract | null
  vehicleEstimatedValue: number
  insuranceType: number
}

export enum REGISTER_TYPE_ENUM {
  CUSTOM = 2,
  SEQUENCE = 1,
}

export enum PURPOSE_INSURANCE_TYPE_ENUM {
  New_Insurance = 1,
  Ownership_Transfer = 2,
}
export enum INSURANCE_TYPE_ENUM {
  Comprehensive = 2,
  Third_Party = 1,
}

export enum COVERAGE_TYPE {
  TPL = 1,
  COMP = 2,
}

export type InsuranceType =
  (typeof INSURANCE_TYPE_ENUM)[keyof typeof INSURANCE_TYPE_ENUM]

export type InsurancePurposeType =
  (typeof PURPOSE_INSURANCE_TYPE_ENUM)[keyof typeof PURPOSE_INSURANCE_TYPE_ENUM]

export type CoverageType = (typeof COVERAGE_TYPE)[keyof typeof COVERAGE_TYPE]

export interface LookupModel {
  id: number
  nameEnglish: string
  nameArabic: string
  imageUrl?: string
}

export interface plateDetails {
  FirstPlateLetter: LookupModel
  SecondPlateLetter: LookupModel
  ThirdPlateLetter: LookupModel
  PlateNumber: string
}

export type SelectMethodContent =
  | 'how-it-works'
  | 'excel-actions'
  | 'upload-loader'
  | 'file-not-supported'
  | 'upload-error'
  | 'reset-manual'
  | 'reset-excel'
