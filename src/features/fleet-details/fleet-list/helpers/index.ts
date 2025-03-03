import { toast } from 'sonner'

export const getToastCard = (
  isSuccess: boolean,
  successText: string,
  failedText: string
) => {
  if (isSuccess) {
    toast.success(successText)
  } else {
    toast.warning(failedText)
  }
}

export const isArabicText = (text: string) => /[\u0600-\u06FF]/.test(text)
