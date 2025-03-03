import {
  COMPVehicle,
  DeductibleOption,
  DeductibleOptionRecord,
} from '../../resources/quotation.types'

export const calculateTotalsAndCounts = (
  deductibles: Record<
    string,
    { workshopOptions: DeductibleOption[]; agencyOptions: DeductibleOption[] }
  >
) => {
  let totalCompTaxableAmount = 0
  let totalCompVatAmount = 0
  let agencyVehicleCount = 0
  let workshopVehicleCount = 0

  const deductibleKeys = Object.keys(deductibles)

  for (let i = 0; i < deductibleKeys.length; i++) {
    const { workshopOptions, agencyOptions } = deductibles[deductibleKeys[i]]

    for (let j = 0; j < workshopOptions.length; j++) {
      const { isSelected, taxableAmount, vatAmount } = workshopOptions[j]
      if (isSelected) {
        totalCompTaxableAmount += taxableAmount
        totalCompVatAmount += vatAmount
        workshopVehicleCount += 1
      }
    }

    for (let k = 0; k < agencyOptions.length; k++) {
      const { isSelected, taxableAmount, vatAmount } = agencyOptions[k]
      if (isSelected) {
        totalCompTaxableAmount += taxableAmount
        totalCompVatAmount += vatAmount
        agencyVehicleCount += 1
      }
    }
  }

  return {
    totalCompTaxableAmount,
    totalCompVatAmount,
    agencyVehicleCount,
    workshopVehicleCount,
  }
}

export const updateOptions = (
  options: DeductibleOption[],
  deductibleReference: string
) =>
  options.map((option) => ({
    ...option,
    isSelected: option.value === deductibleReference,
    isModified: option.value === deductibleReference,
  }))

export function getDeductibleOptions(
  vehicles: COMPVehicle[]
): DeductibleOptionRecord {
  const optionsMap: DeductibleOptionRecord = {}

  vehicles.forEach((vehicle) => {
    const vehicleRef = vehicle.reference

    const workshopOptions: DeductibleOption[] = []
    const agencyOptions: DeductibleOption[] = []
    vehicle.deductibles.forEach((deductible) => {
      if (deductible.workshopPremium) {
        workshopOptions.push({
          vehicleRef: vehicle.reference,
          value: String(deductible.workshopPremium?.reference),
          label: String(deductible.amount),
          taxableAmount: deductible.workshopPremium.taxableAmount,
          totalAmount: deductible.workshopPremium.totalAmount,
          vatAmount: deductible.workshopPremium.vatAmount,
          isSelected: deductible.workshopPremium.isUserSelected,
          isModified: false,
        })
      }
      if (deductible.agencyPremium) {
        agencyOptions.push({
          vehicleRef: vehicle.reference,
          value: String(deductible.agencyPremium.reference),
          label: String(deductible.amount),
          taxableAmount: deductible.agencyPremium.taxableAmount,
          totalAmount: deductible.agencyPremium.totalAmount,
          vatAmount: deductible.agencyPremium.vatAmount,
          isSelected: deductible.agencyPremium.isUserSelected,
          isModified: false,
        })
      }
    })

    // Combine both options to find the currently selected deductible
    const allOptions = [...workshopOptions, ...agencyOptions]
    const currentSelected =
      allOptions.find((option) => option.isSelected)?.value || null

    optionsMap[vehicleRef] = {
      currentSelected,
      workshopOptions,
      agencyOptions,
    }
  })

  return optionsMap
}
