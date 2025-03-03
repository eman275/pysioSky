import { getScopedI18n } from '@/shared/locales/server'

export const TameeniApp = async () => {
  const t = await getScopedI18n('landing.TameeniApp')
  const tameeniAppFeatures = [
    {
      id: 'taf1',
      img: ' /images/TameeniApp/mobile-app-icon1.svg',
      text: t('sub_Title1'),
    },
    {
      id: 'taf2',
      img: '/images/TameeniApp/mobile-app-icon2.svg',
      text: t('sub_Title2'),
    },
    {
      id: 'taf3',
      img: ' /images/TameeniApp/mobile-app-icon3.svg',
      text: t('sub_Title3'),
    },
    {
      id: 'taf4',
      img: '/images/TameeniApp/mobile-app-icon4.svg',
      text: t('sub_Title4'),
    },
    {
      id: 'taf5',
      img: ' /images/TameeniApp/mobile-app-icon5.svg',
      text: t('sub_Title5'),
    },
  ]
  return (
    <section className='py-8 md:py-16'>
      <div className='container'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='xl: w-full px-4 lg:w-6/12 xl:w-5/12'>
            <div className='flex h-full flex-col'>
              <h2>{t('title')}</h2>
              <ul className='m-0 list-none p-0'>
                {tameeniAppFeatures?.map((feature) => {
                  return (
                    <li
                      key={feature.id}
                      className='relative flex items-center gap-7 text-lg'
                    >
                      <img src={feature.img} alt={feature.text} width={55} />

                      <span>{feature.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className='hidden w-full px-4 lg:block lg:w-6/12 xl:w-7/12'>
            <img
              className='ms-auto w-full'
              src={'/images/TameeniApp/TameeniApp.png'}
              alt='TameeniAppImage'
              loading='lazy'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
