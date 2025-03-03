export type OwnerDetailsViewModal = {
  name: string
  id: string
  nationalId: string
  blocked?: boolean
}

export type CrOwnerContract = {
  name: string
  identityNumber: string
  ownerReference: string
  correlationId: string
  isBlocked: boolean
  blockedFrom: string
  blockedTo: string
  blockDurationMinutes: number
}
