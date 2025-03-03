'use client'

import useAppParam from '@/shared/hooks/use-app-params'
import useGetQuotesStreamQuery from './resources/get-quotes-stream.mutation'
import { useGetQuotesQuery } from './resources/get-quotes.mutation'
import RasanInformation from './components/rasan-information'
import ImportantNoteFlag from './components/important-note-flag'
import WarningCardAlert from '../components/shared-components/warning-card-alert'
import QuoteRequestLoader from './components/quote-request-loader'
import EmptyQuotesCard from './components/empty-quotes-card'
import QuotationCard from './components/quotation-card'
import QuoteCardSkeleton from './components/quote-card-skeleton'
import PageRecoverState from '@/shared/ui-states/page-recover-state'
import { useGetQuoteRequestQuery } from './resources/get-quotes-reference.query'
import QuoteRequestId from '../components/shared-components/quote-request-id'
import React from 'react'

const QuotationPage = () => {
  const { quoteRequestReference } = useAppParam()

  // check if we can stream to switch between stream or get list without streaming
  const { data, isPending: isLoadingQuoteRequest } = useGetQuoteRequestQuery({
    getExistingQuote: true,
  })
  const isStreamMode = data?.canStream
  // Fetch quotes stream and list
  const {
    data: stream,
    isSuccess: streamSucceeded,
    isError: streamError,
    isPending: isStreaming,
    refetch: retryStreaming,
  } = useGetQuotesStreamQuery({
    quoteRequestReference,
    canStream: isStreamMode,
    canStreamForSeconds: data?.canStreamForSeconds,
  })

  const {
    data: list,
    isSuccess: listSucceeded,
    isError: listError,
    refetch: refetchList,
    isLoading: isLoadingList,
    isRefetching: isRefetchingList,
  } = useGetQuotesQuery({
    quoteRequestReference,
    enabled: isStreamMode,
  })

  const emptyQuotes =
    Object.keys(stream?.data || {}).length === 0 &&
    Object.keys(list?.data || {}).length === 0

  // empty state
  if ((listSucceeded || streamSucceeded) && !isStreaming && emptyQuotes) {
    return (
      <section className='pb-14 pt-0'>
        <EmptyQuotesCard />
      </section>
    )
  }
  // loading state
  if (
    (isStreaming ||
      isLoadingQuoteRequest ||
      isLoadingList ||
      streamSucceeded) &&
    emptyQuotes
  ) {
    return (
      <section className='pb-14 pt-0'>
        <QuoteRequestLoader />
      </section>
    )
  }

  const requestId = data?.quoteRequestCode
  const quotesCount = Object.values(stream?.data || list?.data || {}).length

  // error state
  if ((listError || streamError) && !isStreaming) {
    return (
      <PageRecoverState
        description='Failed to load quotes'
        title='Something went wrong'
        retry={listError ? refetchList : retryStreaming}
        isLoading={listError ? isRefetchingList : isStreaming}
      />
    )
  }

  return (
    <div>
      {/* Display information and alerts when quotes are available */}
      {!emptyQuotes && (
        <>
          <RasanInformation />
          <QuoteRequestId quotesCount={quotesCount} requestId={requestId} />

          <ImportantNoteFlag />
          <WarningCardAlert title='alert' enableCloseIcon isDismissible />
        </>
      )}
      <section className='pb-14 pt-4'>
        {/* Render fetched quotes */}
        {!emptyQuotes &&
          Object.values(stream?.data || list?.data || {}).map((quote) => (
            <QuotationCard key={quote.reference} quote={quote} />
          ))}
        {/* Display skeletons if streaming is in progress */}
        {streamSucceeded && isStreaming && !emptyQuotes && isStreamMode && (
          <QuoteCardSkeleton />
        )}
      </section>
    </div>
  )
}

export default QuotationPage
