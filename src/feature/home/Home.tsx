import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import HomeFooter from './HomeFooter.tsx'
import HomeBody from './HomeBody.tsx'

import { setTransaction } from '@/redux/transactionSlice.ts'
import { useTransactions } from '@/api/useTransaction.tsx'
import { useScreenSize } from '@/hooks/useScreenSize.ts'
import { useAuthToken } from '@/utils/useAuthToken.tsx'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const screenSize = useScreenSize()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { getAuthData } = useAuthToken()
  const { serial: authSerial } = getAuthData()
  const location = useLocation()
  const stateSerial = location.state?.serial
  const serial = stateSerial || authSerial

  const [limit] = useState(
    screenSize === 'lg' || screenSize === 'xl' || screenSize === '2xl' ? 15 : 8
  )

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
  } = useTransactions(limit, searchTerm, serial)

  const handleRowClick = useCallback(
    (index: number) => {
      if (refreshing || loading || !data) return
      dispatch(setTransaction(data.transactions[index]))
      navigate('/detail')
    },
    [data, dispatch, loading, navigate, refreshing]
  )

  return (
    <div className="mx-4 lg:flex lg:items-center lg:justify-center">
      <div className="lg:container">
        <HomeBody
          handleRefresh={handleRefresh}
          handleRowClick={handleRowClick}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSort={setSort}
          sort={sort}
          transactions={transactions}
        />
        <HomeFooter setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default HomePage
