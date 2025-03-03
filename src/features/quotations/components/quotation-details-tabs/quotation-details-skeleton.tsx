import { Skeleton } from '@/shared/components/ui/loader/skeleton'

export default function QuotationDetailSkeleton() {
  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[200px]' />
          <Skeleton className='h-4 w-[100px]' />
        </div>
      </div>
      <div className='text-right'>
        <Skeleton className='ml-auto h-10 w-[180px]' />
      </div>
      <Skeleton className='h-10 w-full' />
      <div className='space-y-4 rounded-lg border p-4'>
        {[1, 2, 3].map((item) => (
          <div key={item} className='flex items-center justify-between'>
            <Skeleton className='h-4 w-[150px]' />
            <Skeleton className='h-4 w-[100px]' />
          </div>
        ))}
      </div>
    </div>
  )
}
