function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-neutral-1 py-8'>
      <div className='container xl:px-[125px]'>
        <div className='mb-16 flex w-full flex-col items-center justify-center gap-4'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ThankYouLayout
