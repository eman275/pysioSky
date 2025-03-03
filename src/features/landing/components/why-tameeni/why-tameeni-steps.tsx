import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'
import { getScopedI18n } from '@/shared/locales/server'
import { WhyTameeniCardContract } from './why-tameeni'
type TSteps = {
  items: WhyTameeniCardContract[]
}

export const WhyTameeniSteps = async ({ items }: TSteps) => {
  const t = await getScopedI18n('landing.whyTameeni')

  return (
    <div>
      <div className='hidden grid-cols-1 gap-7 lg:grid lg:grid-cols-2 '>
        {items?.map((step) => {
          return (
            <div
              key={step.id}
              className={`flex max-h-[80vh] min-h-24 items-center rounded-lg border-2 border-solid bg-white px-4 py-3 transition-all duration-500 ease-in-out 
            `}
            >
              <div className={'w-16 transition-all duration-500 lg:w-32'}>
                <div className='h-[60px] w-[60px] self-center'>{step.icon}</div>
              </div>
              {/* Accordion Item */}
              <div
                className={
                  'flex h-full w-full flex-col  justify-center border-0 shadow-none transition-all duration-500'
                }
              >
                {/* Accordion Heading */}
                <div className='m-0 flex items-center justify-between transition-all duration-500'>
                  <h5>{t(step.title as keyof typeof t)}</h5>
                  <button className='flex border-0 bg-transparent transition-all duration-500 lg:hidden'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='18'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                      />
                    </svg>
                  </button>
                </div>
                {/* accordion content */}
                <div
                  className={`block transition-all duration-500 ease-in-out lg:hidden
                
                `}
                >
                  <p>{t(step.description as keyof typeof t)}</p>
                </div>

                <div className={'hidden lg:block'}>
                  <p>{t(step.description as keyof typeof t)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Accordion
        collapsible
        type='single'
        className='mt-4 flex flex-col lg:hidden '
      >
        {items.map((item) => {
          return (
            <AccordionItem
              value={item.title}
              key={item.title}
              className='mb-4 py-0'
            >
              <AccordionTrigger>
                <div className='flex items-center justify-between gap-4'>
                  <div className='h-[60px] w-[60px] self-center'>
                    {item.icon}
                  </div>
                  {t(item.title as keyof typeof t)}
                </div>
              </AccordionTrigger>
              <AccordionContent className='pb-0'>
                {t(item.description as keyof typeof t)}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
