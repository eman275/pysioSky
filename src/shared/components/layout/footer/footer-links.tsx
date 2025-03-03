import SVGwhatsapp from '@/shared/components/icons/ui-whatsapp.svg'
import {
  CAR_INSURANCE_URL,
  DOMESTIC_INSURANCE_URL,
  HEALTH_INSURANCE_URL,
  TRAVEL_INSURANCE_URL,
} from '@/shared/lib/constants'

const footerLinks = [
  {
    title: 'products',
    links: [
      { label: 'car_insurance', href: CAR_INSURANCE_URL },
      { label: 'health_insurance', href: HEALTH_INSURANCE_URL },
      { label: 'travel_insurance', href: TRAVEL_INSURANCE_URL },
      { label: 'SME_Fleet_Insurance', href: TRAVEL_INSURANCE_URL },
      { label: 'medical_malpractice_insurance', href: DOMESTIC_INSURANCE_URL },
    ],
  },
  {
    title: 'support',
    links: [
      { label: 'contact_us', href: '/contact-us' },
      {
        label: 'privacy_policy',
        href: 'https://www.tameeni.com/privacy-policy',
      },
      {
        label: 'terms_conditions',
        href: 'https://www.tameeni.com/terms-and-conditions',
      },
      {
        label: 'customer_care_number',
        href: 'https://api.whatsapp.com/send?phone=9668002444455',
      },
      {
        label: '+966 800 244 4455',
        isAlwaysLtr: true,
        href: ' https://api.whatsapp.com/send?phone=9668002444455',
        icon: <SVGwhatsapp />,
      },
    ],
  },
  {
    title: 'resources',
    links: [
      { label: 'faqs', href: '/faq' },
      { label: 'central_bank_publications', href: '#' },
      { label: 'careers', href: '#' },
      { label: 'partners', href: '#' },
    ],
  },
]

export default footerLinks
