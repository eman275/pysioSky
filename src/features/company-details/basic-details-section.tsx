'use client'
import EditPen2Icon from '@/shared/components/icons/edit-pen-2.svg'
import CalenderIcon from '@/shared/components/icons/calendar.svg'
import { Input } from '@/shared/components/ui/input'
import NextBtn from '@/shared/components/ui/next-btn'
import { useState } from 'react'

import EditCrNumber from '@/feat/company-details/components/edit-cr-number'
import useAppParam from '@/shared/hooks/use-app-params'
import { useScopedI18n } from '@/shared/locales/client'
import {
  QueryCrNumberResponse,
  useCrNumberQuery,
} from '@/shared/resources/application/cr-number.mutation'
import CrImageModal from '../landing/components/cr-image-modal'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import { useRouter } from 'next/navigation'
import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { Button } from '@/shared/components/ui/button'
import useAppNavigationLoader from '@/shared/hooks/use-app-navigation-loader'

const CompanyBasicDetails = () => {
  const router = useRouter()
  const { crNumber, correlationId } = useAppParam()
  const { setIsNavigating, isNavigating } = useAppNavigationLoader()
  const tCrForm = useScopedI18n('landing.cr_number_form')
  const tBasicDetails = useScopedI18n(
    'application.company-details.basic_details'
  )
  const clientQs = useClientQueryString()

  const defaultMode = clientQs.getByKey('form-mode')
  const [isEdit, setIsEdit] = useState<boolean>(defaultMode === 'edit')

  const { data } = useCrNumberQuery({ crNumber })

  const onSubmit = () => {
    setIsNavigating(true)
    const { crNumber, entityReference } =
      data as unknown as QueryCrNumberResponse
    const additionalDetailsURL = generateAppPath({
      crNumber,
      entityReference,
      correlationId,
    }).ADDITIONAL_DETAILS_URL

    router.push(additionalDetailsURL)
  }

  const onClickEditIcon = () => {
    setIsEdit(!isEdit)
  }

  if (isEdit) return <EditCrNumber />

  return (
    <div className='px-3 lg:px-0'>
      <div className='mb-2 flex items-center gap-2'>
        <p className='me-2 text-sm font-bold'>{tCrForm('company_cr_number')}</p>
        <CrImageModal />
      </div>

      <div className='relative'>
        <Input
          type='text'
          id='crNumber'
          name='crNumber'
          maxLength={10}
          value={data?.crNumber}
          required
          className={`mb-4 w-full  rounded-md border bg-gray-200 px-3 py-2  text-base`}
          readOnly
          hasIcon
          inputSuffix={
            <Button size={'link'} onClick={onClickEditIcon} variant='unstyled'>
              <EditPen2Icon />
            </Button>
          }
        />
      </div>
      <div className='mb-2 flex items-center justify-between'>
        <p className='text-sm font-bold'>{tBasicDetails('company_name')}</p>
      </div>
      <Input
        type='text'
        id='companyName'
        name='companyName'
        value={data?.name}
        readOnly
        className={` mb-4 w-full rounded-md border bg-gray-200 px-3  py-2  text-base`}
      />
      <div className='mb-2 flex items-center justify-between'>
        <p className='text-sm font-bold'>{tBasicDetails('cr_expiry_date')}</p>
      </div>

      <div className='relative'>
        <div className='absolute  left-2 top-[37%] h-4 w-4 -translate-y-1/2'>
          <CalenderIcon />
        </div>
        <Input
          type='text'
          id='expireDate'
          name='expireDate'
          value={data?.expiryDate}
          required
          className={`mb-4 w-full  rounded-md border bg-gray-200 px-8 py-2  text-base`}
          readOnly
        />
      </div>
      <NextBtn onClickNextBtn={onSubmit} isLoading={isNavigating} />
    </div>
  )
}

export default CompanyBasicDetails
