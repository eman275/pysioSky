import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import React from 'react'

export default function CompanyDetailsSkeleton() {
  return (
    <Skeleton className='flex items-center justify-between rounded-md p-4'>
      <div className='flex items-center space-x-2'>
        <Skeleton className='h-5 w-24' />
        <Skeleton className='h-5 w-28' />
      </div>
      <Skeleton className='h-5 w-48' />
      <div className='flex items-center space-x-2'>
        <Skeleton className='h-5 w-24' />
        <Skeleton className='h-5 w-28' />
      </div>
    </Skeleton>
  )
}
