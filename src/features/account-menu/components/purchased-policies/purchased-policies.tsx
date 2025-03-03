import Pagination from '@/features/fleet-details/fleet-list/components/pagination'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { PURCHASED_POLICIES_PAGE_SIZE } from '@/shared/lib/constants'
import { useScopedI18n } from '@/shared/locales/client'
import PageRecoverState from '@/shared/ui-states/page-recover-state'
import { usePurchasedPoliciesQuery } from '../../resources/get-purchased-policies-list'
import { PurchasedPoliciesType } from '../../resources/types'
import EmptyCard from '../empty-card'
import PurchasedPoliciesCard from './purchased-policies-card'
import PurchasedPoliciesSkeletonCard from './purchased-policies-skeleton'
import PurchasedPoliciesStatusTabs from './purchased-policies-status-tabs'

const PurchasedPolicies = () => {
  const t = useScopedI18n('userAccount.userAccount')
  const clientQs = useClientQueryString()
  const pageNumberQueryString = clientQs.getByKey('pageNumber')
  const pageNumber =
    pageNumberQueryString && +pageNumberQueryString > 0
      ? pageNumberQueryString
      : 1

  const {
    data: purchasedPoliciesList,
    isPending,
    isError,
    isFetching,
    refetch,
    isSuccess,
  } = usePurchasedPoliciesQuery({
    userId: 1,
    pageIndex: Number(pageNumber),
  })

  const handlePageChange = (newPageIndex: number) => {
    clientQs.set([{ key: 'pageNumber', value: String(newPageIndex) }])
  }

  return (
    <div>
      <div>
        <p className='mb-6 text-xxl font-bold'>{t('purchased_policies')}</p>
        <PurchasedPoliciesStatusTabs />
        {isError && <PageRecoverState isLoading={isFetching} retry={refetch} />}

        {isPending && <PurchasedPoliciesSkeletonCard />}

        {purchasedPoliciesList?.items.length == 0 ? (
          <EmptyCard
            title={t('no_policies')}
            subtitle={t('you_can_start_buying')}
            btnText={t('buy_policy')}
          />
        ) : (
          <div className='grid grid-cols-1 gap-6'>
            {purchasedPoliciesList?.items.map(
              (item: PurchasedPoliciesType, index) => (
                <PurchasedPoliciesCard
                  key={index}
                  purchasedPoliciesInfo={item}
                  correlationId={purchasedPoliciesList?.correlationId}
                />
              )
            )}
          </div>
        )}

        <section className='flex justify-center '>
          {isSuccess && purchasedPoliciesList.metadata.pageCount > 1 && (
            <Pagination
              totalCount={purchasedPoliciesList?.metadata?.totalCount}
              pageIndex={+pageNumber}
              onPageChange={handlePageChange}
              pageSize={PURCHASED_POLICIES_PAGE_SIZE}
              selectedButtonColor='blue'
            />
          )}
        </section>
      </div>
    </div>
  )
}

export default PurchasedPolicies
