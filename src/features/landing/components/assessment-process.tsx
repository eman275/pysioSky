import Link from "next/link"
import Timeline from "./time-line"

const AssessmentProcess   = async () => {
  return (
    <div className='relative bg-[#F8E6DA] pt-10 flex items-center justify-center flex-col'>
      {/* <svg
        className='absolute left-0 top-0 w-full'
        viewBox='0 0 1440 320'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill='#F8E6DA'
          d='M0,160L80,154.7C160,149,320,139,480,149.3C640,160,800,192,960,202.7C1120,213,1280,203,1360,197.3L1440,192V0H0Z'
        ></path>
      </svg> */}

      <h1 className='relative z-10 text-center  text-primary-1 font-bold'>
        Driven by Science. Powered by Community.
      </h1>
      <h6 className="text-center w-[50%] px-20">We work in collaboration with you and the people in your community, be it your coach, doctor or trainer to get you ready to take charge of your life by equipping you with skills to manage your injuries and pain.</h6>

      <div className='mx-2 h-32 border-l-8 border-error-5 my-4'></div>

      {/* <h1 className='relative z-10 text-center  text-primary-1 font-bold'>Our Assessment Process  </h1> */}
      <Timeline/>

      <Link
              href='https://wa.me/201553878925'
              target='_blank'
              rel='noopener noreferrer'
              className='w-fit rounded-lg  border  border-primary-1 bg-primary-1 px-4 py-3 font-bold text-white'
            >
              Book Your Appointment
            </Link>

    </div>
  )
}

export default AssessmentProcess  
