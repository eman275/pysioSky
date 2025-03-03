import { useEffect, useState } from 'react'
type UseFileDownloadParams = {
  data: any
  refetch: () => Promise<any>
  isFetching: boolean
}

export const useFileDownload = ({
  data,
  refetch,
  isFetching,
}: UseFileDownloadParams) => {
  const [downloadRequested, setDownloadRequested] = useState(false)

  useEffect(() => {
    if (data && downloadRequested) {
      const blobUrl = URL.createObjectURL(data.data)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = data.filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(blobUrl)
      setDownloadRequested(false)
    }
  }, [data, downloadRequested])

  const downloadHandler = () => {
    refetch()
    setDownloadRequested(true)
  }

  return {
    downloadHandler,
    isFetching,
  }
}
