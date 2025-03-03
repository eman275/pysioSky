import { create } from 'zustand'

export type Content =
  | 'can-not-proceed'
  | 'cr-owner-mobile-number'
  | 'exceeded-available-attempts'
  | 'mobile-number-id-mismatch'
  | 'otp-verification'
  | 'verification-service-down-error'
  | ''

type SelectedData = {
  vatNumber?: string
  ownerReference?: string
  otpReference?: string
  ownerNationalId?: string
  ownerPhoneNumber?: string
  otpExpirationInSeconds?: number
}

interface FleetState {
  selectedDetails: SelectedData | null
  activeContent: Content
  isOpened: boolean
  setSelectedDetails: (data: SelectedData | null) => void
  setActiveContent: (content: Content) => void
  toggleDialog: (isOpened: boolean) => void
  resetStore: () => void
}

const useAdditionalDetailsStore = create<FleetState>((set) => ({
  activeContent: '',
  isOpened: false,
  selectedDetails: null,

  setSelectedDetails(data = {}) {
    set((state) => ({ selectedDetails: { ...state.selectedDetails, ...data } }))
  },

  setActiveContent: (content) =>
    set({ activeContent: content, isOpened: true }),

  toggleDialog: (isOpened) =>
    set((state) => ({
      isOpened,
      activeContent: !isOpened ? '' : state.activeContent,
    })),

  resetStore: () =>
    set({ activeContent: '', isOpened: false, selectedDetails: null }),
}))

export default useAdditionalDetailsStore
