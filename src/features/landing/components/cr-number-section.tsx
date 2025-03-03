'use client'
import CRNumberForm from '@/shared/components/layout/cr-number-form'
import { Card } from '@/shared/components/ui/card'
import { useScopedI18n } from '@/shared/locales/client'
import { ProgramAwarenessVideo } from './program-awareness/program-awareness-video'
import CrImageModal from './cr-image-modal'

export default function CRNumberSection() {
  const tCr = useScopedI18n('landing.cr_number_form')

  return (
    <Card className='relative z-20 mx-auto flex max-w-[68.875rem] flex-col gap-11 rounded-2xl p-3 md:flex-row md:p-8'>
      <section className='flex-1'>
        <>
          <h6 className='mb-5 text-base font-bold md:text-xxl'>
            {tCr('your_company_details')}
          </h6>
          <div className='mb-2 flex items-center justify-between'>
            <p className='me-2 text-sm font-bold'>{tCr('company_cr_number')}</p>
            <CrImageModal />
          </div>
        </>
        <CRNumberForm />
      </section>
      <ProgramAwarenessVideo />
    </Card>
  )
}
