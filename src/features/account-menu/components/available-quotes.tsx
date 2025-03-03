import React from 'react'
import AvailableQuotesCard from './available-quotes-card'
import { AvailableQuoteType } from '../resources/types'
import { useScopedI18n } from '@/shared/locales/client'
import Pagination from '@/features/fleet-details/fleet-list/components/pagination'
import { useAvailableQuotesQuery } from '../resources/get-available-quotes-list'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { AVAILABLE_QUOTES_PAGE_SIZE } from '@/shared/lib/constants'

import AvailableQuotesSkeleton from './available-quotes-skeleton'
import EmptyCard from './empty-card'
import PageRecoverState from '@/shared/ui-states/page-recover-state'

const AvailableQuotes = () => {
  const t = useScopedI18n('userAccount.userAccount.available_quotes')
  const clientQs = useClientQueryString()

  const pageNumberQueryString = clientQs.getByKey('pageNumber') || 1
  const pageNumber =
    pageNumberQueryString && +pageNumberQueryString > 0
      ? pageNumberQueryString
      : 1

  const {
    data: availableQuotes,
    isPending,
    isError,
    isFetching,
    refetch,
    isSuccess,
  } = useAvailableQuotesQuery({
    userId: 1,
    pageIndex: pageNumber as number,
  })

  const correlationId = availableQuotes?.correlationId

  const handlePageChange = (newPageIndex: number) => {
    clientQs.set([{ key: 'pageNumber', value: String(newPageIndex) }])
  }

  return (
    <div>
      <div>
        <p className='mb-6 text-xxl font-bold'>{t('available_quotes')}</p>
        {isError && <PageRecoverState isLoading={isFetching} retry={refetch} />}

        {isPending && <AvailableQuotesSkeleton />}

        {availableQuotes?.items.length == 0 ? (
          <EmptyCard
            title={t('no_quotes_to_show')}
            subtitle={t('you_can_get_quote')}
            btnText={t('get_quote')}
          />
        ) : (
          <div className='grid grid-cols-1 gap-6'>
            {availableQuotes?.items.map((item: AvailableQuoteType, index) => (
              <AvailableQuotesCard
                availableQuotesCardInfo={item}
                key={index}
                correlationId={correlationId}
              />
            ))}
          </div>
        )}

        <section className='flex justify-center '>
          {isSuccess && availableQuotes.metadata.pageCount > 1 && (
            <Pagination
              totalCount={availableQuotes?.metadata?.totalCount}
              pageIndex={+pageNumber}
              onPageChange={handlePageChange}
              pageSize={AVAILABLE_QUOTES_PAGE_SIZE}
              selectedButtonColor='blue'
            />
          )}
        </section>
      </div>
    </div>
  )
}

export default AvailableQuotes
