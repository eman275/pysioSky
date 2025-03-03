import { Button } from '@/shared/components/ui/button'
import React from 'react'
import useAdditionalDetailsStore from '../hooks/use-additional-details-store'
import { useScopedI18n } from '@/shared/locales/client'

const SelectAnotherCrOwnerBtn = () => {
  const t = useScopedI18n('application.additionalDetails')

  const { toggleDialog } = useAdditionalDetailsStore()

  const onClickSelectAnotherCROwner = () => {
    toggleDialog(false)
  }
  return (
    <Button
      className='mt-3 w-full text-base'
      variant='text'
      colorScheme={'neutral'}
      size='M'
      onClick={onClickSelectAnotherCROwner}
    >
      {t('select_another_cr_owner')}
    </Button>
  )
}

export default SelectAnotherCrOwnerBtn
