import { useState, useCallback } from 'react'

import { getMerchantTerminals } from '@/api/reportService'
import { TerminalData } from '@/types/TerminalTypes'

interface UseMerchantTerminalsResult {
  terminals: TerminalData[] | null
  loading: boolean
  error: any
  fetchTerminals: (merchantId: string) => Promise<void>
}

const useMerchantTerminals = (): UseMerchantTerminalsResult => {
  const [terminals, setTerminals] = useState<TerminalData[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchTerminals = useCallback(async (merchantId: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await getMerchantTerminals(merchantId)

      if (response.data && response.data.terminals) {
        setTerminals(response.data.terminals)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    terminals,
    loading,
    error,
    fetchTerminals,
  }
}

export default useMerchantTerminals
