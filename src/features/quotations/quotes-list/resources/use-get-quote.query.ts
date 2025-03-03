import { useEffect } from 'react'
import useAppParam from '@/shared/hooks/use-app-params'
import useClientApi from '@/shared/hooks/use-client-api'
import { generateQueryString } from '@/shared/lib/helpers/generate-query-string'
import useAppQuery from '@/shared/lib/helpers/resources/use-app-query'
import { SingleQuoteResponse } from '../../resources/quotation.types'
import { generateSingleQuoteQueryKey } from './quotations.helpers'
import useSingleQuoteStore from '../hooks/use-single-quote-store'
import { getDeductibleOptions } from '../../quote-customization/helpers'

type Payload = {
  quoteReference?: string
}

const useGetQuoteQuery = (payload?: Payload) => {
  const setQuoteData = useSingleQuoteStore((state) => state.setQuoteData)
  const { quoteReference } = useAppParam()
  const { API } = useClientApi()
  const { correlationId, quoteRequestReference } = useAppParam()

  const reference = payload?.quoteReference ?? quoteReference
  const params = generateQueryString([
    { key: 'quoteRequestReference', value: quoteRequestReference },
    {
      key: 'SubQuoteResponseReference',
      value: reference,
    },
    { key: 'correlationId', value: correlationId },
  ])

  const quoteGetRequest = async () => {
    const response = await API.get<SingleQuoteResponse>(
      `/api/quotes/details${params}`
    )
    return {
      ...response.data?.quote?.subQuotes?.[0],
      insuranceCompany: response.data?.quote?.insuranceCompany,
    }
  }

  const query = useAppQuery({
    queryKey: generateSingleQuoteQueryKey(reference),
    queryFn: quoteGetRequest,
    enabled: Boolean(reference),

    select(data) {
      const deductibles = getDeductibleOptions(data.compDetails?.vehicles ?? [])
      const modifiedData = {
        vatPercentage: data.vatPercentage,
        tplCount: data.tplDetails?.vehicleCount,
        compCount: data.compDetails?.vehicleCount,
        originalTotalAmount: data.originalTotalAmount,
        isModified: data.isModified,
        deductibles,
        compFeatures: data.compDetails?.features,
        tplFeatures: data.tplDetails?.features,
        compVehicles: data.compDetails?.vehicles,
        tplDetails: data.tplDetails,
        insuranceCompany: data.insuranceCompany,
        policyEffectiveDate: data.policyEffectiveDate,
        policyExpiryDate: data.policyExpiryDate,
      }
      return modifiedData
    },
  })

  const { isSuccess, data } = query

  useEffect(() => {
    if (isSuccess && data) {
      setQuoteData(data)
    }
  }, [data, isSuccess, setQuoteData])

  return query
}

export default useGetQuoteQuery
