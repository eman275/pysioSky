import { Skeleton } from '@/shared/components/ui/loader/skeleton'

export default function OwnersLoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, idx) => (
        <Skeleton key={idx} className='h-20 w-full' />
      ))}
    </>
  )
}
