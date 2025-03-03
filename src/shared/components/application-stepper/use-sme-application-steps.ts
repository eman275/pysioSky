'use client'
import useAppParam from '@/shared/hooks/use-app-params'
import {
  generateAppPath,
  generatePublicPaths,
} from '@/shared/hooks/use-app-routes'
import { useScopedI18n } from '@/shared/locales/client'
import {
  AdditionalDetailsStepsNumberEnum,
  CompanyDetailsStepsNumberEnum,
  FleetDetailsStepsNumberEnum,
  ParentStepNumberEnum,
  QuoteDetailsStepsNumberEnum,
  StepContract,
  SummaryDetailsStepsEnum,
} from '@/shared/types/stepper.types'
import { useRouter } from 'next/navigation'

const useSMEApplicationSteps = () => {
  const tStepper = useScopedI18n('application.stepper')
  const router = useRouter()
  const appParams = useAppParam()

  const steps: StepContract[] = [
    {
      title: tStepper('company_details'),
      index: ParentStepNumberEnum.Company_Details,
      matchPattern: /company-details/g,
      nestedSteps: [
        {
          title: tStepper('basic_details'),
          index: CompanyDetailsStepsNumberEnum.BASIC_DETAILS,
          matchPattern: /basic-details/g,
          goBack: () => {
            router.push(generatePublicPaths().HOME)
          },
        },
        {
          title: tStepper('additional_details'),
          index: CompanyDetailsStepsNumberEnum.ADDITIONAL_DETAILS,
          matchPattern: /additional-details/g,
          goBack: () => {
            router.push(generateAppPath(appParams).COMPANY_BASIC_URL)
          },
        },
      ],
    },

    {
      title: tStepper('fleet_details'),
      index: ParentStepNumberEnum.FLEET_DETAILS,
      matchPattern: /fleet-details/g,
      nestedSteps: [
        {
          title: tStepper('select_method'),
          index: FleetDetailsStepsNumberEnum.SELECT_METHOD,
          matchPattern: /select-method/g,
          goBack: () => {
            router.push(generateAppPath(appParams).ADDITIONAL_DETAILS_URL)
          },
        },
        {
          title: tStepper('insert_fleet_details'),
          index: FleetDetailsStepsNumberEnum.INSERT_FLEET_DETAILS,
          matchPattern: /insert-your-fleet-details/g,
          goBack: () => {
            router.push(generateAppPath(appParams).SELECTED_METHOD)
          },
        },
      ],
    },
    {
      title: tStepper('quotations'),
      index: ParentStepNumberEnum.QUOTES,
      matchPattern: /quotes/g,
      nestedSteps: [
        {
          title: tStepper('quotes_list'),
          index: QuoteDetailsStepsNumberEnum.QUOTATION_LIST,
          matchPattern: /quotation-list/g,
          goBack: () => {
            router.push(
              generateAppPath(appParams).INSERT_YOUR_FLEET_DETAILS_URL
            )
          },
        },
        {
          title: tStepper('quote_customization'),
          index: QuoteDetailsStepsNumberEnum.SELECT_QUOTE,
          matchPattern: /quotes-customization/g,
          goBack: () => {
            router.push(generateAppPath(appParams).QUOTATION_LIST_URL)
          },
        },
      ],
    },
    {
      title: tStepper('additional_details'),
      index: ParentStepNumberEnum.ADDITIONAL_DETAILS,
      matchPattern: /additional-details/g,
      nestedSteps: [
        {
          title: tStepper('required_details'),
          index: AdditionalDetailsStepsNumberEnum.ADDITIONAL_DETAILS_SECTION,
          matchPattern: /additional-details/g,
        },
      ],
      goBack: () => {
        router.push(generateAppPath(appParams).QUOTATION_LIST_URL)
      },
    },
    {
      title: tStepper('summary_contract'),
      index: ParentStepNumberEnum.POLICY_SUMMARY,
      matchPattern: /policy-summary/g,
      nestedSteps: [
        {
          title: tStepper('review_policy_details'),
          index: SummaryDetailsStepsEnum.POLICY_SUMMARY,
          matchPattern: /policy-summary/g,
        },
      ],

      goBack: () => {
        router.push(generateAppPath(appParams).QUOTE_ADDITIONAL_DETAILS_URL)
      },
    },
  ] as const

  return steps
}
export default useSMEApplicationSteps
