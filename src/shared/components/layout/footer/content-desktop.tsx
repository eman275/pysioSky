import React from 'react'
import { getScopedI18n } from '@/shared/locales/server'
import footerLinks from './footer-links'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'

export const ContentDesktop = async () => {
  const t = await getScopedI18n('common.footer')

  return (
    <div className='hidden w-full lg:block lg:w-2/3'>
      <div className='flex flex-col lg:flex-row'>
        {footerLinks.map((column, index) => {
          return (
            <div className='lg:w-1/3' key={index}>
              <h4 className='mb-2 text-base font-bold uppercase text-neutral-6 lg:mb-4'>
                {t(column.title as keyof typeof t)}
              </h4>
              <ul className='flex-col gap-1 lg:flex'>
                {column.links.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className={cn(
                          'capitalize',

                          link.icon &&
                            'mt-1 flex items-center gap-3 font-bold text-neutral-6'
                        )}
                        // target='_blank'
                      >
                        {link.icon}
                        <span dir={link.isAlwaysLtr ? 'ltr' : undefined}>
                          {t(link.label as keyof typeof t)}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
