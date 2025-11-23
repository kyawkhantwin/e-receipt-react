import { useState, useCallback } from 'react'
import { getReport } from '@/api/reportService'
import { CashierReportResponse, MerchantReportResponse } from '@/types/ReportTypes'

interface UseReportResult {
  report: CashierReportResponse | MerchantReportResponse | null
  loading: boolean
  error: any
  fetchReport: (params: { serial?: string; merchantId: string }) => Promise<void>
}

const useReport = (): UseReportResult => {
  const [report, setReport] = useState<CashierReportResponse | MerchantReportResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchReport = useCallback(async (params: { serial?: string; merchantId: string }) => {
    setLoading(true)
    setError(null)
    try {
      const response = await getReport(params)
      setReport(response)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    report,
    loading,
    error,
    fetchReport,
  }
}

export default useReport
