'use client'
import { Button } from '@/shared/components/ui/button'
import React from 'react'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet'
import QuotationSummary from '../quotation-summary'
import NextArrow from '@/shared/components/icons/next-arrow.svg'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import { useRouter } from 'next/navigation'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ViewDetailsSheet = ({ isOpen, setIsOpen }: Props) => {
  const t = useScopedI18n('application.quotations')
  const clientQs = useClientQueryString()
  const subQuoteReference = clientQs.getByKey('subQuote')
  const router = useRouter()
  const {
    crNumber,
    applicationReference,
    entityReference: entityReference,
    correlationId,
    quoteRequestReference,
  } = useAppParam()

  const locale = useCurrentLocale()
  const { isLarge } = useScreenSize()
  const isRight = locale == 'ar' ? 'left' : 'right'
  const sheetSide = isLarge ? isRight : 'bottom'

  const handleSelectAndCustomize = () => {
    router.replace(
      generateAppPath({
        crNumber,
        entityReference,
        correlationId,
        applicationReference,
        quoteRequestReference,
        quoteReference: subQuoteReference as string,
      }).QUOTE_CUSTOMIZATION_URL
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className='flex h-[94vh] w-full flex-col rounded-lg lg:h-full lg:w-[60vw] 2xl:w-[50vw]'
        side={sheetSide}
      >
        <SheetHeader>
          <SheetTitle>
            <div className='mb-4 flex items-center justify-center lg:justify-between'>
              <p className='text-xxl font-bold'>
                {t('quotation_summary.title')}
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <section className='mb-20 grow lg:mb-6'>
          <QuotationSummary />
        </section>

        <Button
          className='fixed inset-x-0 bottom-0 ms-auto lg:static'
          variant='solid'
          colorScheme='secondary'
          size='S'
          onClick={handleSelectAndCustomize}
        >
          {t('select_customize')}
          <div className='rtl:rotate-180'>
            <NextArrow />
          </div>
        </Button>
      </SheetContent>
    </Sheet>
  )
}

export default ViewDetailsSheet
