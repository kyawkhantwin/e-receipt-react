import { useState, useCallback } from 'react'

import { getAllMerchants } from '@/api/reportService'
import { PaginatedMerchantResponseDto } from '@/types/MerchantTypes'

interface UseMerchantsResult {
  merchants: PaginatedMerchantResponseDto | null
  loading: boolean
  error: any
  fetchMerchants: (page?: number, limit?: number, searchTerm?: string) => Promise<void>
}

const useMerchants = (): UseMerchantsResult => {
  const [merchants, setMerchants] = useState<PaginatedMerchantResponseDto | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchMerchants = useCallback(
    async (page: number = 1, limit: number = 10, searchTerm: string = '') => {
      setLoading(true)
      setError(null)
      try {
        const response = await getAllMerchants(page, limit, searchTerm)

        if (response && response.merchants) {
          setMerchants(response)
        }
        console.log(response)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    merchants,
    loading,
    error,
    fetchMerchants,
  }
}

export default useMerchants
