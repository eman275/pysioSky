'use client'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'

import useAdditionalDetailsStore from '../hooks/use-additional-details-store'
import CanNotProceedModal from './modals/can-not-proceed-modal'
import CrOwnerMobileNumberModal from './modals/cr-owner-mobile-number-modal'
import ExceededAvailableAttemptsModal from './modals/exceeded-available-attempts-modal'
import MobileNumberValidationErrorModal from './modals/mobile-number-validation-error-modal'
import OTPVerificationModal from './modals/otp-verification-modal'

const AdditionDetailsDialog = () => {
  const { activeContent, isOpened, toggleDialog } = useAdditionalDetailsStore()

  return (
    <Dialog open={isOpened} onOpenChange={toggleDialog}>
      <DialogContent className=' w-auto px-6 pb-[60px] pt-10  lg:w-[31.25rem] lg:pb-10'>
        {activeContent === 'can-not-proceed' && <CanNotProceedModal />}

        {activeContent === 'cr-owner-mobile-number' && (
          <CrOwnerMobileNumberModal />
        )}

        {activeContent === 'mobile-number-id-mismatch' && (
          <MobileNumberValidationErrorModal />
        )}

        {activeContent === 'otp-verification' && <OTPVerificationModal />}

        {activeContent === 'verification-service-down-error' && (
          <MobileNumberValidationErrorModal isServiceError />
        )}

        {activeContent === 'exceeded-available-attempts' && (
          <ExceededAvailableAttemptsModal />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AdditionDetailsDialog
