import { AppParams } from '@/shared/types/routing.types'
import { useParams } from 'next/navigation'

function useAppParam(): Omit<
  AppParams,
  'smeApplicationReference' | 'entityId'
> & {
  applicationReference: string
  entityReference: string
} {
  const params = useParams<AppParams>()

  return {
    applicationReference: params?.smeApplicationReference ?? '',
    correlationId: params?.correlationId ?? '',
    crNumber: params?.crNumber ?? '',
    entityReference: params?.entityId ?? '',
    quoteRequestReference: params?.quoteRequestReference ?? '',
    quoteReference: params?.quoteReference ?? '',
    refId: params?.refId ?? '',
  }
}

export default useAppParam
