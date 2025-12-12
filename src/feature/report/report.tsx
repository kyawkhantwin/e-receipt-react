import { useEffect, useState } from 'react'
import { getReport } from '../../api/reportService'
import { useAuthToken } from '@/utils/useAuthToken'
import LoadingSpinner from '@/components/LoadingSpinner.tsx'
import { addToast } from '@heroui/toast'
import TransactionCardsUI from './components/TransactionCardsUI'
import { SummaryItem, TerminalReport } from './components/types'
import { aggregateCombinedSummaryFromReport, deriveTerminalReports } from './components/reportUtils'
import { Select, SelectItem } from '@heroui/select'

export default function ReportPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1d')
  const [combinedSummary, setCombinedSummary] = useState<SummaryItem[]>([])
  const { getAuthData } = useAuthToken()
  const { merchantId } = getAuthData()
  const [terminalReports, setTerminalReports] = useState<TerminalReport[]>([])
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true)
        const data = await getReport({ merchantId: merchantId!, range: selectedTimeframe })

        const reportList: any = data?.data?.report ?? []

        const combined = aggregateCombinedSummaryFromReport(reportList)
        setCombinedSummary(combined)

        const terminals = deriveTerminalReports(reportList)
        setTerminalReports(terminals)
      } catch (err: any) {
        addToast({
          title: 'Error',
          description: err?.response?.message ?? err?.message ?? 'Failed to fetch report',
          color: 'danger',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [merchantId, selectedTimeframe])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Report Dashboard</h1>
        <div className="mb-4 w-50">
          <Select
            label="Select Timeframe"
            selectedKeys={[selectedTimeframe]}
            onSelectionChange={keys => setSelectedTimeframe(Array.from(keys)[0] as string)}
            className="max-w-xs"
          >
            <SelectItem key="1d">Last 24 Hours</SelectItem>
            <SelectItem key="7d">Last 7 Days</SelectItem>
            <SelectItem key="1m">Last 1 Month</SelectItem>
          </Select>
        </div>
      </div>

      <TransactionCardsUI combinedSummary={combinedSummary} terminalReports={terminalReports} />
    </div>
  )
}
