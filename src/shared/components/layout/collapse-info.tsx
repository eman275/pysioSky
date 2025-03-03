'use client'

import EditPen2Icon from '@/shared/components/icons/edit-pen-2.svg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'
import { CollapseInfoProps } from '@/shared/types/add-vehicle.types'

const CollapseInfo = ({ crNumberInfo, onEditClick }: CollapseInfoProps) => {
  return (
    <Accordion
      type='single'
      collapsible
      className='rounded-none bg-neutral-2 font-semibold'
    >
      <AccordionItem value='item-1' className='bg-neutral-2'>
        <AccordionTrigger className='px-0 py-1 text-sm'>
          Company Name: <span>{crNumberInfo?.name}</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className='bg-neutral-2 px-8 py-1'>
            <p className=' text-sm'>
              CR Expiry Date:{' '}
              <span className='mx-2'>{crNumberInfo?.expiryDate}</span>
            </p>
            <div className='flex items-center justify-between'>
              <p className='text-sm'>
                CR Number:
                <span className='mx-8'>{crNumberInfo?.crNumber}</span>
              </p>
              <p
                className='flex cursor-pointer items-center gap-2 text-primary-6'
                onClick={onEditClick}
              >
                Edit <EditPen2Icon className='text-primary-6' />
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CollapseInfo
