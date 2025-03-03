import useClientQueryString from '@/shared/hooks/use-client-query-string'
import { cn, generatePages } from '@/shared/lib/utils'
import { useScopedI18n } from '@/shared/locales/client'
import React from 'react'
import PaginationIcon from '@/shared/components/icons/pagination-icon.svg'

interface PaginationProps {
  totalCount: number | undefined
  pageIndex: number
  pageSize: number | undefined
  selectedButtonColor?: 'black' | 'blue'
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  pageIndex,
  onPageChange,
  pageSize,
  selectedButtonColor = 'black',
}) => {
  const t = useScopedI18n('application.fleetDetails')
  const clientQs = useClientQueryString()
  const totalPages = Math.ceil((totalCount ?? 0) / (pageSize ?? 1))
  const pages = generatePages(totalCount, pageSize) ?? []

  const renderPages = () => {
    const visiblePages = []

    if (totalPages <= 5) {
      visiblePages.push(...pages)
    } else {
      if (pageIndex <= 3) {
        visiblePages.push(1, 2, 3, 4, '...', totalPages)
      } else if (pageIndex >= totalPages - 2) {
        visiblePages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        )
      } else {
        visiblePages.push(
          1,
          '...',
          pageIndex - 1,
          pageIndex,
          pageIndex + 1,
          '...',
          totalPages
        )
      }
    }

    return visiblePages
  }

  const pageChangeHandler = (page: number) => () => {
    onPageChange(page > totalPages ? totalPages : page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  React.useEffect(() => {
    if (pageIndex > totalPages && totalPages > 0) {
      clientQs.set([{ key: 'pageNumber', value: String(totalPages) }])
    }
  }, [clientQs, pageIndex, totalPages])

  if (totalCount && pageSize && totalCount < pageSize) return null

  return (
    <div className='mt-6 flex items-center justify-end gap-1 lg:gap-2'>
      <p className='me-2 text-sm font-bold text-neutral-5 lg:me-6 lg:text-base'>
        {t('pagination.pages')}:
      </p>

      <button
        onClick={pageChangeHandler(pageIndex - 1)}
        disabled={pageIndex === 1}
        className={cn(
          'flex min-w-20 items-center  justify-between gap-1 px-1 py-1 text-sm font-bold lg:gap-2 lg:px-3 lg:text-base', // Fixed padding here
          pageIndex === 1
            ? 'text-neutral-3'
            : 'cursor-pointer justify-center text-neutral-6 hover:rounded-3xl hover:bg-neutral-6 hover:text-base-white'
        )}
      >
        <PaginationIcon className='rtl:rotate-180' />
        {t('pagination.back')}
      </button>

      <section className='mx-2 flex items-center gap-1 lg:mx-6 lg:gap-2'>
        {renderPages().map((page: number | string, index: number) => (
          <button
            key={index}
            className={cn(
              'px-3 py-1 text-base font-bold',
              pageIndex === page
                ? cn(
                    'rounded-3xl bg-neutral-6 text-base-white',
                    selectedButtonColor === 'blue'
                      ? 'bg-primary-6'
                      : 'bg-neutral-6'
                  )
                : page === '...'
                  ? 'cursor-default'
                  : 'hover:rounded-3xl hover:bg-neutral-6 hover:text-base-white'
            )}
            onClick={pageChangeHandler(Number(page))}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
      </section>

      <button
        onClick={pageChangeHandler(pageIndex + 1)}
        disabled={pageIndex === totalPages}
        className={cn(
          ' flex min-w-20 items-center justify-between gap-2 px-1 py-1 text-sm font-bold lg:px-3 lg:text-base',
          pageIndex === totalPages
            ? 'text-neutral-3'
            : 'cursor-pointer justify-center text-neutral-6 hover:rounded-3xl hover:bg-neutral-6 hover:text-base-white'
        )}
      >
        {t('pagination.next')}
        <PaginationIcon className='rotate-180 rtl:rotate-0' />
      </button>
    </div>
  )
}

export default Pagination
