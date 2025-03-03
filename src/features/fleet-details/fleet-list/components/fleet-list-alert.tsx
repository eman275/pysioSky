'use client'
import useClientQueryString from '@/shared/hooks/use-client-query-string'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert'
import FlagIcon from '@/shared/components/icons/alert-flag-icon.svg'
import { Button } from '@/shared/components/ui/button'
import { useScopedI18n } from '@/shared/locales/client'

const FleetListAlert = () => {
  const t = useScopedI18n('application.fleetDetails')

  const clientQs = useClientQueryString()
  const hideApplicationItems = clientQs.getByKey('action')
  const resetHandler = () => {
    clientQs.removeOneByKey('action')
  }

  return (
    hideApplicationItems && (
      <div className='mb-6'>
        <Alert status='warning'>
          <AlertTitle startIcon={<FlagIcon />}>
            {t('reset_alert.flag')}
          </AlertTitle>
          <AlertDescription className='flex'>
            {t('reset_alert.description')}
            <Button variant='link' size='link' onClick={resetHandler}>
              {t('reset_alert.link')}
            </Button>
            {t('reset_alert.sub_description')}
          </AlertDescription>
        </Alert>
      </div>
    )
  )
}

export default FleetListAlert
