import { useEffect, useState } from 'react'
import { getReport } from '../../api/reportService'
import { useAuthToken } from '@/utils/useAuthToken'
import { Card, CardBody, CardHeader } from '@heroui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

function ReportPage() {
  const [reportData, setReportData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { getAuthData } = useAuthToken()
  const { merchantId } = getAuthData()

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true)
        const data = await getReport({ merchantId: merchantId! })
        setReportData(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch report')
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [])

  if (loading) {
    return <div>Loading report...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="ma-w-7l mx-auto p-5">
      <h1 className="mb-6 text-2xl font-bold">Report Dashboard</h1>
      <div className="mb-6 grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Total Transactions</h3>
          </CardHeader>
          <CardBody>
            <p className="text-2xl font-bold">{reportData?.data?.totalTransactions || 0}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Total Amount</h3>
          </CardHeader>
          <CardBody>
            <p className="text-2xl font-bold">${(reportData?.data?.totalAmount || 0) / 100}</p>
          </CardBody>
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Transactions per Address</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={reportData?.data?.report.map((item: any) => ({
                  name: item.serial,
                  transactions: item.totalTransactions,
                }))}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="transactions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Amount Breakdown by Terminal</h3>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData?.data?.report.map((item: any) => ({
                    name: item.serial,
                    value: item.totalAmount,
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {reportData?.data?.report.map((_entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value / 100}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ReportPage
