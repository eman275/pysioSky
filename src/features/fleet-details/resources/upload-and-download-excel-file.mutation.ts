import useAppParam from '@/shared/hooks/use-app-params'
import useClientApi from '@/shared/hooks/use-client-api'
import useTrackRequestProgress from '@/shared/hooks/use-track-request-progress'
import useAppMutation from '@/shared/lib/helpers/resources/use-app-mutation'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { useQueryClient } from '@tanstack/react-query'
import {
  generateDownloadExcelFileQueryKey,
  generateUploadExcelFileQueryKey,
  generateVehiclesListQueryKey,
} from './fleet-details.helpers'

export interface UploadExcelPayload {
  file: File
  signal: AbortSignal
  reset?: boolean
}
export interface UploadExcelResponse {
  applicationReference: string
  file: File
  correlationId: string
  signal: AbortSignal
}

export const useDownloadExcelTemplateQuery = () => {
  const { API } = useClientApi()

  const downloadExcelTemplateRequest = async () => {
    const response = await API.get(`/api/download/vehicle-upload-template`, {
      headers: {
        accept: 'application/octet-stream',
      },
      responseType: 'blob',
    })
    const filename = 'VehicleUploadTemplate.xlsx'

    return { data: response.data, filename }
  }

  return useAppQuery({
    queryKey: generateDownloadExcelFileQueryKey(),
    queryFn: downloadExcelTemplateRequest,
    enabled: false,
  })
}

export const useUploadExcelMutation = () => {
  const { API } = useClientApi()
  const { onUploadProgress, progress } = useTrackRequestProgress()
  const queryClient = useQueryClient()
  const { correlationId, applicationReference } = useAppParam()

  const uploadExcelRequest = async ({
    file,
    signal,
    reset = false,
  }: UploadExcelPayload): Promise<UploadExcelResponse> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('applicationReference', applicationReference)
    formData.append('correlationId', correlationId)
    formData.append('reset', reset ? 'true' : 'false')

    const response = await API.post<UploadExcelResponse>(
      `/api/application-vehicles/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal,

        onUploadProgress,
      }
    )
    return response.data
  }

  return {
    mutation: useAppMutation({
      mutationKey: generateUploadExcelFileQueryKey(),
      mutationFn: uploadExcelRequest,
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: generateVehiclesListQueryKey(),
        })
      },
    }),
    progress,
  }
}
