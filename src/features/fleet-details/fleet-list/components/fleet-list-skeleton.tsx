import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import React from 'react'

const FleetListSkeleton = () => {
  const skeletonItems = Array.from({ length: 10 }).map((_, index, array) => (
    <React.Fragment key={index}>
      <div className='flex h-20 gap-4'>
        <Skeleton className='size-16 self-start rounded-2xl lg:size-14' />
        <div className='flex w-full flex-col items-center justify-between gap-3 lg:flex-row'>
          <Skeleton className='h-12 w-full rounded-3xl lg:w-4/5' />
          <Skeleton className='h-6 w-full rounded-3xl lg:w-1/5' />
        </div>
      </div>
      {index < array.length - 1 && (
        <div className='border border-neutral-2'></div>
      )}{' '}
    </React.Fragment>
  ))

  return <Card className='flex h-full flex-col gap-4'>{skeletonItems}</Card>
}

export default FleetListSkeleton
