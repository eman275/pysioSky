type PartyDetails = {
  reference: string
  identityNumber: string
  maritalStatus: string
  dateOfBirthMonth: number
  dateOfBirthYear: number
  role: number
}
export type UpdatePersonalDetailsPayload = Omit<
  PartyDetails,
  'reference' | 'maritalStatus'
>[]

type UpdatePartyDetailsResponse = PartyDetails

export type UpdatePersonalDetailsResponse = {
  status: string
  parties: UpdatePartyDetailsResponse[]
}
