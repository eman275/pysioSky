'use client'
import WarningModal from '@/features/company-details/components/warning-modal'
import EditPenIcon from '@/shared/components/icons/edit-pen.svg'
import CollapseInfo from '@/shared/components/layout/collapse-info'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import { useCrNumberQuery } from '@/shared/resources/application/cr-number.mutation'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'
import { Button } from '../../ui/button'
import { Skeleton } from '../../ui/loader/skeleton'
import { useScopedI18n } from '@/shared/locales/client'

const CompanyInfoBar = () => {
  const [isOpened, setIsOpened] = useState(false)
  const router = useRouter()
  const tWords = useScopedI18n('common.words')
  const tCr = useScopedI18n('landing.cr_number_form')
  const tBasicDetails = useScopedI18n(
    'application.company-details.basic_details'
  )
  const tModal = useScopedI18n(
    'application.company-details.edit_cr_warning_modal'
  )

  const { crNumber, correlationId } = useAppParam()
  const { data, isPending: isLoadingCompanyInfo } = useCrNumberQuery({
    crNumber,
  })

  const { entityReference } = data ?? {}

  const navigateToEditForm = () => {
    const basicDetailsPathname = generateAppPath({
      crNumber,
      entityReference,
      correlationId,
    }).COMPANY_BASIC_URL

    router.push(`${basicDetailsPathname}?form-mode=edit`)
  }

  const showModal = () => {
    setIsOpened(true)
  }

  const handleCancel = () => {
    setIsOpened(false)
  }

  const onConfirm = () => {
    setIsOpened(false)
    navigateToEditForm()
  }

  const CompanyInfoSkeletonLoader = (props: PropsWithChildren) =>
    isLoadingCompanyInfo ? (
      <Skeleton className='h-4 w-28 bg-neutral-1' />
    ) : (
      props.children
    )

  const CompanyInfoItem = (props: { info?: string; title: string }) => (
    <p className='flex items-center gap-2'>
      <span>{props.title}:</span>
      <CompanyInfoSkeletonLoader>
        <span>{props.info}</span>
      </CompanyInfoSkeletonLoader>
    </p>
  )

  return (
    <div>
      <div
        className={`mb-4 hidden h-12  w-full justify-between rounded-md border bg-gray-200  px-6 py-3 text-base font-semibold lg:flex  `}
      >
        <div className='flex items-center gap-6'>
          <CompanyInfoItem title={tCr('cr_number')} info={data?.crNumber} />

          <Button
            onClick={showModal}
            variant='text'
            colorScheme='primary'
            size='S'
          >
            {tWords('edit')}
            <EditPenIcon className='text-primary-6' />
          </Button>
        </div>
        <VerticalLine />

        <CompanyInfoItem
          title={tBasicDetails('company_name')}
          info={data?.name}
        />

        <VerticalLine />

        <CompanyInfoItem
          title={tBasicDetails('cr_expiry_date')}
          info={data?.expiryDate}
        />
      </div>
      <div className='mb-4 block lg:hidden'>
        <CollapseInfo crNumberInfo={data!} onEditClick={showModal} />
      </div>

      <Dialog open={isOpened} onOpenChange={setIsOpened}>
        <DialogContent
          className={'w-full p-0 md:rounded-lg md:p-0 lg:w-[396px]'}
        >
          <div className='px-6 py-8'>
            <WarningModal
              onClickMainBtn={onConfirm}
              onClickSubMainBtn={handleCancel}
              title={tModal('title')}
              subTitle={tModal('description')}
              mainBtn={tModal('confirm_btn_text')}
              subBtn={tWords('cancel')}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CompanyInfoBar

const VerticalLine = () => <div className='border-l border-neutral-4' />
