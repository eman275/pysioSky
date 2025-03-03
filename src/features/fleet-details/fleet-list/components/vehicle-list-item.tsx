'use client'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { VehicleItem } from '../../fleet-details.types'
import FailedVehicleCard from '../components/failed-vehicle-card'
import VehicleDetailsCardInfo from '../components/vehicle-details-card-info'
import useFleetListStore from '../hooks/use-fleet-list-store'

type ListItem = {
  item: VehicleItem
}
const VehicleListItem = ({ item }: ListItem) => {
  const { checkedList, handleCheckListChange } = useFleetListStore()
  return (
    <div className='flex items-center gap-3'>
      <Checkbox
        checked={checkedList.includes(item.applicationVehicleReference)}
        onCheckedChange={() =>
          handleCheckListChange(item.applicationVehicleReference)
        }
      />
      {item.errors?.length ? (
        <FailedVehicleCard vehicleDetailsCardInfo={item} />
      ) : (
        <VehicleDetailsCardInfo vehicleDetailsCardInfo={item} />
      )}
    </div>
  )
}

export default VehicleListItem
