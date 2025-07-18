import { useCallback, useEffect, useState } from 'react'

import useAxiosApi from '@/api/useAxiosApi'
import { ApiConfig } from '@/config/apiConfig'
import { HomeData } from '@/types/TransactionType'

export const useTransactions = (limit = 8) => {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<string>('desc')
  const [data, setData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { trigger } = useAxiosApi()

  const fetchTransactions = useCallback(
    async (pageNumber: number) => {
      setLoading(true)
      try {
        const result: HomeData = await trigger({
          endPoint: ApiConfig.transaction({ page: pageNumber, limit, sort }),
          method: 'get',
        })

        setData(Array.isArray(result.transactions) ? result : null)
      } catch {
        setData(null)
      } finally {
        setLoading(false)
      }
    },
    [trigger, limit, sort]
  )

  useEffect(() => {
    fetchTransactions(page)
  }, [fetchTransactions, page])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchTransactions(1)
    setRefreshing(false)
  }, [fetchTransactions])

  return {
    data,
    transactions: data?.transactions ?? [],
    totalPages: data?.pagination.totalPage ?? 0,
    loading,
    refreshing,
    page,
    sort,
    setSort,
    setPage,
    handleRefresh,
  }
}
