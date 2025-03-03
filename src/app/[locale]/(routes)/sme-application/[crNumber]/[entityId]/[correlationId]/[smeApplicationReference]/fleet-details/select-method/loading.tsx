import { Skeleton } from '@/shared/components/ui/loader/skeleton'

export default function Component() {
  return (
    <div className='space-y-6'>
      {/* Breadcrumb-like navigation */}
      <div className='flex items-center space-x-2'>
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-32' />
      </div>

      {/* Title */}
      <Skeleton className='h-8 w-48' />

      {/* Details section */}
      <div className='flex items-center justify-between rounded-md p-4'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-6 w-48' />
        <Skeleton className='h-6 w-32' />
      </div>

      {/* Main content */}
      <div className='space-y-4'>
        <Skeleton className='h-6 w-64' />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Insert Vehicle Manually box */}
          <div className='space-y-4 rounded-lg border p-6'>
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-12 w-12 rounded' />
              <Skeleton className='h-6 w-48' />
            </div>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-10 w-full' />
          </div>

          {/* Bulk Upload box */}
          <div className='space-y-4 rounded-lg border p-6'>
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-12 w-12 rounded' />
              <Skeleton className='h-6 w-32' />
            </div>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
      </div>
    </div>
  )
}
