import { getScopedI18n } from '@/shared/locales/server'
import Impact1 from '@/shared/components/icons/impact-item1.svg'
import Impact2 from '@/shared/components/icons/impact-item2.svg'
import Impact3 from '@/shared/components/icons/impact-item3.svg'
import Impact4 from '@/shared/components/icons/impact-item4.svg'
import Impact5 from '@/shared/components/icons/impact-item5.svg'

const impactList = [
  {
    id: 'st1',
    icon: <Impact1 />,
    title: 'sub_Title1',
  },
  {
    id: 'st2',
    icon: <Impact2 />,
    title: 'sub_Title2',
  },
  {
    id: 'st3',
    icon: <Impact3 />,
    title: 'sub_Title3',
  },
  {
    id: 'st4',
    icon: <Impact4 />,
    title: 'sub_Title4',
  },
  {
    id: 'st5',
    icon: <Impact5 />,
    title: 'sub_Title5',
  },
]

export const ImpactList = async () => {
  const t = await getScopedI18n('landing.ImpactSection')

  return (
    <section className='py-8 md:py-16'>
      <div className='container'>
        <div className='pb-5 text-center md:pb-10'>
          <h2 className=''>{t('title')}</h2>
          <p className='m-auto w-full text-base md:w-8/12 md:text-xl'>
            {t('description')}
          </p>
        </div>
        <div className=''>
          <ul className='-mx-2 flex flex-wrap justify-center lg:-mx-4'>
            {impactList?.map((impact) => {
              return (
                <li
                  className='mb-4 w-6/12 px-2 sm:w-4/12 lg:mb-0 lg:w-1/5 lg:px-4'
                  key={impact?.id}
                >
                  <div className='inline-flex h-full w-full flex-col items-center rounded-lg border-2 border-solid p-4 text-center'>
                    {impact.icon}
                    <h5>{t(impact.title as keyof typeof t)}</h5>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
