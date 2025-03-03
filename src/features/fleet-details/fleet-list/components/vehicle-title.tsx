import { LookupModel } from '../../fleet-details.types'
import { isArabicText } from '../helpers'
import { useGetName } from '../hooks/use-get-options'

export const VehicleTitle = ({
  vehicleMake,
  vehicleModel,
  manufactureYear,
}: {
  vehicleMake: LookupModel | null
  vehicleModel: LookupModel | null
  manufactureYear: number
}) => {
  const makeName = useGetName(vehicleMake)
  const modelName = useGetName(vehicleModel)

  // Determine if the text is in Arabic
  const isArabic = isArabicText(makeName || modelName || '')

  return (
    <p className='flex text-base font-bold' dir={isArabic ? 'rtl' : 'ltr'}>
      <span>{makeName}</span> - <span>{modelName}</span> -{' '}
      <span>{manufactureYear}</span>
    </p>
  )
}
