'use client'
import FleetExcelModal from '@/feat/fleet-details/select-method/components/fleet-excel-modal'
import SelectMethodCard, {
  VehiclesDetailsCardTypes,
} from '@/feat/fleet-details/select-method/components/select-method-card'
import excelIcon from '@/shared/components/icons/excel-icon.png'
import ManualIcon from '@/shared/components/icons/manual-icon.svg'
import useAppParam from '@/shared/hooks/use-app-params'
import { generateAppPath } from '@/shared/hooks/use-app-routes'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { useScopedI18n } from '@/shared/locales/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SelectMethodContent } from '../../fleet-details.types'
import useResetCheck from '../hooks/use-reset-check'
import useAppNavigationLoader from '@/shared/hooks/use-app-navigation-loader'

export default function FleetAddingMethodsList() {
  const { setIsNavigating, isNavigating } = useAppNavigationLoader()
  const t = useScopedI18n('application.fleetDetails')
  const [activeContent, setActiveContent] =
    useState<SelectMethodContent>('excel-actions')
  const { isResetActive } = useResetCheck()

  const router = useRouter()
  const {
    crNumber,
    applicationReference,
    correlationId,
    entityReference: entityReference,
  } = useAppParam()
  const {
    isOpened: isExcelModalOpened,
    setIsOpened: setIsExcelModalOpened,
    onOpen: openExcelModal,
    onClose: closeExcelModal,
  } = useDisclosure()

  // handlers
  const onManualButtonClick = () => {
    if (isResetActive) {
      setActiveContent('reset-manual')
      openExcelModal()
    } else {
      setIsNavigating(true)
      router.push(
        generateAppPath({
          crNumber,
          entityReference,
          correlationId,
          applicationReference,
        }).INSERT_YOUR_FLEET_DETAILS_URL
      )
    }
  }

  const onExcelButtonClick = () => {
    if (isResetActive) {
      setActiveContent('reset-excel')
    }
    openExcelModal()
  }

  const insertVehiclesDetailsTypesList: Array<
    VehiclesDetailsCardTypes & {
      key: string
    }
  > = [
    {
      key: '1',
      icon: <ManualIcon />,
      title: t('select_method.manual.title'),
      description: t('select_method.manual.description'),
      subTitle: t('select_method.manual.sub_title'),
      btnText: t('select_method.manual.btn'),
      onClickBtn: onManualButtonClick,
      isBtnLoading: isNavigating,
    },
    {
      key: '2',
      icon: <Image src={excelIcon} alt='excelIcon' className='' />,
      title: t('select_method.excel.title'),
      description: t('select_method.excel.description'),
      subTitle: t('select_method.excel.sub_title'),
      btnText: t('select_method.excel.btn'),
      onClickBtn: onExcelButtonClick,
    },
  ]
  return (
    <>
      <div className='flex flex-col  gap-10 lg:flex-row'>
        {insertVehiclesDetailsTypesList.map(({ key, ...item }) => (
          <SelectMethodCard key={key} data={item} />
        ))}
      </div>
      <FleetExcelModal
        isOpened={isExcelModalOpened}
        setIsOpened={setIsExcelModalOpened}
        onClose={closeExcelModal}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
        reset={isResetActive}
      />
    </>
  )
}
