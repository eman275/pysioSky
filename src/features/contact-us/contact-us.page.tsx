import ContactUsDetails from './components/contact-us-details'
import ContactUsForm from './components/contact-us-form'
import ContactUsHeader from './components/contact-us-header'
import ContactUsLocation from './components/contact-us-location'

const ContactUsPage = () => {
  return (
    <div className='bg-neutral-1 py-8'>
      <div className='container xl:px-[125px]'>
        <div className='flex flex-col items-stretch gap-6'>
          <ContactUsHeader />
          <ContactUsDetails />
          <div className='flex flex-col gap-4 lg:flex-row'>
            <ContactUsForm />
            <ContactUsLocation />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
