import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import HomeFooter from './HomeFooter.tsx'
import HomeBody from './HomeBody.tsx'

import DefaultLayout from '@/layouts/default.tsx'
import { setTransaction } from '@/redux/transactionSlice.ts'
import { useTransactions } from '@/api/useTransaction.tsx'
import { useScreenSize } from '@/hooks/useScreenSize.ts'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const screenSize = useScreenSize()
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [limit, setLimit] = useState(8)

  useEffect(() => {
    setLimit(screenSize === 'lg' || screenSize === 'xl' || screenSize === '2xl' ? 15 : 8)
  }, [screenSize])

  const {
    transactions,
    data,
    totalPages,
    loading,
    refreshing,
    sort,
    setSort,
    setPage,
    handleRefresh,
  } = useTransactions(limit, searchTerm)

  const handleRowClick = useCallback(
    (index: number) => {
      if (refreshing || loading || !data) return
      dispatch(setTransaction(data.transactions[index]))
      navigate('/detail')
    },
    [data, dispatch, loading, navigate, refreshing]
  )

  return (
    <DefaultLayout>
      <div className="mx-4 lg:flex lg:items-center lg:justify-center">
        <div className="lg:container">
          <HomeBody
            handleRefresh={handleRefresh}
            handleRowClick={handleRowClick}
            loading={loading}
            setSort={setSort}
            sort={sort}
            transactions={transactions}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <HomeFooter setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default HomePage
