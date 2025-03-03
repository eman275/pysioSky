'use client'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import useFleetListStore from '../../hooks/use-fleet-list-store'
import DeleteWarningVehicleModal from './delete-warning-vehicle-modal'
import FailedToProceedModal from './failed-to-proceed-modal'
import FixVehicleFormModal from '../forms/fix-vehicle-form'
import EditVehicleFormModal from './edit-vehicle-form-modal'
import AddVehicleForm from '../forms/add-vehicle-form'
import SelectionWarningModal from './selection-warning-modal'
import { useGetVehiclesListQuery } from '@/features/fleet-details/resources/get-vehicles-list'
import QuoteListExistModal from './quote-list-exists-modal'

const FleetListDialog = () => {
  const { activeContent, isOpened, toggleDialog } = useFleetListStore()
  const { data } = useGetVehiclesListQuery()

  return (
    <Dialog open={isOpened} onOpenChange={toggleDialog}>
      <DialogContent>
        {activeContent === 'delete-vehicle' && (
          <DeleteWarningVehicleModal type='single' />
        )}
        {activeContent === 'delete-vehicles' && (
          <DeleteWarningVehicleModal type='multi' />
        )}
        {activeContent === 'delete-and-proceed' && (
          <DeleteWarningVehicleModal type='proceed' />
        )}
        {activeContent === 'can-not-proceed' && <FailedToProceedModal />}
        {activeContent === 'selection-warning' && (
          <SelectionWarningModal
            totalVehicleCount={data?.metadata?.totalCount ?? 0}
          />
        )}
        {activeContent === 'fix-vehicle' && <FixVehicleFormModal />}
        {['edit-vehicle', 'edit-vehicles'].includes(activeContent) && (
          <EditVehicleFormModal />
        )}
        {activeContent === 'add-vehicle' && <AddVehicleForm isDialog />}

        {activeContent === 'previous-quote-list-exist' && (
          <QuoteListExistModal />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default FleetListDialog
