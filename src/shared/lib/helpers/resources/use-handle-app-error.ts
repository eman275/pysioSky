'use client'
import { useScopedI18n } from '@/shared/locales/client'
import { toast } from 'sonner'
import { ERROR_CODES, TOAST_MESSAGE_ERROR_CODES } from '../../constants'

export default function useHandleAppError() {
  const t = useScopedI18n('common.error')
  const handleAppError = (code: string) => {
    if (
      !Object.values(ERROR_CODES).includes(code as ValueOf<typeof ERROR_CODES>)
    ) {
      // toast.error(t('your_request_failed'))
      return
    }

    // if error code is one of toast error codes
    if (
      Object.values(TOAST_MESSAGE_ERROR_CODES).includes(
        code as ValueOf<typeof TOAST_MESSAGE_ERROR_CODES>
      )
    ) {
      toast.error(t(`toast_errors.${code}.title` as keyof typeof t), {
        description: t(`toast_errors.${code}.description` as keyof typeof t),
        duration: 20000,
      })
      return
    }
  }
  return {
    handleAppError,
  }
}
