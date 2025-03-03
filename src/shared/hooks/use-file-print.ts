import { useReceiptLookUpQuery } from '@/features/account-menu/resources/receipts.query'
import { useEffect, useState } from 'react'

export const useFilePrint = (refId: string) => {
  const { data, refetch, isFetching } = useReceiptLookUpQuery(refId)
  const [printRequested, setPrintRequested] = useState(false)

  useEffect(() => {
    let blobUrl: string | null = null

    if (data && printRequested) {
      blobUrl = URL.createObjectURL(data.data)
      const printWindow = window.open(blobUrl)
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.focus()
        }
      }

      setPrintRequested(false)
    }

    return () => {
      // Clean up the object URL on unmount or after viewing
      if (blobUrl) URL.revokeObjectURL(blobUrl)
    }
  }, [data, printRequested])

  const printHandler = () => {
    refetch()
    setPrintRequested(true)
  }

  return {
    printHandler,
    isFetching,
  }
}
