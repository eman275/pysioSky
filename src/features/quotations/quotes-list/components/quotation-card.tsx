'use client'
import { Card, CardHeader, CardFooter } from '@/shared/components/ui/card'
import React from 'react'
import CompanyOfferCard from './company-offer-card'
import TermsAndConditions from './terms-and-conditions'
import QuoteHeader from '../../components/shared-components/quote-header'
import { QuotesStreamData, QuoteDetails } from '../../resources/quotation.types'

type Props = {
  quote: QuotesStreamData
}

const QuotationCard = ({ quote }: Props) => {
  return (
    <Card className='relative mb-4 '>
      <CardHeader className='flex w-full flex-col gap-2  border-neutral-2 pb-2 md:gap-4 md:pb-4'>
        <div className='flex justify-between lg:items-start'>
          <QuoteHeader company={quote.insuranceCompany} />
          <TermsAndConditions insuranceCompanyId={quote.insuranceCompany.id} />
        </div>
      </CardHeader>
      {quote.subQuotes.map((subQuote: QuoteDetails) => (
        <CardFooter
          key={subQuote.reference}
          className='mt-2 flex-col rounded-lg border  border-neutral-2 bg-neutral-1 '
        >
          <CompanyOfferCard quoteDetail={subQuote} />
        </CardFooter>
      ))}
    </Card>
  )
}

export default QuotationCard
