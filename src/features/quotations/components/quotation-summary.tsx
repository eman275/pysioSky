import React, { useMemo } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import { useCurrentLocale, useScopedI18n } from '@/shared/locales/client'
import COMPVehiclesCardsTab from './quotation-details-tabs/comp-vehicle-cards-tab'
import TplVehiclesCardsTab from './quotation-details-tabs/tpl-vehicle-cards-tab'
import WarningCardAlert from './shared-components/warning-card-alert'
import PolicyDetailsTab from './quotation-details-tabs/policy-details-tab'
import BenefitsTab from './quotation-details-tabs/benefits-tab'
import QuoteHeader from './shared-components/quote-header'
import { cn, formatThousandsSeparators } from '@/shared/lib/utils'
import PageRecoverState from '@/shared/ui-states/page-recover-state'
import QuotationDetailSkeleton from './quotation-details-tabs/quotation-details-skeleton'
import useSingleQuoteStore from '../quotes-list/hooks/use-single-quote-store'
import useGetQuoteQuery from '../quotes-list/resources/use-get-quote.query'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import useAlertMessage from '@/shared/hooks/use-alert-message'

const QuotationSummary = () => {
  const t = useScopedI18n('application.quotations')
  const tUnits = useScopedI18n('common.units')
  const locale = useCurrentLocale()
  const clientQs = useClientQueryString()
  const quoteReference = clientQs.getByKey('subQuote')
  const { isLoading, refetch, isRefetching, isError, isSuccess } =
    useGetQuoteQuery({ quoteReference: quoteReference as string })
  const {
    compCount,
    tplCount,
    insuranceCompany,
    totalDeductibleAmount,
    tplDetails,
    compVehicles,
  } = useSingleQuoteStore(
    ({
      compCount,
      tplCount,
      insuranceCompany,
      totalDeductibleAmount,
      tplDetails,
      compVehicles,
    }) => ({
      compCount,
      tplCount,
      insuranceCompany,
      totalDeductibleAmount,
      tplDetails,
      compVehicles,
    })
  )

  const modifiedVehicles = useMemo(
    () =>
      [...(tplDetails?.vehicles || []), ...(compVehicles || [])].map((v) => ({
        isEstimatedValueModified: v.isEstimatedValueModified,
        isInsuranceTypeModified: v.isInsuranceTypeModified,
      })),
    [tplDetails, compVehicles]
  )

  const alertMessageContent = useAlertMessage(modifiedVehicles)

  const tabDirection = locale === 'en' ? 'ltr' : 'rtl'

  // Conditionally create tab triggers based on availability of details
  const tabTriggers = [
    { value: 'policy_details', label: t('quotation_summary.policy_details') },
    { value: 'benefits', label: t('quotation_summary.benefits') },
    ...(compCount
      ? [
          {
            value: 'COMP_vehicles',
            label: t('quotation_summary.comp_vehicles', {
              total: compCount,
            }),
          },
        ]
      : []),
    ...(tplCount
      ? [
          {
            value: 'TPL_vehicles',
            label: t('quotation_summary.tpl_vehicles', {
              total: tplCount,
            }),
          },
        ]
      : []),
  ]

  const QuotationSummaryHeader = insuranceCompany && (
    <div className='flex items-center justify-between lg:mb-6'>
      <QuoteHeader company={insuranceCompany} />
      <div className='text-end'>
        <p className='text-xs text-neutral-5 lg:text-sm lg:font-semibold'>
          {t('quotation_summary.quotation_price')}
        </p>
        <p className='text-lg font-bold text-neutral-7 lg:text-xxxl'>
          {tUnits('SAR')}{' '}
          {formatThousandsSeparators(totalDeductibleAmount, true)}
        </p>
      </div>
    </div>
  )

  if (isError)
    return (
      <PageRecoverState
        description='Failed to load quote details'
        title='Something went wrong'
        retry={refetch}
        isLoading={isRefetching}
      />
    )

  if (isLoading) {
    return <QuotationDetailSkeleton />
  }

  return (
    isSuccess && (
      <div>
        {QuotationSummaryHeader}
        <Tabs defaultValue='policy_details' dir={tabDirection}>
          <TabsList
            className={cn(
              'mb-4 grid w-full gap-4 rounded-lg border',
              tabTriggers.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
            )}
          >
            {tabTriggers.map((tab) => (
              <TabsTrigger
                key={tab.value}
                className='gap-2 py-3 text-sm text-base-black data-[state=active]:bg-primary-6 data-[state=active]:text-base-white'
                value={tab.value}
              >
                <span className='flex text-xxs font-bold lg:text-sm'>
                  {tab.label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabTriggers.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.value !== 'benefits' && alertMessageContent && (
                <WarningCardAlert
                  enableCloseIcon
                  title='alert'
                  message={alertMessageContent}
                  isDismissible
                />
              )}

              {tab.value === 'policy_details' && <PolicyDetailsTab />}
              {tab.value === 'benefits' && <BenefitsTab />}
              {tab.value === 'COMP_vehicles' && <COMPVehiclesCardsTab />}
              {tab.value === 'TPL_vehicles' && <TplVehiclesCardsTab />}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  )
}

export default QuotationSummary
