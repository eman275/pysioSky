import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/RadioGroup'
import { REPAIR_METHOD_TYPE_ENUM } from '../../resources/quotation.types'
import { useScopedI18n } from '@/shared/locales/client'
import useRepairTypeSchema from '../schemas/repair-type-schema'

const RepairMethodCustomizationForm = () => {
  const tQuotation = useScopedI18n('application.quotations')

  const formSchema = useRepairTypeSchema()
  type FormValues = z.infer<typeof formSchema>
  const t = useScopedI18n('application.quotations')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  return (
    <div className='flex flex-col justify-between gap-3 lg:flex-row'>
      <div className='text-base font-semibold'>
        {t('edit_repair_method.title')}
      </div>
      <div className='flex w-full items-center justify-between lg:w-fit lg:gap-3'>
        <p className='w-fit text-nowrap text-sm'>
          {t('edit_repair_method.sub_title')}
        </p>
        <div>
          <Form {...form}>
            <FormField
              control={form.control}
              name='repairMethod'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className='flex items-center gap-1 text-xs'
                    >
                      <div className='flex items-center'>
                        <RadioGroupItem
                          value={REPAIR_METHOD_TYPE_ENUM.AGENCY.toString()}
                          id={t('edit_repair_method.agency')}
                          className='flex items-center justify-center p-2 text-xs font-normal'
                          label={tQuotation('quotation_summary.agency')}
                        />
                      </div>
                      <div className='flex items-center'>
                        <RadioGroupItem
                          value={REPAIR_METHOD_TYPE_ENUM.WORKSHOP.toString()}
                          id={t('edit_repair_method.workshop')}
                          className='flex items-center justify-center p-2 text-xs font-normal'
                          label={tQuotation('quotation_summary.workshop')}
                        />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </div>
      </div>
    </div>
  )
}
export default RepairMethodCustomizationForm
