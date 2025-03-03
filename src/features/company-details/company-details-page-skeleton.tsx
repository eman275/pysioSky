import { Skeleton } from '@/shared/components/ui/loader/skeleton'

export default function CompanyDetailsPageSkeleton() {
  return (
    <div className='w-full space-y-8 p-6'>
      <div className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-6 w-6' />
          <Skeleton className='h-6 w-40' />
        </div>
        <Skeleton className='h-10 w-full' />
      </div>

      <div className='rounded-lg p-4'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-6 w-full' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-6 w-full' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-6 w-full' />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-8'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-40' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-8'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-36' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>
    </div>
  )
}
