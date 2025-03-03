'use client'
import CrImageModal from '@/features/landing/components/cr-image-modal'
import CRNumberForm from '@/shared/components/layout/cr-number-form'
import { useScopedI18n } from '@/shared/locales/client'

const EditCrNumber = () => {
  const tCr = useScopedI18n('landing.cr_number_form')

  return (
    <div className='px-3 lg:px-0'>
      <div className='mb-2 flex items-center gap-2'>
        <div className='mb-2 flex items-center justify-between'>
          <p className='me-2 text-sm font-bold'>{tCr('company_cr_number')}</p>
          <CrImageModal />
        </div>
      </div>
      <CRNumberForm enableCheckBox />
    </div>
  )
}

export default EditCrNumber
