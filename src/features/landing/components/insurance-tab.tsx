import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import { getScopedI18n } from '@/shared/locales/server'
import CarInsuranceIcon from '@/shared/components/icons/car-insurance-icon.svg'
import HealthIcon from '@/shared/components/icons/health-insurance-icon.svg'
import DomesticIcon from '@/shared/components/icons/domestic-insurance-icon.svg'
import FleetManagement from '@/shared/components/icons/fleet-management-icon.svg'
import MedicalMalpracticeInsurance from '@/shared/components/icons/medical_malpractice_insurance-icon.svg'
import MarineCargoInsuranceicon from '@/shared/components/icons/marine-cargo-insurance-icon.svg'
import {
  CAR_INSURANCE_URL,
  HEALTH_INSURANCE_URL,
  DOMESTIC_INSURANCE_URL,
  TRAVEL_INSURANCE_URL,
} from '@/shared/lib/constants'

export const InsuranceTabs = async () => {
  const t = await getScopedI18n('landing.tameeniProducts')

  const tabs = [
    {
      name: 'car-insurance',
      title: t('car_insurance'),
      url: CAR_INSURANCE_URL,
      icon: <CarInsuranceIcon className='mb-2.5' />,
    },

    {
      name: 'health-insurance',
      title: t('health_insurance'),
      url: HEALTH_INSURANCE_URL,
      icon: <HealthIcon />,
    },
    {
      name: 'Fleet_Insurance',
      title: t('SME_Fleet_Insurance'),
      url: '/',
      isActive: true,
      icon: <FleetManagement />,
    },
    {
      name: 'Marine_Cargo_Insurance',
      title: t('Marine_Cargo_Insurance'),
      url: '/',
      icon: <MarineCargoInsuranceicon />,
    },

    {
      name: 'domestic-insurance',
      title: t('domestic_insurance'),
      url: DOMESTIC_INSURANCE_URL,
      icon: <DomesticIcon />,
    },
    {
      name: 'Medical_Malpractice_Insurance',
      title: t('Medical_Malpractice_Insurance'),
      url: TRAVEL_INSURANCE_URL,
      icon: <MedicalMalpracticeInsurance />,
    },
  ]

  return (
    <section className='w-full'>
      <ul className='flex w-full justify-start gap-1.5 overflow-x-auto overflow-y-hidden px-3 pb-3 scrollbar-none sm:justify-center'>
        {tabs.map((insuranceTab) => {
          return (
            <li key={insuranceTab.name} className='relative'>
              {insuranceTab.isActive && (
                <div
                  className={`absolute z-20 h-full w-full rounded-lg text-base-white before:absolute before:top-[-1px] before:h-[45px] before:w-[45px] before:rounded-tr-md before:bg-primary-6 before:[clip-path:polygon(0%_0%,100%_0%,100%_100%)] after:absolute after:top-1 after:text-sm after:font-bold after:uppercase ltr:before:right-[-1px] ltr:after:right-0 ltr:after:rotate-45 ltr:after:content-["new"] rtl:before:left-[-1px] rtl:before:rotate-[270deg] rtl:after:left-0 rtl:after:rotate-[315deg] rtl:after:content-["جديد"]`}
                />
              )}
              <Link
                href={insuranceTab.url}
                title={insuranceTab.title}
                className={cn(
                  [
                    'relative flex h-full w-full flex-col items-center justify-center gap-2 md:py-3',
                    'h-20 w-[126px] min-w-[126px] rounded-lg border-2 border-base-gray bg-base-gray md:h-[90px] md:w-[150px]',
                    'text-center text-sm font-bold capitalize text-neutral-5',
                  ],
                  insuranceTab.isActive && [
                    ' border-primary-6 bg-base-white shadow-[0_0_15px_rgba(0,0,0,0.13)]',
                    'before:absolute before:bottom-[-0.45rem] before:left-1/2 before:inline-block before:h-3',
                    'before:w-3 before:translate-x-[-50%] before:rotate-[135deg] before:rounded-sm before:border-0',
                    'before:border-r-2 before:border-t-2 before:border-primary-6 before:bg-base-white md:text-sm',
                  ]
                )}
              >
                <span className='flex h-[30px] max-h-[30px] w-[60px] items-center justify-center'>
                  {insuranceTab.icon}
                </span>
                <span className='block px-1 leading-extra-tight'>
                  {insuranceTab?.title}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
