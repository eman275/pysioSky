import Link from 'next/link'

function OurServicesSection() {
  return (
    <div className='flex flex-col items-center justify-center pt-10'>
      <h3 className='font-bold text-primary-1'>Our services includes</h3>
      <div className='mx-2 h-32 border-l-8 border-error-5'></div>

      <Link href=''>
        <h2 className='text-xxxl  hover:text-[30px] hover:text-[#a63346]'>
          Physiotherapy
        </h2>
      </Link>
      <Link href=''>
        <h2 className='text-xxxl  hover:text-[30px] hover:text-[#a63346]'>
          Virtual Physiotherapy
        </h2>
      </Link>
      <Link href=''>
        <h2 className='text-xxxl  hover:text-[30px] hover:text-[#a63346]'>
          Strength & Conditioning
        </h2>
      </Link>
      <Link href=''>
        <h2 className='text-xxxl  hover:text-[30px] hover:text-[#a63346]'>
          Advanced Sports Rehabilitation
        </h2>
      </Link>
      <Link href=''>
        <h2 className='text-xxxl  hover:text-[30px] hover:text-[#a63346]'>
          Sports Massage{' '}
        </h2>
      </Link>
      <Link href=''>
        <h2 className='text-xxxl  hover:text-[30px] hover:text-[#a63346]'>
          Mindful Mobility{' '}
        </h2>
      </Link>
      <Link href=''>
        <h2 className='text-xxxl  hover:text-[30px] hover:text-[#a63346]'>
          Home Therapy{' '}
        </h2>
      </Link>
      <Link href=''>
        <h2 className='text-xxxl  hover:text-[30px] hover:text-[#a63346]'>
          Wellness Talks & Workshops
        </h2>
      </Link>
      <Link href=''>
        <h2 className='text-xxxl  hover:text-[30px] hover:text-[#a63346]'>
          Community Outreach
        </h2>
      </Link>
    </div>
  )
}

export default OurServicesSection
