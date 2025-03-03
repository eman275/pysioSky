'use client'
import { Card } from '@/shared/components/ui/card'
import { Spinner } from '@/shared/components/ui/loader/spinner'
import useGetIsMutatingByKey from '@/shared/hooks/use-get-is-mutating-by-key'
import { useScopedI18n } from '@/shared/locales/client'
import { generateCreateVehicleManuallyMutationKey } from '../../resources/fleet-details.helpers'

export default function AddNewVehicleSpinner() {
  const t = useScopedI18n('application.fleetDetails')

  const isAddingNewVehicle = useGetIsMutatingByKey(
    generateCreateVehicleManuallyMutationKey()
  )

  return (
    <>
      {/* add vehicle loader */}
      {isAddingNewVehicle && (
        <Card>
          <Spinner size='medium'>
            <p className='text-sm'>{t('spinner')}</p>
          </Spinner>
        </Card>
      )}
    </>
  )
}
