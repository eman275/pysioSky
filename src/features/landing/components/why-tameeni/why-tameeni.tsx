import { getScopedI18n } from '@/shared/locales/server'
import Icon1 from '@/shared/components/icons/why-icon-1.svg'
import Icon2 from '@/shared/components/icons/why-icon-2.svg'
import Icon3 from '@/shared/components/icons/why-icon-3.svg'
import Icon4 from '@/shared/components/icons/why-icon-4.svg'
import Icon5 from '@/shared/components/icons/why-icon-5.svg'
import Icon6 from '@/shared/components/icons/why-icon-6.svg'
import { WhyTameeniSteps } from './why-tameeni-steps'
import { ReactElement } from 'react'

export type WhyTameeniCardContract = {
  id: string
  icon: ReactElement
  title: string
  description: string
}

const steps: WhyTameeniCardContract[] = [
  {
    id: 'st1',
    icon: <Icon1 />,
    title: 'sub_Title1',
    description: 'sub_desc1',
  },
  {
    id: 'st2',
    icon: <Icon2 />,
    title: 'sub_Title2',
    description: 'sub_desc2',
  },
  {
    id: 'st3',
    icon: <Icon3 />,
    title: 'sub_Title3',
    description: 'sub_desc3',
  },
  {
    id: 'st4',
    icon: <Icon4 />,
    title: 'sub_Title4',
    description: 'sub_desc4',
  },
  {
    id: 'st5',
    icon: <Icon5 />,
    title: 'sub_Title5',
    description: 'sub_desc5',
  },
  {
    id: 'st6',
    icon: <Icon6 />,
    title: 'sub_Title6',
    description: 'sub_desc6',
  },
]
export const WhyTameeni = async () => {
  const t = await getScopedI18n('landing.whyTameeni')
  return (
    <section className='px-0 py-10 md:py-16'>
      <div className='container'>
        <div className='mb-5 text-center md:mb-10'>
          <h2 className=''> {t('title')} </h2>
          <p className='text-base md:text-xl'>{t('description')}</p>
        </div>

        <WhyTameeniSteps items={steps} />
      </div>
    </section>
  )
}
