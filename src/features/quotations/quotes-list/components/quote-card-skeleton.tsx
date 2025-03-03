import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/loader/skeleton'
import QuotesLoader from '@/shared/components/icons/quotes-loader.svg'
import { useScopedI18n } from '@/shared/locales/client'

const QuoteCardSkeleton = () => {
  const skeletonItems = Array(2).fill('')
  const t = useScopedI18n('application.quotations')
  return (
    <>
      <div className='flex-center flex w-full gap-1 text-sm font-bold text-neutral-5'>
        <QuotesLoader className='animate-spin' />
        <p>{t('quotes_loader')}</p>
      </div>
      {skeletonItems.map((_, index) => (
        <Card
          key={index}
          className='relative my-4 w-full p-3 shadow-lg lg:p-4'
          dir='ltr'
        >
          <CardHeader className='flex w-full flex-col gap-2 border-b border-dashed border-neutral-3 pb-2 md:gap-4 md:pb-4'>
            <div className='flex justify-between gap-4'>
              <Skeleton className='size-12 rounded-2xl lg:size-14' />
              <div className='flex flex-1 flex-col items-end justify-between gap-[2px] lg:flex-row lg:items-start lg:gap-3'>
                <Skeleton className='h-12 w-full min-w-[245px] rounded-3xl lg:min-w-[771px]' />
                <Skeleton className='h-6 w-[137px] rounded-3xl' />
              </div>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col justify-between gap-4 py-2 md:py-4 lg:flex-row'>
            <div className='flex'>
              <ul className='flex flex-1 items-start justify-around gap-1'>
                {skeletonItems.map((_, ind) => (
                  <li key={ind} className='flex flex-1 gap-3'>
                    <div className='flex flex-1 flex-col'>
                      <Skeleton className='mb-2 h-[18px] w-11/12 min-w-[120px] rounded-3xl' />
                      <Skeleton className='mb-2 h-[57px] w-full min-w-[140px]  rounded-3xl lg:w-[265px]' />
                    </div>
                    {ind === 0 && (
                      <div className='border-l border-neutral-2 pe-[0.875rem]' />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col'>
              <Skeleton className='mb-2 h-3 w-[74px] rounded-3xl' />
              <Skeleton className='mb-2 h-[15px] w-[167px] rounded-3xl' />
              <Skeleton className='mb-2 h-8 w-full rounded-3xl lg:w-[190px]' />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default QuoteCardSkeleton
