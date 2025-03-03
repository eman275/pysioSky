import React from 'react'
import { getScopedI18n } from '@/shared/locales/server'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'
import footerLinks from './footer-links'
import Link from 'next/link'

export const ContentMobile = async () => {
  const t = await getScopedI18n('common.footer')

  return (
    <Accordion
      collapsible
      type='single'
      className='mb-4 flex flex-col lg:hidden'
    >
      {footerLinks.map((column, index) => {
        return (
          <AccordionItem
            value={column.title}
            key={index}
            className='rounded-none border-x-0 border-b border-t-0 border-neutral-2 px-2 py-0'
          >
            <AccordionTrigger className='uppercase text-neutral-6'>
              {t(column.title as keyof typeof t)}
            </AccordionTrigger>
            <AccordionContent>
              <ul className='flex-col gap-1 lg:flex'>
                {column.links.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link href={link.href} className='capitalize'>
                        {t(link.label as keyof typeof t)}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
