'use client'
import { AxiosProgressEvent } from 'axios'
import { useState } from 'react'

export default function useTrackRequestProgress() {
  const [progress, setProgress] = useState(0)

  return {
    progress,
    onUploadProgress: (ev: AxiosProgressEvent) => {
      const { loaded, total } = ev
      if (!total) return
      setProgress(Math.round((loaded / total) * 100))
    },
  }
}
