import React from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh'

import LoadingSpinner from '@/components/LoadingSpinner.tsx'
import TransactionTable from '@/feature/home/components/TransactionTable.tsx'
import TransactionList from '@/feature/home/components/TransactionList.tsx'
import { TransactionType } from '@/types/TransactionType.ts'
import TransactionSortBy from '@/feature/home/components/TransactionSortBy.tsx'

interface HomeBodyProps {
  loading: boolean
  transactions: TransactionType[]
  sort: string
  setSort: (sort: string) => void
  handleRowClick: (index: number) => void
  handleRefresh: () => Promise<any>
}

const HomeBody: React.FC<HomeBodyProps> = ({
  loading,
  transactions,
  sort,
  setSort,
  handleRowClick,
  handleRefresh,
}) => {
  const renderContent = () => {
    if (loading) return <LoadingSpinner />

    if (transactions.length === 0) {
      return <div className="py-10 text-center text-gray-500">No transactions found.</div>
    }

    return (
      <div>
        <TransactionTable handleRowClick={handleRowClick} transactions={transactions} />
        <TransactionList handleRowClick={handleRowClick} transactions={transactions} />
      </div>
    )
  }

  return (
    <PullToRefresh
      className="mb-1 block w-full"
      pullDownThreshold={60}
      onRefresh={handleRefresh}
    >
      <div className={'h-[79vh]'}>
        <div className={'mb-1 flex items-center justify-between'}>
          <h2 className="text-medium font-semibold">Today Transactions</h2>
          <TransactionSortBy sort={sort} onChange={setSort} />
        </div>
        <div className="">{renderContent()}</div>
      </div>
    </PullToRefresh>
  )
}

export default HomeBody
