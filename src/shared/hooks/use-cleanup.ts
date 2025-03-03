import { useEffect } from 'react'

export default function useCleanup(cleanupCallback: () => void) {
  useEffect(() => {
    return () => {
      cleanupCallback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
