import { useScopedI18n } from '@/shared/locales/client'
import { REPAIR_METHOD_TYPE_ENUM } from '../../resources/quotation.types'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/RadioGroup'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useRepairTypeSchema from '../schemas/repair-type-schema'
import SingleSelect from '@/shared/components/ui/select/single-select'
import SelectIndicatorIcon from '@/shared/components/icons/select-indicator.svg'
import useSingleQuoteStore from '../../quotes-list/hooks/use-single-quote-store'
import { useCallback, useEffect, useMemo, useState } from 'react'
import React from 'react'

type Props = {
  vehicleReference: string
  currentSelectedDeductibleReference: string
}

const RepairTypeActions = React.memo(
  ({ vehicleReference, currentSelectedDeductibleReference }: Props) => {
    const tQuotation = useScopedI18n('application.quotations')
    const formSchema = useRepairTypeSchema()
    const { deductibles, updateDeductibles } = useSingleQuoteStore(
      ({ deductibles, updateDeductibles }) => ({
        deductibles,
        updateDeductibles,
      })
    )
    const deductible = deductibles[vehicleReference]

    // Define the options with useMemo to memoize the result unless deductible options change
    const { agencyOptions, workshopOptions } = useMemo(() => {
      const agencyOptions = deductible.agencyOptions.map(
        ({ value, label }) => ({
          value,
          label,
        })
      )
      const workshopOptions = deductible.workshopOptions.map(
        ({ value, label }) => ({ value, label })
      )
      return { agencyOptions, workshopOptions }
    }, [deductible.agencyOptions, deductible.workshopOptions])

    // Define the initial repair method value
    const initialRepairMethod = useMemo(() => {
      return deductible.agencyOptions.some((opt) => opt.isSelected)
        ? REPAIR_METHOD_TYPE_ENUM.AGENCY.toString()
        : REPAIR_METHOD_TYPE_ENUM.WORKSHOP.toString()
    }, [deductible.agencyOptions])

    // Define the initial deductible amount value
    const initialDeductibleAmount = useMemo(() => {
      return (
        deductible.agencyOptions.find((opt) => opt.isSelected)?.value ||
        deductible.workshopOptions.find((opt) => opt.isSelected)?.value
      )
    }, [deductible.agencyOptions, deductible.workshopOptions])

    const [repairMethod, setRepairMethod] =
      useState<string>(initialRepairMethod)
    const [deductibleAmount, setDeductibleAmount] = useState<
      string | undefined
    >(initialDeductibleAmount)

    type FormValues = z.infer<typeof formSchema>

    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      mode: 'onChange',
    })

    // Handler for changing the repair method
    const handleRepairMethodChange = useCallback(
      (option: string) => {
        const defaultDeductibleAmount =
          option === REPAIR_METHOD_TYPE_ENUM.AGENCY.toString()
            ? agencyOptions[0]?.value
            : workshopOptions[0]?.value
        if (deductibleAmount !== defaultDeductibleAmount) {
          setDeductibleAmount(defaultDeductibleAmount)
        }
        if (currentSelectedDeductibleReference !== defaultDeductibleAmount) {
          updateDeductibles(vehicleReference, defaultDeductibleAmount)
        }
      },
      [
        agencyOptions,
        workshopOptions,
        vehicleReference,
        updateDeductibles,
        deductibleAmount,
        currentSelectedDeductibleReference,
      ]
    )

    // Handler for changing the deductible amount
    const handleDeductibleAmountChange = useCallback(
      (option: string) => {
        if (currentSelectedDeductibleReference !== option) {
          updateDeductibles(vehicleReference, option)
        }
      },
      [vehicleReference, updateDeductibles, currentSelectedDeductibleReference]
    )

    useEffect(() => {
      if (repairMethod !== initialRepairMethod) {
        setRepairMethod(initialRepairMethod)
      }
      if (deductibleAmount !== initialDeductibleAmount) {
        setDeductibleAmount(initialDeductibleAmount)
      }
    }, [
      initialRepairMethod,
      initialDeductibleAmount,
      repairMethod,
      deductibleAmount,
    ])

    return (
      <div className='flex h-full w-full flex-row items-end justify-between gap-3 bg-primary-1 p-3 lg:w-fit lg:flex-col lg:items-start lg:pl-4'>
        <div className='flex h-full w-full flex-row items-center justify-between gap-2 xl:flex-col'>
          <Form {...form}>
            <FormField
              name='repairMethod'
              render={({ field }) => (
                <FormItem className='flex h-full flex-col justify-between'>
                  <FormLabel isRequired={false}>
                    <span className='flex h-full items-center self-start text-center text-xxs font-normal text-neutral-5'>
                      {tQuotation('quotation_summary.repair_type')}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={repairMethod}
                      onValueChange={(option) => {
                        field.onChange(option)
                        handleRepairMethodChange(option)
                      }}
                      className='flex items-center gap-4 text-xs'
                    >
                      <RadioGroupItem
                        value={REPAIR_METHOD_TYPE_ENUM.AGENCY.toString()}
                        id={`${vehicleReference}-agency`}
                        className='flex items-center justify-center p-1 text-xs font-normal'
                        label={tQuotation('quotation_summary.agency')}
                        labelClassName='text-xs font-normal ml-1'
                        disabled={agencyOptions.length === 0}
                      />
                      <RadioGroupItem
                        value={REPAIR_METHOD_TYPE_ENUM.WORKSHOP.toString()}
                        id={`${vehicleReference}-workshop`}
                        className='flex items-center justify-center p-2 text-xs font-normal'
                        label={tQuotation('quotation_summary.workshop')}
                        labelClassName='text-xs font-normal ml-1'
                        disabled={workshopOptions.length === 0}
                      />
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name='deductibleAmount'
              render={({ field }) => (
                <FormItem className='flex flex-col items-end justify-between xl:flex-row xl:gap-2'>
                  <FormLabel isRequired={false}>
                    <span className='flex h-full items-center self-center text-center text-xxs font-normal text-neutral-5'>
                      {tQuotation('quotation_summary.deductible')}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <SingleSelect
                      ref={field.ref}
                      options={
                        repairMethod ===
                        REPAIR_METHOD_TYPE_ENUM.AGENCY.toString()
                          ? agencyOptions
                          : workshopOptions
                      }
                      onChange={(option) => {
                        field.onChange(option)
                        handleDeductibleAmountChange(option as string)
                      }}
                      value={deductibleAmount}
                      className='p-0 text-xxs font-bold text-neutral-5'
                      controllerStyle='ps-0 pl-2 flex text-xxs h-fit !min-h[25px] min-w-[88px]'
                      defaultIndicator={<SelectIndicatorIcon />}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.vehicleReference === nextProps.vehicleReference &&
      prevProps.currentSelectedDeductibleReference ===
        nextProps.currentSelectedDeductibleReference
    )
  }
)

RepairTypeActions.displayName = 'RepairTypeActions'
export default RepairTypeActions
