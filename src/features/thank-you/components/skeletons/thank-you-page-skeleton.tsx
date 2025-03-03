import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/shared/components/ui/table/table'

export default function ThankYouPageSkeleton() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <Card className='w-full'>
        <div className='flex flex-col items-start justify-start rounded-lg border border-green-200 bg-green-50 p-4 sm:flex-row sm:justify-between'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-8 w-8 rounded-full bg-green-200' />
            <div className='space-y-2'>
              <Skeleton className='h-5 w-64 bg-green-200' />
              <Skeleton className='h-4 w-48 bg-green-100' />
            </div>
          </div>
          <div className='flex space-x-2'>
            <Skeleton className='h-9 w-32 rounded bg-green-200' />
            <Skeleton className='h-9 w-32 rounded bg-green-300' />
          </div>
        </div>
      </Card>
      <Card className='w-full'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Skeleton className='h-6 w-56' />
          <Skeleton className='h-6 w-32' />
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {Array(2)
                .fill(null)
                .map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Array(6)
                      .fill(null)
                      .map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className='h-4 w-full' />
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className='w-full '>
        <div className='flex w-full flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-10 w-10 rounded' />
              <Skeleton className='h-6 w-40' />
            </div>
          </div>
          <div className='flex flex-col justify-between gap-4 rounded-lg border p-6 sm:flex-row'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-40' />
              <Skeleton className='h-6 w-24' />
            </div>
            <div className='w-64 space-y-2 rounded-lg border border-sky-100 bg-sky-50 p-4'>
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-24' />
              </div>
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-20' />
              </div>
              <div className='flex justify-between pt-2'>
                <Skeleton className='h-5 w-36' />
                <Skeleton className='h-5 w-24' />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
