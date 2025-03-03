import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import React from 'react'

const AvailableQuotesSkeleton = () => {
  const skeletonItems = Array.from({ length: 4 }).map((_, index) => (
    <Card key={index}>
      <div className='flex  flex-col gap-4 '>
        <div className='flex flex-col  justify-between '>
          <div>
            <div className='flex items-center justify-between'>
              <div className=' mb-4 flex items-center gap-6'>
                <Skeleton className='size-10  rounded-full border  ' />
                <Skeleton className='h-7 w-40 self-start lg:w-52 ' />
              </div>

              <Skeleton className=' h-7  w-12 rounded-lg border lg:h-14 lg:w-36  ' />
            </div>

            <Skeleton className='h-7 w-full  lg:w-4/5' />
          </div>
        </div>
        <Skeleton className='h-10 w-full self-start ' />
      </div>
    </Card>
  ))

  return <div className='flex h-full flex-col gap-6 '>{skeletonItems}</div>
}

export default AvailableQuotesSkeleton
