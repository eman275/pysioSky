import useClientApi from '@/shared/hooks/use-client-api'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { generateEntitySizeQueryKey } from './additional-details.helpers'

export type EntitySizeLookupResponse = {
  id: number
  nameEnglish: string
  nameArabic: string
  order: number
  imageUrl: string | null
}

export const useEntitySizeLookUpQuery = () => {
  const { API } = useClientApi()

  const entitySizeRequest = async () => {
    const response = await API.get<EntitySizeLookupResponse[]>(
      `/api/lookups/entity-size`
    )
    return response.data
  }

  return useAppQuery({
    queryKey: generateEntitySizeQueryKey(),
    queryFn: entitySizeRequest,
  })
}
