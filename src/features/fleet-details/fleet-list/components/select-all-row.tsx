import DeleteIcon from '@/shared/components/icons/delete-icon.svg'
import EditPenIcon from '@/shared/components/icons/edit-pen.svg'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { cn } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'
import useFleetListStore, { Content } from '../hooks/use-fleet-list-store'
import { Label } from '@/shared/components/ui/label'

const SelectAllRow = () => {
  const t = useScopedI18n('application.fleetDetails')
  const {
    setActiveContent,
    toggleDialog,
    checkAll,
    handleCheckListChange,
    checkedList,
    selectedItems,
  } = useFleetListStore()

  const onClickHandler = (content: Content) => {
    setActiveContent(content)
    toggleDialog(true)
  }

  const hasErrors = selectedItems.some(
    (item) => item.errors && item.errors.length > 0
  )

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Checkbox
          id='check_all'
          checked={checkAll}
          onCheckedChange={() => handleCheckListChange()}
        />
        <Label htmlFor='check_all'>{t('select_all_for_edit')}</Label>
      </div>
      <div className='flex items-center gap-6'>
        <button
          className={cn(
            'flex  items-center px-4 py-3',
            checkedList.length == 0
              ? 'text-neutral-3'
              : 'cursor-pointer text-neutral-5'
          )}
          onClick={() => onClickHandler('delete-vehicles')}
          disabled={checkedList.length == 0}
        >
          {React.cloneElement(<DeleteIcon />, {
            className: cn(checkedList.length && 'text-neutral-5'),
          })}
          <p className='flex items-center gap-1 font-bold '>
            {t('delete')}
            <span className='hidden lg:block'>{t('selected')}</span> (
            {checkedList.length})
          </p>
        </button>
        <button
          className={cn(
            'flex  items-center  px-4 py-3',
            checkedList.length == 0 || hasErrors
              ? 'text-neutral-3'
              : 'cursor-pointer text-neutral-5'
          )}
          disabled={checkedList?.length == 0 || hasErrors}
          onClick={() => onClickHandler('edit-vehicles')}
        >
          {React.cloneElement(<EditPenIcon />, {
            className: cn(checkedList.length && 'text-neutral-5'),
          })}
          <p className='flex items-center gap-1 font-bold '>
            {t('edit')} <span className='hidden lg:block'>{t('selected')}</span>
            ({checkedList.length})
          </p>
        </button>
      </div>
    </div>
  )
}

export default SelectAllRow
