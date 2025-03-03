export enum ParentStepNumberEnum {
  Company_Details = 1,
  FLEET_DETAILS = 2,
  QUOTES = 3,
  ADDITIONAL_DETAILS = 4,
  POLICY_SUMMARY = 5,
}

export enum CompanyDetailsStepsNumberEnum {
  BASIC_DETAILS = 1,
  ADDITIONAL_DETAILS = 2,
}
export enum FleetDetailsStepsNumberEnum {
  SELECT_METHOD = 1,
  INSERT_FLEET_DETAILS = 2,
}

export enum QuoteDetailsStepsNumberEnum {
  QUOTATION_LIST = 1,
  SELECT_QUOTE = 2,
}
export enum AdditionalDetailsStepsNumberEnum {
  ADDITIONAL_DETAILS_SECTION = 1,
}
export enum SummaryDetailsStepsEnum {
  POLICY_SUMMARY = 1,
}

export type StepContract = {
  title: string
  index: number
  matchPattern: RegExp
  nestedSteps?: Omit<StepContract, 'nestedSteps'>[]
  goBack?(): void
}
