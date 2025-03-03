import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export default function PolicySummarySkeleton() {
  return (
    <div className='mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-6'>
      <Skeleton className='mx-auto mb-4 h-8 w-48 sm:mx-0' />

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='space-y-8 lg:col-span-2'>
          <Card className='shadow-none'>
            <CardHeader className='pb-2'>
              <Tabs defaultValue='policy'>
                <TabsList className='w-full justify-start overflow-hidden bg-transparent'>
                  {[...Array(3)].map((_, i) => (
                    <TabsTrigger
                      key={i}
                      value={`tab-${i}`}
                      className='data-[state=active]:bg-transparent data-[state=active]:shadow-none'
                    >
                      <Skeleton className='h-4 w-24' />
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center space-x-4'>
                <Skeleton className='h-12 w-12 rounded' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full sm:w-64' />
                  <Skeleton className='h-4 w-full sm:w-32' />
                </div>
              </div>
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className='space-y-2 rounded-lg bg-gray-50 p-4'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className='space-y-2'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-10 w-full' />
          </div>

          <Card className='shadow-none'>
            <CardHeader>
              <Skeleton className='mb-4 h-6 w-40' />
            </CardHeader>
            <CardContent className='space-y-6'>
              <Skeleton className='h-4 w-48' />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className='flex items-center space-x-4 rounded-lg bg-gray-50 p-4'
                >
                  <Skeleton className='h-8 w-8' />
                  <Skeleton className='h-4 w-32' />
                </div>
              ))}
              <div className='flex items-center space-x-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-64' />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className='h-fit shadow-none'>
          <CardHeader>
            <Skeleton className='mb-4 h-6 w-40' />
          </CardHeader>
          <CardContent className='space-y-4'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='flex items-center justify-between'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-24' />
              </div>
            ))}
          </CardContent>
          <CardFooter className='flex flex-col items-start rounded-b-lg bg-primary-1 p-4'>
            <div className='mb-2 flex w-full items-center justify-between'>
              <Skeleton className='h-6 w-12 bg-primary-1' />
              <Skeleton className='h-6 w-32 bg-primary-1' />
            </div>
            <Skeleton className='h-4 w-48 bg-primary-1' />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
