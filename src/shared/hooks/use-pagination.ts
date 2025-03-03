import { useState } from 'react'

export const usePagination = <T>(data: T[], pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = data.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return {
    paginatedData,
    currentPage,
    handlePageChange,
  }
}
