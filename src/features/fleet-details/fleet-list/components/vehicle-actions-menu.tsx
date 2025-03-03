'use client'

import ThreeDots from '@/shared/components/icons/three-dots.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import useFleetListStore, {
  Content,
} from '@/feat/fleet-details/fleet-list/hooks/use-fleet-list-store'
import { useEffect } from 'react'
import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'
type Props = {
  isError?: boolean
  reference: string
}
const VehicleActionsMenu = ({ isError = false, reference }: Props) => {
  const { setActiveContent, toggleDialog, setClickedItem, isOpened } =
    useFleetListStore()
  const t = useScopedI18n('application.fleetDetails')

  const handleMenuItemSelect = (content: Content) => {
    setClickedItem(reference)
    setActiveContent(content)
    toggleDialog(true)
  }

  useEffect(() => {
    document.body.style.pointerEvents = 'auto'
  }, [isOpened])
  return (
    <div className='flex w-fit items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='text' size='text'>
            <ThreeDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className='w-48'>
            {!isError && (
              <DropdownMenuItem
                onSelect={() => handleMenuItemSelect('edit-vehicle')}
              >
                {t('vehicle_actions.edit')}
              </DropdownMenuItem>
            )}
            {isError && (
              <DropdownMenuItem
                onSelect={() => handleMenuItemSelect('fix-vehicle')}
              >
                {t('vehicle_actions.fix')}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => handleMenuItemSelect('delete-vehicle')}
            >
              {t('vehicle_actions.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  )
}

export default VehicleActionsMenu
