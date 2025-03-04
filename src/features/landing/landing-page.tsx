// import LandingBg from '@/shared/components/icons/landing-bg.svg'
import { getScopedI18n } from '@/shared/locales/server'
// import { InsuranceTabs } from '@/feat/landing/components/insurance-tab'
import DynamicTitle from '@/feat/landing/components/dynamic-title'
// import BanksSection from '@/feat/landing/components/banks-section'
// import InsuranceCompanies from '@/feat/landing/components/insurance-companies'
// import { WhyTameeni } from '@/feat/landing/components/why-tameeni/why-tameeni'
// import { WhichInsurance } from '@/feat/landing/components/which-insurance'
// import { ImpactList } from '@/features/landing/components/impact-list'
// import { TameeniApp } from '@/feat/landing/components/tameeni-application/tameeni-app'
// import CRNumberSection from '@/feat/landing/components/cr-number-section'
import Link from 'next/link'
import OurServicesSection from './components/our-services-section'
import AssessmentProcess   from './components/assessment-process'
import MeetTheTeam from './components/team-card'
import LocateUs from './components/locate-us'


export default async function Home() {
  const tLanding = await getScopedI18n('landing')

  return (
    <div className='relative min-h-screen py-4'>
      <img
        className='absolute left-0 top-0 z-10 h-[878px] lg:h-[980px] w-full object-cover opacity-[30%]'
      alt='background'
      src='/images/Image (6).jpg'
    />
     {/* <svg
    className="absolute bottom-[500px]  w-full"
    viewBox="0 0 1440 320"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#f8e6da" 
      d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128V320H0Z"
    ></path>
  </svg> */}

      {/* <LandingBg className='absolute top-[46px] z-10 hidden md:block ltr:right-0 rtl:left-0' /> */}
      <div className='relative z-20'>
        {/* <InsuranceTabs /> */}
        <div className='mb-4 flex flex-col px-1 text-center md:mb-12'>
          <DynamicTitle />
          {/* <p className='text-sm font-semibold text-neutral-5 md:text-xl'>
            {tLanding('page_subtitle')}
          </p> */}

          {/* <div className='mx-2    border-t-8 border-error-5 '></div> */}
          <div className='flex items-center justify-center'>
            <div className='mx-2 h-32 border-l-8 border-error-5'></div>
          </div>

          <div className='mt-10 flex items-center justify-center'>
            <Link
              href='https://wa.me/201553878925'
              target='_blank'
              rel='noopener noreferrer'
              className='w-fit rounded-lg  border  border-primary-1 bg-primary-1 px-4 py-3 font-bold text-white'
            >
              {tLanding('BookAppointment')}
            </Link>
          </div>
        </div>
        <div className='px-3'>{/* <CRNumberSection /> */}</div>
        <OurServicesSection />
        <AssessmentProcess   />
        <MeetTheTeam />
        <LocateUs/>
        {/* <WhyTameeni /> */}
        {/* <WhichInsurance /> */}
        {/* <ImpactList /> */}
        {/* <TameeniApp /> */}
      </div>
    </div>
  )
}
