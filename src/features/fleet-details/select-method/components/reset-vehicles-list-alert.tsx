'use client'
import FlagIcon from '@/shared/components/icons/alert-flag-icon.svg'
import { generateAppPath } from '@/shared/hooks/use-app-routes'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/components/ui/alert'
import useAppParam from '@/shared/hooks/use-app-params'
import { useScopedI18n } from '@/shared/locales/client'
import Link from 'next/link'
import useResetCheck from '../hooks/use-reset-check'

export default function ResetVehiclesListAlert() {
  const t = useScopedI18n('application.fleetDetails')
  const {
    crNumber,
    applicationReference,
    correlationId,
    entityReference: entityReference,
  } = useAppParam()

  const { isResetActive } = useResetCheck()

  return (
    <>
      {isResetActive && (
        <Alert status='warning'>
          <AlertTitle startIcon={<FlagIcon />}>
            {t('select_method.alert.flag')}
          </AlertTitle>
          <AlertDescription>
            {t('select_method.alert.description')}
            <Link
              className='cursor-pointer px-1 text-primary-6 underline'
              href={
                generateAppPath({
                  crNumber,
                  entityReference,
                  correlationId,
                  applicationReference,
                }).INSERT_YOUR_FLEET_DETAILS_URL
              }
            >
              {t('select_method.alert.link')}
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
