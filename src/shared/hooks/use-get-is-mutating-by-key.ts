import { MutationKey } from '@tanstack/query-core'
import { useIsMutating } from '@tanstack/react-query'

function useGetIsMutatingByKey(mutationKey: MutationKey) {
  const isMutating = useIsMutating({ mutationKey })
  return Boolean(isMutating)
}

export default useGetIsMutatingByKey
