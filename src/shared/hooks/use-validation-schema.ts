import {
  NATIONAL_ID_REGEX,
  REGEX_ANY_DECIMAL_NUMBER,
  REGEX_ANY_NUMBER,
  REGEX_DAY_MONTH_YEAR,
  REGEX_EMAIL_ADDRESS,
  REGEX_FAX_NUMBER,
  REGEX_LETTERS,
  REGEX_MONTH_YEAR,
  REGEX_POSITIVE_DECIMAL_NUMBER,
  REGEX_POSITIVE_NUMBER,
} from '@/shared/lib/constants'
import { useScopedI18n } from '@/shared/locales/client'
import * as dateFns from 'date-fns'
import { ZodTypeAny, z } from 'zod'
export type SchemaArgs = {
  name: string
  zodPipe?: ZodTypeAny
  minValue?: number
  maxValue?: number
  minLength?: number
  maxLength?: number
  exactLength?: number
  customMsg?: string
  requiredMsgType?: 'requiredEntry' | 'requiredSelect'
  allowFuture?: boolean
  allowPast?: boolean
  allowLettersOnly?: boolean
  acceptsDecimal?: boolean
  unit?: string
}
export default function useValidationSchemas() {
  const tVal = useScopedI18n('validations')

  const minMaxPipe = (args: SchemaArgs) =>
    z
      .any()
      .refine(
        (value) => {
          if (!value) return true
          return args.minValue ? +value >= args.minValue : true
        },
        {
          message: tVal('minError', {
            min: args.minValue ? args.minValue - 1 : 0,
            name: args.name,
          }),
        }
      )
      .refine((value) => (args.maxValue ? +value <= args.maxValue : true), {
        message: tVal('maxError', { max: args.maxValue, name: args.name }),
      })

  const minMaxLengthPipe = (args: SchemaArgs) =>
    z
      .any()
      .refine(
        (value) => {
          if (!value) return true
          return args.minLength ? value?.length >= args.minLength : true
        },
        {
          message: tVal('minLength', {
            min: args.minLength ? args.minLength - 1 : 0,
            name: args.name,
            unit: args.unit,
          }),
        }
      )
      .refine(
        (value) => {
          if (!value) return true
          return args.maxLength ? value?.length <= args.maxLength : true
        },
        {
          message: tVal('maxLength', {
            max: args.maxLength,
            name: args.name,
            unit: args.unit,
          }),
        }
      )
      .refine(
        (value) => {
          if (!value) return true
          return args.exactLength ? value?.length === args.exactLength : true
        },
        {
          message: tVal('lengthError', {
            length: args.exactLength,
            name: args.name,
            unit: args.unit,
          }),
        }
      )

  const requiredStringSchema = (args: SchemaArgs) =>
    z
      .string({
        required_error: tVal(args.requiredMsgType ?? 'requiredEntry', {
          name: args.name,
        }),
      })
      .trim()
      .min(
        1,
        tVal(args.requiredMsgType ?? 'requiredEntry', {
          name: args.name,
        })
      )
      .refine(
        (value) => {
          const { allowLettersOnly = false } = args

          if (allowLettersOnly && !REGEX_LETTERS.test(value)) return false
          else return true
        },
        {
          message: tVal('invalidString', { name: args.name }),
        }
      )

  const optionalStringSchema = (args: SchemaArgs) =>
    z
      .string({
        required_error: tVal(args.requiredMsgType ?? 'requiredEntry', {
          name: args.name,
        }),
      })
      .trim()
      .optional()
      .refine(
        (value) => {
          if (!value) return true

          const { allowLettersOnly = false } = args

          if (allowLettersOnly && !REGEX_LETTERS.test(value)) return false
          else return true
        },
        {
          message: tVal('invalidString', { name: args.name }),
        }
      )

  const requiredNumberSchema = (args: SchemaArgs) =>
    requiredStringSchema(args)
      .refine(
        (value) => {
          if (args.acceptsDecimal) {
            return REGEX_ANY_DECIMAL_NUMBER.test(value)
          }

          return REGEX_ANY_NUMBER.test(value)
        },
        {
          message: tVal('invalidNumber', { name: args.name }),
        }
      )
      .pipe(minMaxPipe(args))
      .pipe(minMaxLengthPipe(args))
      .pipe(args.zodPipe ?? z.any())

  const requiredPositiveNumberSchema = (args: SchemaArgs) =>
    requiredStringSchema(args)
      .refine(
        (value) => {
          if (args.acceptsDecimal) {
            return REGEX_POSITIVE_DECIMAL_NUMBER.test(value)
          }

          return REGEX_POSITIVE_NUMBER.test(value)
        },
        {
          message:
            args.customMsg ??
            tVal('invalidPositiveNumber', { name: args.name }),
        }
      )
      .pipe(minMaxPipe(args))
      .pipe(minMaxLengthPipe(args))
      .pipe(args.zodPipe ?? z.any())

  const yearSchema = (args: SchemaArgs) =>
    requiredPositiveNumberSchema({
      name: args.name,
      zodPipe: z
        .string()
        .length(4, tVal('invalidYear', { name: args.name }))
        .pipe(args.zodPipe ?? z.any()),

      customMsg: tVal('invalidYear', { name: args.name }),
    })
      .refine(
        (val) => {
          const { allowFuture = true } = args
          const isValidYear = new Date().getFullYear() <= Number(val) - 1

          if (!allowFuture && isValidYear) return false
          else return true
        },
        {
          message: tVal('invalidMaxDateRange', { name: args.name }),
        }
      )
      .refine(
        (val) => {
          const { allowPast = true } = args
          const isValidYear = new Date().getFullYear() >= Number(val) + 1

          if (!allowPast && isValidYear) return false
          else return true
        },
        {
          message: tVal('invalidMinDateRange', { name: args.name }),
        }
      )

  const dayMonthYearString = (
    args: Pick<SchemaArgs, 'name'> & {
      allowFuture?: boolean
      allowPast?: boolean
    }
  ) =>
    requiredStringSchema({ ...args, requiredMsgType: 'requiredSelect' })
      .refine((value) => REGEX_DAY_MONTH_YEAR.test(value), {
        message: tVal('requiredSelect', { name: args.name }),
      })
      .refine(
        (val) => {
          const { allowFuture = true } = args
          const [d, m, y] = val.split('/')
          if (
            !allowFuture &&
            dateFns.isFuture(new Date(`${m}/${Number(d) + 1}/${y}`))
          )
            return false
          else return true
        },
        {
          message: tVal('invalidMaxDateRange', { name: args.name }),
        }
      )
      .refine(
        (val) => {
          const { allowPast = true } = args
          const [d, m, y] = val.split('/')
          if (!allowPast && dateFns.isPast(new Date(`${m}/${d}/${y}`)))
            return false
          else return true
        },
        {
          message: tVal('invalidMinDateRange', { name: args.name }),
        }
      )

  const monthYearString = (
    args: Pick<SchemaArgs, 'name'> & {
      allowFuture?: boolean
      allowPast?: boolean
    }
  ) =>
    requiredStringSchema({ ...args, requiredMsgType: 'requiredSelect' })
      .refine((value) => REGEX_MONTH_YEAR.test(value), {
        message: tVal('requiredSelect', { name: args.name }),
      })
      .refine(
        (val) => {
          const { allowFuture = true } = args
          const [m, y] = val.split('/')
          if (!allowFuture && dateFns.isFuture(new Date(`${m}/01/${y}`)))
            return false
          else return true
        },
        {
          message: tVal('invalidMaxDateRange', { name: args.name }),
        }
      )
      .refine(
        (val) => {
          const { allowPast = true } = args
          const [m, y] = val.split('/')
          if (!allowPast && dateFns.isPast(new Date(`${m}/01/${y}`)))
            return false
          else return true
        },
        {
          message: tVal('invalidMinDateRange', { name: args.name }),
        }
      )

  const optionalNumberSchema = (args: SchemaArgs) =>
    z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true

          if (args.acceptsDecimal) {
            return REGEX_ANY_DECIMAL_NUMBER.test(value)
          }

          return REGEX_ANY_NUMBER.test(value)
        },
        {
          message: tVal('invalidNumber', { name: args.name }),
        }
      )
      .pipe(minMaxPipe(args))
      .pipe(minMaxLengthPipe(args))
      .pipe(args.zodPipe ?? z.any())

  const optionalPositiveNumberSchema = (args: SchemaArgs) =>
    z
      .string()
      .refine(
        (value) => {
          if (!value) return true

          if (args.acceptsDecimal) {
            return REGEX_ANY_DECIMAL_NUMBER.test(value)
          }

          return REGEX_ANY_NUMBER.test(value)
        },
        {
          message: tVal('invalidNumber', { name: args.name }),
        }
      )
      .refine(
        (value) => {
          if (!value) return true

          if (args.acceptsDecimal) {
            return REGEX_POSITIVE_DECIMAL_NUMBER.test(value)
          }

          return REGEX_POSITIVE_NUMBER.test(value)
        },
        {
          message:
            args.customMsg ??
            tVal('invalidPositiveNumber', { name: args.name }),
        }
      )
      .optional()
      .pipe(minMaxPipe(args))
      .pipe(minMaxLengthPipe(args))
      .pipe(args.zodPipe ?? z.any())

  const requiredNationalId = (args: Pick<SchemaArgs, 'name'>) =>
    requiredStringSchema(args).refine(
      (value) => NATIONAL_ID_REGEX.test(value),
      {
        message: tVal('wrongNationalId'),
      }
    )

  const saudiMobileNumberSchema = (args: SchemaArgs) =>
    requiredNumberSchema(args)
      .refine((value) => value.startsWith('05'), {
        message: tVal('invalidSaudiNumberStart'),
      })
      .refine((value) => value?.length === 10, {
        message: tVal('invalidSaudiNumberLength'),
      })

  const requiredEmailSchema = (args: SchemaArgs) =>
    requiredStringSchema(args).refine(
      (value) => REGEX_EMAIL_ADDRESS.test(value),
      {
        message: tVal('invalidEmail'),
      }
    )

  const optionalFaxNumberSchema = () =>
    z
      .string()
      .optional()
      .refine((value) => !value || REGEX_FAX_NUMBER.test(value), {
        message: tVal('invalidFaxNumber'),
      })

  const requiredConsentSchema = () =>
    z
      .boolean({ required_error: tVal('requiredConsent') })
      .refine((value) => value, {
        message: tVal('requiredConsent'),
      })

  const requiredDateSchema = () =>
    z.date({ required_error: tVal('requiredDate') }).refine(
      (val) => {
        if (val instanceof Date) return true
        else return false
      },
      {
        message: tVal('requiredDate'),
      }
    )

  return {
    requiredNumberSchema,
    requiredDateSchema,
    optionalStringSchema,
    optionalNumberSchema,
    saudiMobileNumberSchema,
    requiredPositiveNumberSchema,
    optionalPositiveNumberSchema,
    yearSchema,
    requiredStringSchema,
    dayMonthYearString,
    monthYearString,
    requiredNationalId,
    requiredEmailSchema,
    optionalFaxNumberSchema,
    requiredConsentSchema,
  } as const
}
