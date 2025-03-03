'use client'

import PageErrorBoundary from '@/shared/ui-states/page-error-boundary'
import { PageErrorBoundaryProps } from '@/shared/ui-states/page-error-boundary'

export default function Error(props: PageErrorBoundaryProps) {
  return <PageErrorBoundary {...props} />
}
