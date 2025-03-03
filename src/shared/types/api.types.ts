import { ErrorCodeKey } from '../lib/constants'

export type FetchError = {
  traceId: number
  errorCode: ErrorCodeKey
  errors: string[]
}
