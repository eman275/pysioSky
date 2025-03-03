import { Alert, AlertDescription } from '@/shared/components/ui/alert'
import { ReactNode } from 'react'

type FailedAlertProps = {
  description: string
  startIcon: ReactNode
}

function FailedAlert({ description, startIcon }: FailedAlertProps) {
  return (
    <Alert status='darkError'>
      {startIcon}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export default FailedAlert
