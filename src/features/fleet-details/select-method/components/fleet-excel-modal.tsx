'use client'
import {
  useDownloadExcelTemplateQuery,
  useUploadExcelMutation,
} from '@/feat/fleet-details/resources/upload-and-download-excel-file.mutation'
import ErrorIcon from '@/shared/components/icons/error-icon.svg'
import ExcelSheet from '@/shared/components/icons/excel-sheet.svg'
import ErrorUploadError from '@/shared/components/icons/excel-upload-error.svg'
import InfoIcon from '@/shared/components/icons/info-icon.svg'
import ReplaceIcon from '@/shared/components/icons/replace-icon.svg'

import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogCloseX,
  DialogContent,
} from '@/shared/components/ui/dialog'
import { Spinner } from '@/shared/components/ui/loader/spinner'
import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import { useFileDownload } from '@/shared/hooks/use-file-download'
import {
  EXCEL_UPLOAD_ERROR_CODES,
  ExcelUploadErrorCodeKey,
} from '@/shared/lib/constants'
import { useScopedI18n } from '@/shared/locales/client'
import { ModalProps } from '@/shared/types/components.types'
import { DialogProps } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { UploadExcelPayload } from '../../resources/upload-and-download-excel-file.mutation'
import { SelectMethodContent } from '../../fleet-details.types'

type Props = {
  activeContent: SelectMethodContent
  setActiveContent: (content: SelectMethodContent) => void
  reset: boolean
} & ModalProps

const FleetExcelModal = ({
  isOpened,
  setIsOpened,
  activeContent,
  setActiveContent,
  reset,
}: Props) => {
  const t = useScopedI18n('common.error.excel_errors')
  const tran = useScopedI18n('application.fleetDetails')

  const [errorCode, setErrorCode] = useState<
    keyof typeof EXCEL_UPLOAD_ERROR_CODES | ''
  >('')
  const [errorRowsMessage, setErrorRowsMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const fileNameRef = useRef<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const router = useRouter()
  const {
    correlationId,
    crNumber,
    entityReference: entityReference,
    applicationReference: applicationReference,
  } = useAppParam()
  const { data, refetch, isFetching } = useDownloadExcelTemplateQuery()
  const { downloadHandler, isFetching: pending } = useFileDownload({
    data,
    refetch,
    isFetching,
  })
  const { mutation: uploadFileMutation, progress } = useUploadExcelMutation()

  const onHowItWorksIconClick = () => {
    setActiveContent('how-it-works')
  }

  const handleDialogChange: DialogProps['onOpenChange'] = (open) => {
    if (open === false) {
      setActiveContent('excel-actions')
    }
    setIsOpened(open)
  }

  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      uploadFileMutation.reset()
      setActiveContent('excel-actions')
    }
    setIsOpened(false)
  }
  const resetExcelHandler = (
    action: 'add' | 'reset',
    type: 'manual' | 'excel'
  ) => {
    const baseUrl = generateAppPath({
      crNumber,
      entityReference,
      correlationId,
      applicationReference,
    }).INSERT_YOUR_FLEET_DETAILS_URL

    if (action === 'add') {
      return router.push(baseUrl)
    }
    if (type === 'manual') {
      const url = new URL(baseUrl, window.location.origin)
      url.searchParams.set('action', 'reset')
      return router.push(url.toString())
    }
    setActiveContent('excel-actions')
  }

  const onUploadHandler = () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) return

    fileNameRef.current = file.name
    const extension = file?.name.split('.').pop()?.toLowerCase()
    const isExcel = file && ['xls', 'xlsx', 'csv'].includes(extension || '')
    // fail early patterns simplifies if conditions
    if (!isExcel) {
      return setActiveContent('file-not-supported')
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setActiveContent('upload-loader')
    const payload = {
      file,
      signal: controller.signal,
      reset,
    } satisfies UploadExcelPayload

    uploadFileMutation.mutate(payload, {
      onSuccess: () => {
        router.push(
          generateAppPath({
            crNumber,
            entityReference,
            correlationId,
            applicationReference,
          }).INSERT_YOUR_FLEET_DETAILS_URL
        )
      },
      onError: (error) => {
        setActiveContent('upload-error')
        const errorCode = error.response?.data
          .errorCode as unknown as ExcelUploadErrorCodeKey
        setErrorCode(errorCode)
        setErrorRowsMessage((error.response?.data?.errors || []).join(','))
      },
    })
  }

  const ExcelActionsContent = (
    <section className='flex flex-col'>
      <div className='mb-8 flex flex-col items-center justify-center'>
        <ExcelSheet />
        <p className='mb-2 mt-6 text-base font-bold'>
          {tran('upload_excel_modal.title')}
        </p>
        <p className='text-xs'> {tran('upload_excel_modal.sub_title')}</p>
        <p className='mb-6 text-center text-sm text-neutral-5'>
          {tran('upload_excel_modal.description')}
        </p>
        <Button
          className=' mb-3 w-full'
          variant='glassy'
          colorScheme='secondary'
          size='XS'
          onClick={downloadHandler}
          isLoading={pending}
        >
          {tran('upload_excel_modal.btn_download')}
        </Button>
        <input
          type='file'
          accept='.xls,.xlsx,.csv'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={onUploadHandler}
        />
        <Button
          className='w-full '
          variant='solid'
          colorScheme='secondary'
          size='XS'
          onClick={() => fileInputRef.current?.click()}
        >
          {tran('upload_excel_modal.btn_upload')}
        </Button>
      </div>

      <div
        onClick={onHowItWorksIconClick}
        className='flex cursor-pointer items-center justify-center gap-2  border-t-[1px] border-t-neutral-3 pt-6 text-center'
      >
        <p className='text-sm font-bold'>
          {tran('upload_excel_modal.how_it_works')}
        </p>
        <div>
          <InfoIcon />
        </div>
      </div>
    </section>
  )

  const HowItWorksContent = (
    <div className='flex flex-col  justify-center '>
      <div className='mb-4 flex flex-col  items-center justify-center'>
        <div className='mb-6 rounded-full bg-warning-1 p-4'>
          <InfoIcon />
        </div>
        <p className='font-bold'>{tran('how_it_works_modal.title')}</p>
        <p className='text-xs text-neutral-6'>
          {tran('how_it_works_modal.sub_title')}
        </p>
      </div>
      <p className='text-xs font-bold '>
        {tran('how_it_works_modal.steps.title')}
      </p>
      <ol className='mb-4 mt-2 list-decimal ps-5'>
        <li className='text-xs text-neutral-5'>
          {tran('how_it_works_modal.steps.step_one')}
        </li>
        <li className='text-xs text-neutral-5'>
          {tran('how_it_works_modal.steps.step_two')}
        </li>
        <li className='text-xs text-neutral-5'>
          {tran('how_it_works_modal.steps.step_three')}
        </li>
      </ol>

      <p className='text-xs font-bold'>
        {tran('how_it_works_modal.notes.title')}
      </p>
      <ul className='mb-4 mt-2 list-square ps-5'>
        <li className='text-xs text-neutral-5'>
          {tran('how_it_works_modal.notes.note_one')}
        </li>
        <li className='text-xs text-neutral-5'>
          {tran('how_it_works_modal.notes.note_two')}
        </li>
        <li className='text-xs text-neutral-5'>
          {tran('how_it_works_modal.notes.note_three')}
        </li>
      </ul>

      <Button
        className='mt-6 w-full'
        variant='solid'
        colorScheme='secondary'
        size='XS'
        onClick={downloadHandler}
        isLoading={isFetching}
      >
        {tran('how_it_works_modal.btn_download')}
      </Button>
      <hr />
    </div>
  )

  const UploadLoaderContent = (
    <section className='flex flex-col'>
      <div className='mb-8 flex flex-col items-center justify-center'>
        <p className='text-base font-bold'>
          {tran('upload_loader_modal.title')}
        </p>
        <Spinner className='mt-16'>
          <p className='text-base text-neutral-6'>
            {tran('upload_loader_modal.sub_title')}
          </p>
          {fileNameRef && (
            <span className='mb-6 text-xs text-neutral-5'>
              {fileNameRef.current}
            </span>
          )}
        </Spinner>
        <p className='my-6 h-3 w-full rounded-lg bg-neutral-2'>
          <span
            style={{
              width: `${progress}%`,
            }}
            className={'block h-full rounded-lg bg-secondary-6'}
          />
        </p>
        <Button
          className='w-[50%] bg-neutral-2 font-bold text-neutral-6'
          variant='solid'
          size='XS'
          onClick={handleCancelUpload}
        >
          {tran('upload_loader_modal.btn_cancel')}
        </Button>
      </div>
    </section>
  )

  const FileNotSupportedContent = (
    <section className='flex flex-col'>
      <div className='mb-8 flex flex-col items-center justify-center'>
        <p className='mb-20 text-base font-bold'>
          {tran('file_not_supported_modal.title')}
        </p>
        <div className='mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-error-1'>
          <ErrorIcon />
        </div>
        <p className='mb-2 text-base text-error-6'>
          {tran('file_not_supported_modal.sub_title')}
        </p>
        <p className='mb-8 text-center text-xs text-neutral-5'>
          {tran('file_not_supported_modal.description')}
        </p>
        <Button
          className='w-full'
          variant='solid'
          colorScheme={'secondary'}
          size='XS'
          onClick={() => setActiveContent('excel-actions')}
        >
          {tran('file_not_supported_modal.btn_try_again')}
        </Button>
      </div>
    </section>
  )

  const getExcelErrorMessage = () => {
    if (errorCode === String(EXCEL_UPLOAD_ERROR_CODES.LINE_400))
      return t('LINE-400', { rows: errorRowsMessage })

    if (errorCode === String(EXCEL_UPLOAD_ERROR_CODES.ROW_400))
      return t('ROW-400', { rows: errorRowsMessage })

    return t(errorCode as keyof typeof t)
  }

  const UploadErrorContent = (
    <section className='flex flex-col'>
      <div className='mb-8 flex flex-col items-center justify-center'>
        <p className='mb-20 text-base font-bold'>
          {tran('upload_error_modal.title')}
        </p>
        <div className='mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-error-1'>
          <ErrorIcon />
        </div>
        <p className='mb-2 text-error-6'>
          {tran('upload_error_modal.sub_title')}
        </p>
        <p className='mb-2 text-center text-xs text-neutral-5'>
          {getExcelErrorMessage()}
        </p>
        <div className='mb-8'>
          <ErrorUploadError />
        </div>
        <Button
          className='w-full'
          variant='solid'
          colorScheme={'secondary'}
          size='XS'
          onClick={() => setActiveContent('excel-actions')}
        >
          {tran('upload_error_modal.btn_try_again')}
        </Button>
      </div>
    </section>
  )

  const ReplaceListContent = ({ type }: { type: 'manual' | 'excel' }) => {
    return (
      <section className='flex flex-col items-center justify-center gap-6'>
        <div className='flex h-14 w-14 items-center  justify-center rounded-full bg-text-neutral-1 p-4'>
          <ReplaceIcon />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='mb-2 text-base font-bold'>
            {tran('replace_list_modal.title')}
          </p>
          <p className='text-center text-sm text-neutral-5'>
            {type === 'manual'
              ? `${tran('replace_list_modal.description_manual')}`
              : `${tran('replace_list_modal.description_excel')}`}
          </p>
        </div>
        <div className=' flex w-full flex-col items-center justify-center'>
          <div className='flex w-full justify-between gap-2'>
            <Button
              className='flex-1'
              variant='outlined'
              colorScheme={'secondary'}
              size='XS'
              onClick={() => resetExcelHandler('reset', type)}
            >
              {type === 'manual'
                ? `${tran('replace_list_modal.btn_start_new_list')}`
                : `${tran('replace_list_modal.btn_replace_list')}`}
            </Button>
            <Button
              className='flex-1'
              variant='solid'
              colorScheme={'secondary'}
              size='XS'
              onClick={() => resetExcelHandler('add', type)}
            >
              {tran('replace_list_modal.btn_add_to_list')}
            </Button>
          </div>
          <Button
            className='w-full'
            variant='text'
            colorScheme={'primary'}
            size='XS'
            onClick={() => resetExcelHandler('add', type)}
          >
            {tran('replace_list_modal.btn_go_to_old_list')}
          </Button>
        </div>
      </section>
    )
  }

  return (
    <Dialog onOpenChange={handleDialogChange} open={isOpened}>
      <DialogContent className='w-full px-12 py-6 lg:w-[434px]'>
        <DialogCloseX />
        {activeContent === 'excel-actions' && ExcelActionsContent}
        {activeContent === 'how-it-works' && HowItWorksContent}
        {activeContent === 'upload-loader' && UploadLoaderContent}
        {activeContent === 'file-not-supported' && FileNotSupportedContent}
        {activeContent === 'upload-error' && UploadErrorContent}
        {activeContent === 'reset-manual' && (
          <ReplaceListContent type='manual' />
        )}
        {activeContent === 'reset-excel' && <ReplaceListContent type='excel' />}
      </DialogContent>
    </Dialog>
  )
}

export default FleetExcelModal
