import React from 'react'
import { Pagination } from '@heroui/pagination'

interface HomeFooterProps {
  totalPages: number
  setPage: (page: number) => void
}

const HomeFooter: React.FC<HomeFooterProps> = ({ totalPages, setPage }) => {
  if (totalPages <= 1) {
    return null
  }

  return (
    <footer className="bg-grey-50 flex items-center justify-center">
      <Pagination
        showControls
        initialPage={1}
        total={totalPages}
        onChange={innerPage => setPage(innerPage)}
      />
    </footer>
  )
}

export default HomeFooter
