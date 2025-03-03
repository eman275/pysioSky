import { create } from 'zustand'

interface UserMenuState {
  activeTab: string
  setActiveTab: (tab: string) => void
  handleTabChange: (tab: string) => void
}

const useUserMenuStore = create<UserMenuState>((set) => ({
  activeTab: 'purchased_policies',
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  handleTabChange: (tab: string) => {
    set({ activeTab: tab })
  },
}))

export default useUserMenuStore
