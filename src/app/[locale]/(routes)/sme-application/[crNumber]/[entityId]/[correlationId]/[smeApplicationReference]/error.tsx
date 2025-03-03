'use client'

import PageErrorBoundary, {
  PageErrorBoundaryProps,
} from '@/shared/ui-states/page-error-boundary'

export default function Error(props: PageErrorBoundaryProps) {
  return <PageErrorBoundary {...props} />
}
