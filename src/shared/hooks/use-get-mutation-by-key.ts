import { MutationKey, MutationState } from '@tanstack/query-core'
import { useMutationState } from '@tanstack/react-query'

function useGetMutationByKey(
  mutationKey: MutationKey
): MutationState | undefined {
  const [mutation] = useMutationState({ filters: { mutationKey } })
  return mutation
}

export default useGetMutationByKey
