import create from 'zustand'
import {
  SingleQuoteStoreMethods,
  SingleQuoteStoreState,
} from '../../resources/quotation.types'
import {
  calculateTotalsAndCounts,
  updateOptions,
} from '../../quote-customization/helpers'

const initialStore = {
  vatPercentage: 0,
  tplCount: 0,
  compCount: 0,
  originalTotalAmount: 0,
  totalDeductibleAmount: 0,
  totalCompTaxableAmount: 0,
  totalCompVatAmount: 0,
  totalTplTaxableAmount: 0,
  totalTplVatAmount: 0,
  totalVatAmount: 0,
  agencyVehicleCount: 0,
  workshopVehicleCount: 0,
  isModified: false,
  deductibles: {},
  compFeatures: [],
  tplFeatures: [],
  compVehicles: undefined,
  tplDetails: undefined,
  insuranceCompany: null,
  policyEffectiveDate: undefined,
  policyExpiryDate: undefined,
  wasInvalidating: false,
  didSetDeductiblesOnce: false,
} satisfies SingleQuoteStoreState
// Create the Zustand store with initial values
const useSingleQuoteStore = create<
  SingleQuoteStoreState & SingleQuoteStoreMethods
>((set) => ({
  ...initialStore,
  setDidSetDeductiblesOnce(value) {
    set({ didSetDeductiblesOnce: value })
  },
  setWasInvalidating(value) {
    set({ wasInvalidating: value })
  },
  setQuoteData: (data) => {
    set((state) => {
      const updatedDeductibles = data.deductibles || {}
      // calculate totals and counts for deductibles
      const {
        totalCompTaxableAmount,
        totalCompVatAmount,
        agencyVehicleCount,
        workshopVehicleCount,
      } = calculateTotalsAndCounts(updatedDeductibles)

      const totalTplTaxableAmount = data.tplDetails?.taxableAmount ?? 0
      const totalTplVatAmount = data.tplDetails?.vatAmount ?? 0

      return {
        ...state,
        ...data,
        deductibles: updatedDeductibles,
        totalCompTaxableAmount,
        totalCompVatAmount,
        totalTplTaxableAmount,
        totalTplVatAmount,
        totalVatAmount: totalCompVatAmount + totalTplVatAmount,
        totalDeductibleAmount:
          totalCompTaxableAmount +
          totalCompVatAmount +
          totalTplTaxableAmount +
          totalTplVatAmount,
        agencyVehicleCount,
        workshopVehicleCount,
      }
    })
  },

  updateDeductibles: (vehicleRef, deductibleReference) => {
    set((state) => {
      const updatedDeductibles = { ...state.deductibles }
      // update options for the selected deductible to recalculate totals and counts
      if (updatedDeductibles[vehicleRef]) {
        updatedDeductibles[vehicleRef] = {
          currentSelected: deductibleReference,
          workshopOptions: updateOptions(
            updatedDeductibles[vehicleRef].workshopOptions,
            deductibleReference
          ),
          agencyOptions: updateOptions(
            updatedDeductibles[vehicleRef].agencyOptions,
            deductibleReference
          ),
        }
      }
      // calculate totals and counts for all deductibles
      const {
        totalCompTaxableAmount,
        totalCompVatAmount,
        agencyVehicleCount,
        workshopVehicleCount,
      } = calculateTotalsAndCounts(updatedDeductibles)

      return {
        ...state,
        deductibles: updatedDeductibles,
        totalCompTaxableAmount,
        totalCompVatAmount,
        totalVatAmount: totalCompVatAmount + state.totalTplVatAmount,
        totalDeductibleAmount:
          totalCompTaxableAmount +
          totalCompVatAmount +
          state.totalTplTaxableAmount +
          state.totalTplVatAmount,
        agencyVehicleCount,
        workshopVehicleCount,
      }
    })
  },
}))

export default useSingleQuoteStore
