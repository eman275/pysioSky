import React from 'react'

import useFleetListStore from '../../hooks/use-fleet-list-store'
import { VehicleError } from '../../../fleet-details.types'
import EditErrorVehicleForm from './edit-error-vehicle-form'
import FixErrorVehicleForm from './fix-error-vehicle-form'
import { includesAny } from '@/shared/lib/utils'

const FixVehicleFormModal = () => {
  const { clickedItem } = useFleetListStore()
  const errorCodes =
    clickedItem?.errors.map((err: VehicleError) => err.code) ?? []
  const isEdit = includesAny(errorCodes, [
    'VEHICLE-409-MAKE',
    'VEHICLE-409-MODEL',
    'VEHICLE-409-BODY',
    'VEHICLE-409-YEAR',
  ])
  const isFix = includesAny(errorCodes, ['VEHICLE-404', 'VEHICLE-409-SEQUENCE'])

  if (isFix) return <FixErrorVehicleForm />
  if (isFix && isEdit) return <FixErrorVehicleForm />
  if (isEdit) return <EditErrorVehicleForm />
}

export default FixVehicleFormModal
