import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import React from 'react'

const PurchasedPoliciesSkeletonCard = () => {
  const skeletonItems = Array.from({ length: 4 }).map((_, index) => (
    <Card key={index}>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            <Skeleton className='size-10 rounded-full border' />
            <Skeleton className='h-7 w-40 lg:w-52' />
          </div>
          <Skeleton className='h-7 w-12 rounded-lg border lg:h-14 lg:w-36' />
        </div>

        <Skeleton className='h-7 w-full lg:w-4/5' />

        <Skeleton className='h-10 w-full' />

        <div className='flex gap-4'>
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-24' />
        </div>

        <div className='my-4 border border-dashed'></div>

        <Skeleton className='h-10 w-full' />
      </div>
    </Card>
  ))

  return <div className='flex flex-col gap-6'>{skeletonItems}</div>
}

export default PurchasedPoliciesSkeletonCard
