'use client'
import NextBtn from '@/shared/components/ui/next-btn'
import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { useRouter } from 'next/navigation'
import {
  CreateQuotesPayload,
  useCreateQuotesMutation,
} from '../../resources/create-quotes.mutation'
import useFleetListStore from '../hooks/use-fleet-list-store'
import useAppNavigationLoader from '@/shared/hooks/use-app-navigation-loader'
import React from 'react'
export default function FleetListNextButton() {
  const { isNavigating, setIsNavigating } = useAppNavigationLoader()
  const router = useRouter()
  const {
    crNumber,
    applicationReference,
    entityReference: entityReference,
    correlationId,
  } = useAppParam()

  const clientQs = useClientQueryString()
  const hideApplicationItems = clientQs.getByKey('action')

  const createQuotesMutation = useCreateQuotesMutation()

  const {
    selectedItems,
    setActiveContent,
    toggleDialog,
    vehiclesList: list,
    totalErrors,
  } = useFleetListStore()
  const fleetListLength = list?.length || 0
  const isEmptyFleetList = fleetListLength <= 0

  const nextButtonHandler = () => {
    if (totalErrors) {
      setActiveContent('can-not-proceed')
      toggleDialog(true)
      return
    }

    if (selectedItems.length > 0) {
      setActiveContent('selection-warning')
      toggleDialog(true)
      return
    }

    const payload = {
      forceNew: true,
    } satisfies CreateQuotesPayload

    createQuotesMutation.mutate(payload, {
      onSuccess: (data) => {
        setIsNavigating(true)
        router.replace(
          generateAppPath({
            crNumber,
            entityReference,
            correlationId,
            applicationReference,
            quoteRequestReference: data.data.quoteRequestReference,
          }).QUOTATION_LIST_URL
        )
      },
    })
  }

  return (
    <>
      {!isEmptyFleetList && !hideApplicationItems && (
        <div className='mt-6 border-t'>
          <NextBtn
            isLoading={createQuotesMutation.isPending || isNavigating}
            onClickNextBtn={nextButtonHandler}
          />
        </div>
      )}
    </>
  )
}
