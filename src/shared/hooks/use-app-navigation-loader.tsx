import { useAppNavigationState } from './use-app-store'
import useCleanup from './use-cleanup'

export default function useAppNavigationLoader() {
  const { isNavigating, setIsNavigating } = useAppNavigationState()

  useCleanup(() => {
    setIsNavigating(false)
  })

  return { isNavigating, setIsNavigating }
}
