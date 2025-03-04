import Link from 'next/link'

function OurServicesSection() {
  return (
    <div className='flex flex-col items-center justify-center pt-10'>
      <h3 className='font-bold text-primary-1'>Our services includes</h3>
      <div className='mx-2 h-32 border-l-8 border-error-5'></div>

      <Link href=''>
        <h2 className=' text-xl   hover:text-[22px] hover:text-[#a63346]  lg:text-xxxl lg:hover:text-[30px]'>
          Physiotherapy
        </h2>
      </Link>
      <Link href=''>
      <h2 className=' text-xl   hover:text-[22px] hover:text-[#a63346]  lg:text-xxxl lg:hover:text-[30px]'>
      Virtual Physiotherapy
        </h2>
      </Link>
      <Link href=''>
      <h2 className=' text-xl   hover:text-[22px] hover:text-[#a63346]  lg:text-xxxl lg:hover:text-[30px]'>
      Strength & Conditioning
        </h2>
      </Link>
      <Link href=''>
      <h2 className=' text-xl   hover:text-[22px] hover:text-[#a63346]  lg:text-xxxl lg:hover:text-[30px]'>
      Advanced Sports Rehabilitation
        </h2>
      </Link>
      <Link href=''>
      <h2 className=' text-xl   hover:text-[22px] hover:text-[#a63346]  lg:text-xxxl lg:hover:text-[30px]'>
      Sports Massage{' '}
        </h2>
      </Link>
      <Link href=''>
      <h2 className=' text-xl   hover:text-[22px] hover:text-[#a63346]  lg:text-xxxl lg:hover:text-[30px]'>
      Mindful Mobility{' '}
        </h2>
      </Link>
      <Link href=''>
      <h2 className=' text-xl   hover:text-[22px] hover:text-[#a63346]  lg:text-xxxl lg:hover:text-[30px]'>
      Home Therapy{' '}
        </h2>
      </Link>
      <Link href=''>
      <h2 className=' text-xl   hover:text-[22px] hover:text-[#a63346]  lg:text-xxxl lg:hover:text-[30px]'>
      Wellness Talks & Workshops
        </h2>
      </Link>
      <Link href=''>
      <h2 className=' text-xl   hover:text-[22px] hover:text-[#a63346]  lg:text-xxxl lg:hover:text-[30px]'>
      Community Outreach
        </h2>
      </Link>
    </div>
  )
}

export default OurServicesSection
