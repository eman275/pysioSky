import FAQBar from './components/faq-bar'
import FAQHeader from './components/faq-header'
const FAQPage = () => {
  return (
    <div className='bg-neutral-1 pb-24 pt-8'>
      <div className='container xl:px-[125px]'>
        <div className='flex flex-col items-stretch gap-6'>
          <FAQHeader />
          <FAQBar />
        </div>
      </div>
    </div>
  )
}

export default FAQPage
