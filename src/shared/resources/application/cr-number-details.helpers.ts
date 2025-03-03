export const generateGetCrNumberDataMutationKey = () => ['entity', 'mutate-cr']
export const generateGetCrNumberDataQueryKey = (
  crNumber: string
): [string, string, string] => ['entity', 'query-cr', crNumber]
