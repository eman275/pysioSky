import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'
import { getScopedI18n } from '@/shared/locales/server'
import TPL from '@/shared/components/icons/tpl-coverage-icon.svg'
import COMP from '@/shared/components/icons/comp-coverage-icon.svg'

export const WhichInsurance = async () => {
  const t = await getScopedI18n('landing.WhichInsurance')
  const insuranceTypes = [
    {
      key: 'tpl',
      title: t('sub_Title1'),
      description: t('sub_desc1'),
      url: 'https://www.tameeni.com/car/en/third-party-insurance',
      icon: <TPL />,
    },
    {
      key: 'comp',
      title: t('sub_Title2'),
      description: t('sub_desc2'),
      url: '/car/التأمين-الشامل',
      icon: <COMP />,
    },
  ]
  return (
    <section className='py-8 md:py-16'>
      <div className='container'>
        {/* Insurance Types Section */}
        <div className='mb-4 text-center'>
          <h2 className='mb-3'>{t('title')}</h2>
          <p className='text-base lg:text-xl'>{t('description')}</p>
        </div>
        <div className='-mx-4 hidden flex-wrap lg:flex'>
          {insuranceTypes?.map((insuranceType) => {
            return (
              <div
                key={insuranceType.key}
                className={
                  'mb-4 flex w-full flex-col rounded-lg border-2 border-solid px-4 transition-all duration-500 ease-in-out lg:mb-0 lg:w-1/2 lg:border-0'
                }
              >
                <div className='flex items-start gap-8 p-1 md:items-center lg:p-0'>
                  {insuranceType.icon}
                  <div className='flex h-full w-full items-center justify-between p-3 lg:p-0'>
                    <h3 className='text-lg leading-5 lg:leading-10'>
                      {insuranceType.title}
                    </h3>
                  </div>
                </div>
                <div
                  className={`block w-full transition-all duration-500 ease-in-out lg:hidden `}
                ></div>
                <div className='hidden lg:block'>
                  <p
                    className={
                      insuranceType.key === 'tpl'
                        ? 'text-base'
                        : 'text-base lg:text-lg'
                    }
                  >
                    {insuranceType.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Accordion
        collapsible
        type='single'
        className='mt-4 flex flex-col lg:hidden '
      >
        {insuranceTypes.map((insuranceType) => {
          return (
            <AccordionItem
              value={insuranceType.title}
              key={insuranceType.title}
              className='mb-4 py-0'
            >
              <AccordionTrigger>
                <div className='flex items-center justify-between gap-4'>
                  {insuranceType.icon}
                  {t(insuranceType.title as keyof typeof t)}
                </div>
              </AccordionTrigger>
              <AccordionContent className='pb-0'>
                {/* {t(item.description as keyof typeof t)} */}

                <p
                  className={
                    insuranceType.key === 'tpl'
                      ? 'text-base'
                      : 'text-base lg:text-lg'
                  }
                >
                  {insuranceType.description}
                </p>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}
