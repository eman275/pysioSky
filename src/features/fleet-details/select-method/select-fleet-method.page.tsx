import LoadCompanyDetailsServerController from '@/shared/components/layout/company-info-bar/load-company-details-server.controller'
import { getScopedI18n } from '@/shared/locales/server'
import { AppParams } from '@/shared/types/routing.types'
import { Suspense } from 'react'
import LoadFleetListServerController from './components/controllers/load-fleet-list-server.controller'
import FleetAddingMethodsList from './components/fleet-adding-methods-list'
import ResetVehiclesListAlert from './components/reset-vehicles-list-alert'
import CompanyDetailsSkeleton from '../../../shared/components/layout/company-info-bar/company-details-skeleton'
import MethodSelectSkeleton from './components/skeletons/method-select-skeleton'
import CompanyInfoBar from '@/shared/components/layout/company-info-bar/company-info-bar'
type Props = {
  params: AppParams
}
async function SelectFleetMethodPage({ params }: Props) {
  const t = await getScopedI18n('application.fleetDetails')

  // vars
  return (
    <section className='mb-32'>
      <Suspense fallback={<CompanyDetailsSkeleton />}>
        <LoadCompanyDetailsServerController crNumber={params.crNumber}>
          <CompanyInfoBar />
        </LoadCompanyDetailsServerController>
      </Suspense>

      <Suspense fallback={<MethodSelectSkeleton />}>
        <LoadFleetListServerController
          applicationReference={params.smeApplicationReference}
          pageIndex={1}
        >
          <ResetVehiclesListAlert />
          <div className='px-3 lg:px-0'>
            <p className='mb-4 mt-8 text-xl font-bold'>
              {t('select_method.title')}
            </p>
          </div>
          <FleetAddingMethodsList />
        </LoadFleetListServerController>
      </Suspense>
    </section>
  )
}

export default SelectFleetMethodPage
