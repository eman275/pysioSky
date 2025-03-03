'use client'

import { useGetVehiclesListQuery } from '../../resources/get-vehicles-list'

export default function useResetCheck() {
  const { data } = useGetVehiclesListQuery()
  const items = data?.items || []
  const isResetActive = items.length > 0

  return {
    isResetActive,
  }
}
