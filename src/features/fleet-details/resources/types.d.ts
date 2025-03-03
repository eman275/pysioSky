export type MetaData = {
  pageIndex: number
  pageSize: number
  pageCount: number
  totalCount: number
  isOutOfRange: boolean
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
}

export interface CreateVehicleManuallyPayload {
  applicationReference: string
  correlationId: string
  vehicles: Vehicles[]
}
