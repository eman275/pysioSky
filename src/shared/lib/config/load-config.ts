import { env } from 'next-runtime-env'
import * as config from './env'
import { ConfigContract } from './types'

export function loadAppConfig(): ConfigContract {
  const CURRENT_NODE_ENV = env('NEXT_PUBLIC_APP_ENV')
  return (
    config[CURRENT_NODE_ENV as unknown as CustomProcessEnv] ??
    config.development
  )
}
