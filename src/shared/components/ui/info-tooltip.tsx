import React from 'react'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@/shared/components/ui/tooltip'
import InfoIcon from '@/shared/components/icons/info-icon.svg'
import InfoIconBlue from '@/shared/components/icons/info-icon-blue.svg'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import useDisclosure from '@/shared/hooks/use-disclosure'
import { Dialog, DialogCloseX, DialogContent, DialogHeader } from './dialog'
import ToolTipIcon from '@/shared/components/icons/fi-br-info.svg'

type InfoTooltipProps = {
  iconStyle?: 'gray' | 'blue'
  children: React.ReactNode
  dialogTitle?: string
}

const InfoTooltip = ({
  children,
  iconStyle,
  dialogTitle,
}: InfoTooltipProps) => {
  const { isLarge } = useScreenSize()

  const { isOpened, setIsOpened, onOpen } = useDisclosure()

  if (!isLarge) {
    return (
      <>
        <div onClick={onOpen}>
          <InfoIcon />
        </div>
        <Dialog open={isOpened} onOpenChange={setIsOpened}>
          <DialogContent>
            <DialogHeader>
              <DialogCloseX />
            </DialogHeader>
            <div className='flex flex-col  items-center justify-center px-6 pb-8 pt-6'>
              <div className='mb-6 size-[60px] rounded-full bg-warning-1 p-4'>
                <ToolTipIcon />
              </div>
              <p className='mb-4 text-base font-bold text-base-black'>
                {dialogTitle}
              </p>
              {children}
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type='button' className='cursor-help'>
          {iconStyle === 'blue' ? <InfoIconBlue /> : <InfoIcon />}
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default InfoTooltip
