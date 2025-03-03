export const generateCreateVehicleManuallyMutationKey = () => [
  'vehicle',
  'manual',
]

export const generateEditVehicleMutationKey = () => [
  'vehicle',
  'edit-single',
  'edit-multi',
]

export const generateUploadExcelFileQueryKey = () => ['upload-excel']

export const generateDownloadExcelFileQueryKey = () => ['download-excel']

export const generateVehicleMakeQueryKey = () => ['vehicle', 'vehicle-make']

export const generateVehicleModelQueryKey = (makeId: string) => [
  'vehicle',
  'vehicle-model',
  makeId,
]

export const generateVehicleBodyTypeQueryKey = () => [
  'vehicle',
  'vehicle-body-type',
]

export const generateVehiclesListQueryKey = (pageIndex?: number) => {
  return ['vehicle', 'list', pageIndex].filter(Boolean)
}

export const generateDeleteVehicleMutationKey = () => ['vehicle', 'delete']
export const generateResetVehiclesMutationKey = () => ['vehicle', 'reset']
export const generateFixVehicleMutationKey = () => ['fix-vehicle']
