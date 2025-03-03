type ApplicationDetailsContract = {
  reference: string
  stage: number
  categoryId: number
  paymentFrequencyId: number
  contribution: number
  term: number
  childAge?: number
  approxMaturityAmount: number
  sumCovered: number | null
  deathBenefitOption: number | null
  category: string | null
  paymentFrequencyName: string | null
}

export type PartyDetailContract = {
  identityNumber: string
  reference: string
  firstName: string
  fatherName: string
  middleName: string
  dateOfBirthH: string
  dateOfBirthG: string
  maritalStatus: string
  idIssueDate: string
  idExpiryDate: string
  idIssuePlace: string
  roleId: number
}

export type GetPersonalDetailsResponse = {
  parties: PartyDetailContract[]
  application: ApplicationDetailsContract
}
