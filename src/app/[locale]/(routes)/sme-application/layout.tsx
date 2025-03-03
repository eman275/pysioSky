import ApplicationStepper from '@/shared/components/application-stepper/application-stepper'

function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-neutral-1'>
      <ApplicationStepper />
      <div className='container xl:px-[125px]'>
        <div className='flex flex-col items-stretch gap-6'>{children}</div>
      </div>
    </div>
  )
}

export default ApplicationLayout
