export const NATIONAL_ID_REGEX = /^([0-9]{10})$/
export const REGEX_LETTERS = /^([^0-9]*)$/

export const REGEX_ANY_NUMBER = /^-?\d*$/
export const REGEX_ANY_DECIMAL_NUMBER = /^-?\d*(\.\d+)?$/

export const REGEX_POSITIVE_NUMBER = /^\d*$/
export const REGEX_POSITIVE_DECIMAL_NUMBER = /^\d*(\.\d{1,2})?$/

export const REGEX_DAY_MONTH_YEAR =
  /^(0[0-9]|[1-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/([0-9]{4})$/

export const REGEX_DATE = /\d{1,2}\/\d{1,2}\/\d{2,4}/

export const REGEX_MONTH_YEAR = /^(0[0-9]|1[0-2])\/([0-9]{4})$/

export const REGEX_SAUDI_MOBILE_NUMBER = /^(05[0-9]{8})$/

export const REGEX_EMAIL_ADDRESS =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const REGEX_FAX_NUMBER = /^\d+(-\d+)*$/
