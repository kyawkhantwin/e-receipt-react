import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import HomeFooter from './HomeFooter.tsx'
import HomeBody from './HomeBody.tsx'

import DefaultLayout from '@/layouts/default.tsx'
import { setTransaction } from '@/redux/transactionSlice.ts'
import { useTransactions } from '@/api/useTransaction.tsx'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  } = useTransactions(8)

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
      <div className={'flex flex-col gap-1'}>
        <HomeBody
          handleRefresh={handleRefresh}
          handleRowClick={handleRowClick}
          loading={loading}
          setSort={setSort}
          sort={sort}
          transactions={transactions}
        />
        <HomeFooter setPage={setPage} totalPages={totalPages} />
      </div>
    </DefaultLayout>
  )
}

export default HomePage
