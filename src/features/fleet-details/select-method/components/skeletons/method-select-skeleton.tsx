import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import React from 'react'

export default function MethodSelectSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {/* Insert Vehicle Manually card */}
      <Card className='space-y-4 rounded-lg border p-6'>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-12 w-12 rounded' />
          <Skeleton className='h-6 w-48' />
        </div>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-10 w-full' />
      </Card>

      {/* Bulk Upload card */}
      <Card className='space-y-4 rounded-lg border p-6'>
        <div className='flex items-center space-x-4'>
          <Skeleton className='h-12 w-12 rounded' />
          <Skeleton className='h-6 w-32' />
        </div>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-10 w-full' />
      </Card>
    </div>
  )
}
