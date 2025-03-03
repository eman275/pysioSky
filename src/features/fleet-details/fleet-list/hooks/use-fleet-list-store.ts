import { VehicleItem } from '../../fleet-details.types'
import { create } from 'zustand'

export type Content =
  | 'edit-vehicle'
  | 'delete-vehicle'
  | 'fix-vehicle'
  | 'can-not-proceed'
  | 'selection-warning'
  | 'edit-vehicles'
  | 'delete-vehicles'
  | 'add-vehicle'
  | 'delete-and-proceed'
  | 'previous-quote-list-exist'
  | ''

interface FleetState {
  activeContent: Content
  checkedList: string[]
  checkAll: boolean
  totalErrors: number
  isOpened: boolean
  clickedItem: VehicleItem | null
  vehiclesList: VehicleItem[]
  selectedItems: VehicleItem[]
  setActiveContent: (content: Content) => void
  handleCheckListChange: (applicationVehicleReference?: string) => void
  toggleDialog: (isOpened: boolean) => void
  setVehiclesList: (items: VehicleItem[], totalErrors: number) => void
  setClickedItem: (applicationVehicleReference: string) => void
  resetStore: () => void
  resetSelectedItems: () => void
}

const useFleetListStore = create<FleetState>((set, get) => ({
  activeContent: '',
  checkedList: [],
  checkAll: false,
  totalErrors: 0,
  clickedItem: null,
  isOpened: false,
  vehiclesList: [],
  selectedItems: [],
  setActiveContent: (content) => set({ activeContent: content }),
  handleCheckListChange: (applicationVehicleReference) => {
    const { vehiclesList, checkedList } = get()
    let newCheckedList: string[] = []

    if (applicationVehicleReference) {
      newCheckedList = checkedList.includes(applicationVehicleReference)
        ? checkedList.filter((item) => item !== applicationVehicleReference)
        : [...checkedList, applicationVehicleReference]
    } else {
      newCheckedList =
        checkedList.length === vehiclesList.length
          ? []
          : vehiclesList
              .map((item) => item.applicationVehicleReference)
              .filter(
                (reference): reference is string => reference !== undefined
              )
    }

    const newSelectedItems = vehiclesList.filter((item) =>
      newCheckedList.includes(item.applicationVehicleReference)
    )

    set({
      checkedList: newCheckedList,
      checkAll: newCheckedList.length === vehiclesList.length,
      selectedItems: newSelectedItems,
    })
  },
  toggleDialog: (isOpened) => {
    set({ isOpened })
    if (!isOpened) {
      set({ clickedItem: null })
    }
  },

  setVehiclesList: (items, totalErrors) => {
    const { checkedList } = get()
    const newSelectedItems = items.filter((item) =>
      checkedList.includes(item.applicationVehicleReference)
    )

    set({
      checkAll: false,
      totalErrors,
      checkedList: [],
      vehiclesList: items,
      selectedItems: newSelectedItems,
    })
  },
  setClickedItem: (ref) => {
    const { vehiclesList } = get()
    const clicked = vehiclesList.filter(
      (item) => item.applicationVehicleReference === ref
    )
    set({ clickedItem: clicked[0] })
  },
  resetStore: () => {
    set({
      activeContent: '',
      checkedList: [],
      checkAll: false,
      totalErrors: 0,
      clickedItem: null,
      isOpened: false,
      vehiclesList: [],
      selectedItems: [],
    })
  },
  resetSelectedItems: () => {
    set({
      selectedItems: [],
      checkedList: [],
    })
  },
}))

export default useFleetListStore
