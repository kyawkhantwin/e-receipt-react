import React from 'react'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { Input } from '@heroui/input'

import TransactionSortBy from './components/TransactionSortBy'

import LoadingSpinner from '@/components/LoadingSpinner.tsx'
import TransactionTable from '@/feature/home/components/TransactionTable.tsx'
import TransactionList from '@/feature/home/components/TransactionList.tsx'
import { TransactionType } from '@/types/TransactionType.ts'

interface HomeBodyProps {
  loading: boolean
  transactions: TransactionType[]
  sort: string
  setSort: (sort: string) => void
  handleRowClick: (index: number) => void
  handleRefresh: () => Promise<any>
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

const HomeBody: React.FC<HomeBodyProps> = ({
  loading,
  transactions,
  sort,
  setSort,
  handleRowClick,
  handleRefresh,
  searchTerm,
  setSearchTerm,
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

  console.log(transactions)

  return (
    <PullToRefresh className="mb-1 block w-full" pullDownThreshold={60} onRefresh={handleRefresh}>
      <div className={'h-[79vh]'}>
        <div className={'mb-1 flex items-center justify-between gap-2'}>
          <h2 className="text-medium font-semibold">Today Transactions</h2>
          <Input
            aria-label="Search"
            className="w-1/2 px-4"
            placeholder="Search transaction"
            type="search"
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <TransactionSortBy sort={sort} onChange={setSort} />
        </div>
        <div className="mt-5">{renderContent()}</div>
      </div>
    </PullToRefresh>
  )
}

export default HomeBody
