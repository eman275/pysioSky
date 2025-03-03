import { create } from 'zustand'

type AppStoreState = {
  isNavigating: boolean
}

type AppStoreActions = {
  setIsNavigating(value: boolean): void
}
const AppStore = create<AppStoreActions & AppStoreState>((set) => ({
  isNavigating: false,
  setIsNavigating(value) {
    set({ isNavigating: value })
  },
}))

export const useAppStore = AppStore

export const useAppNavigationState = () =>
  useAppStore(({ isNavigating, setIsNavigating }) => ({
    isNavigating,
    setIsNavigating,
  }))
