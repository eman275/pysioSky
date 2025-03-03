'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion'

const steps = [
  {
    id: 'q1',
    title: 'Do I need liability coverage?',
    description:
      'Homeowners insurance can protect you from the unexpected. If your home is damaged, your belongings are stolen or someone gets injured on your property.',
  },
  {
    id: 'q2',
    title: 'Do I need liability coverage?2',
    description:
      'Homeowners insurance can protect you from the unexpected. If your home is damaged, your belongings are stolen or someone gets injured on your property.',
  },
  {
    id: 'q3',
    title: 'Do I need liability coverage?3',
    description:
      'Homeowners insurance can protect you from the unexpected. If your home is damaged, your belongings are stolen or someone gets injured on your property.',
  },
  {
    id: 'q4',
    title: 'Do I need liability coverage?4',
    description:
      'Homeowners insurance can protect you from the unexpected. If your home is damaged, your belongings are stolen or someone gets injured on your property.',
  },
  {
    id: 'q5',
    title: 'Do I need liability coverage?5',
    description:
      'Homeowners insurance can protect you from the unexpected. If your home is damaged, your belongings are stolen or someone gets injured on your property.',
  },
  {
    id: 'q6',
    title: 'Do I need liability coverage?6',
    description:
      'Homeowners insurance can protect you from the unexpected. If your home is damaged, your belongings are stolen or someone gets injured on your property.',
  },
]

const FAQToggleItem = () => {
  return (
    <Accordion collapsible type='single' className='flex flex-col'>
      {steps.map((item) => {
        return (
          <AccordionItem
            value={item.title}
            key={item.title}
            className='mb-4 py-0 data-[state=open]:border-primary-2 data-[state=open]:bg-primary-1'
          >
            <AccordionTrigger isDefault={false} className='p-3'>
              <div className='flex items-center justify-between gap-4 group-data-[state=open]:text-primary-5'>
                {item.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className='pb-0'>
              {item.description}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default FAQToggleItem
