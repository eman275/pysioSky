import { cn } from '@/shared/lib/utils'
import AddNewVehicleSpinner from './components/add-new-vehicle-spinner'
import FleetListAlert from './components/fleet-list-alert'
import FleetListHeader from './components/fleet-list-header'
import FleetListNextButton from './components/fleet-list-next-button'
import AddVehicleForm from './components/forms/add-vehicle-form'
import FleetListDialog from './components/modals/fleet-list-dialog'
import VehiclesList from './components/vehicles-list'
import LoadFleetListServerController from '../select-method/components/controllers/load-fleet-list-server.controller'
import { Suspense } from 'react'
import FleetListSkeleton from './components/fleet-list-skeleton'
import { AppParams } from '@/shared/types/routing.types'

type Props = {
  params: AppParams
}
const FleetListPage = ({ params }: Props) => {
  return (
    <section className='mb-28'>
      <FleetListAlert />
      <div className={cn('flex grid-cols-12 flex-col gap-x-8 lg:grid')}>
        {/* header */}
        <FleetListHeader />

        {/*add vehicle form */}
        <section className='col-span-4 hidden lg:block'>
          <AddVehicleForm />
        </section>

        {/* vehicles list */}
        <section className='col-span-8'>
          <AddNewVehicleSpinner />
          <Suspense fallback={<FleetListSkeleton />}>
            <LoadFleetListServerController
              applicationReference={params.smeApplicationReference}
              pageIndex={1}
            >
              <VehiclesList />
            </LoadFleetListServerController>
          </Suspense>
        </section>
      </div>

      <FleetListNextButton />

      <FleetListDialog />
    </section>
  )
}

export default FleetListPage
