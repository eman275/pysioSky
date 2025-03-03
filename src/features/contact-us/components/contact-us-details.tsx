'use client'

import Email from '@/shared/components/icons/contact-us-email.svg'
import Mobile from '@/shared/components/icons/contact-us-mobile.svg'
import WhatsApp from '@/shared/components/icons/contact-whats-app.svg'
import { useScopedI18n } from '@/shared/locales/client'
import { ComponentProps } from 'react'
import ContactUsItem from './contact-us-item'

const ContactUsDetails = () => {
  const tContact = useScopedI18n('contact-us')

  return (
    <div className='flex flex-col gap-4 lg:flex-row'>
      {CONTACT_OPTIONS_LIST.map((item) => (
        <ContactUsItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          description={tContact(item.description)}
          onClick={item.onClick}
          isAlwaysLtr={item.isAlwaysLtr}
        />
      ))}
    </div>
  )
}

export default ContactUsDetails

const CONTACT_OPTIONS_LIST = [
  {
    icon: <WhatsApp />,
    title: '+966920011021',
    description: 'whatsapp_description',
    onClick: () => window.open('https://wa.me/966920011021', '_blank'),
    isAlwaysLtr: true,
  },
  {
    icon: <Email />,
    title: 'support@tameeni.com',
    description: 'email_description',
    onClick: () => (window.location.href = 'mailto:support@tameeni.com'),
    isAlwaysLtr: false,
  },
  {
    icon: <Mobile />,
    title: '8002444455',
    description: 'customer_service_description',
    onClick: () => (window.location.href = 'tel:8002444455'),
    isAlwaysLtr: true,
  },
] as const satisfies ComponentProps<typeof ContactUsItem>[]
