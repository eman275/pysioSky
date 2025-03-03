'use client'
import NextArrow from '@/shared/components/icons/next-arrow.svg'
import ResetIcon from '@/shared/components/icons/reset-customization.svg'
import DisabledReset from '@/shared/components/icons/disabled-reset.svg'
import { Button } from '@/shared/components/ui/button'
import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { useScopedI18n } from '@/shared/locales/client'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import ResetCustomizationModal from '../../components/shared-components/reset-customization-modal'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store' // Ensure correct import path
import { useQuoteCustomizationMutation } from '../resources/quotes-customization.mutation'
import React from 'react'

const PolicySummaryActions = () => {
  const t = useScopedI18n('application.quotations')
  const { isOpened, setIsOpened } = useDisclosure()
  const appParams = useAppParam()
  const { correlationId } = appParams

  const { deductibles, compCount } = useSingleQuoteStore((state) => ({
    deductibles: state.deductibles,
    compCount: state.compCount,
  }))

  const quoteCustomizationMutation = useQuoteCustomizationMutation()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [loading, setLoading] = useState<'proceed' | 'submit' | ''>('')

  const getModifiedDeductibles = useCallback((): {
    quoteVehicleReference: string
    selectedDeductibleReference: string
  }[] => {
    const modifiedDeductibles: {
      quoteVehicleReference: string
      selectedDeductibleReference: string
    }[] = []

    Object.values(deductibles).forEach(({ workshopOptions, agencyOptions }) => {
      workshopOptions.forEach((option) => {
        if (option.isModified) {
          modifiedDeductibles.push({
            quoteVehicleReference: option.vehicleRef,
            selectedDeductibleReference: option.value,
          })
        }
      })

      agencyOptions.forEach((option) => {
        if (option.isModified) {
          modifiedDeductibles.push({
            quoteVehicleReference: option.vehicleRef,
            selectedDeductibleReference: option.value,
          })
        }
      })
    })

    return modifiedDeductibles
  }, [deductibles])

  const submitHandler = useCallback(() => {
    setLoading('submit')
    const modifiedDeductibles = getModifiedDeductibles()
    if (modifiedDeductibles.length > 0) {
      const payload = {
        vehicles: modifiedDeductibles,
        correlationId,
      }
      quoteCustomizationMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Quote customized successfully!')
          queryClient.invalidateQueries({ queryKey: ['quotations'] })
          router.push(generateAppPath(appParams).QUOTATION_LIST_URL)
        },
      })
    } else {
      setLoading('')
      router.push(generateAppPath(appParams).QUOTATION_LIST_URL)
    }
  }, [
    appParams,
    correlationId,
    getModifiedDeductibles,
    queryClient,
    quoteCustomizationMutation,
    router,
  ])

  const resetHandler = useCallback(() => {
    setIsOpened(true)
  }, [setIsOpened])

  const proceedHandler = useCallback(() => {
    setLoading('proceed')
    const modifiedDeductibles = getModifiedDeductibles()
    if (modifiedDeductibles.length > 0) {
      const payload = {
        vehicles: modifiedDeductibles,
        correlationId,
      }
      quoteCustomizationMutation.mutate(payload, {
        onSuccess: () => {
          toast.success('Quote customized successfully!')
          queryClient.invalidateQueries({ queryKey: ['quotations'] })
        },
      })
    } else {
      router.push(generateAppPath(appParams).QUOTE_ADDITIONAL_DETAILS_URL)
    }
  }, [
    appParams,
    correlationId,
    getModifiedDeductibles,
    queryClient,
    quoteCustomizationMutation,
    router,
  ])

  return (
    <>
      <div className='mt-4 flex items-center justify-between gap-4 xl:mt-10'>
        <div className='hidden w-fit text-xxl text-primary-6 xl:flex'>
          <Button
            className='mt-3 h-fit w-full px-4 py-1 text-base'
            variant='text'
            size='M'
            startIcon={!compCount ? <DisabledReset /> : <ResetIcon />}
            onClick={resetHandler}
            disabled={!compCount}
          >
            {t('reset_to_default')}
          </Button>
        </div>
        <div className='flex w-full gap-4 self-stretch xl:w-fit'>
          <Button
            variant='outlined'
            colorScheme='secondary'
            size='S'
            className='min-w-[150px]'
            onClick={submitHandler}
            isLoading={loading === 'submit'}
          >
            {t('save_and_compare')}
          </Button>
          <Button
            className='flex min-w-[200px] flex-1'
            variant='solid'
            colorScheme='secondary'
            size='S'
            onClick={proceedHandler}
            isLoading={loading === 'proceed'}
          >
            {t('proceed_to_payment')}
            <div className='rtl:rotate-180'>
              <NextArrow />
            </div>
          </Button>
        </div>
      </div>
      <ResetCustomizationModal isOpened={isOpened} setIsOpened={setIsOpened} />
    </>
  )
}

export default PolicySummaryActions
