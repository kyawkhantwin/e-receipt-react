import { Card, CardBody, CardHeader } from '@heroui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'

import { SummaryItem, TerminalReport } from './types'
function TransactionCardsUI({
  combinedSummary,
  terminalReports,
}: {
  combinedSummary: SummaryItem[]
  terminalReports: TerminalReport[]
}) {
  const formatCurrency = (amount: number, currency = 'USD') => {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
    } catch {
      return `$${amount.toFixed(2)}`
    }
  }

  const makeSparkData = (history?: number[]) => {
    if (!history || history.length === 0)
      return Array.from({ length: 8 }).map((_, i) => ({ i, v: 0 }))

    return history.slice(-12).map((v, i) => ({ i, v }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {combinedSummary.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex items-center justify-between">
              <div>
                <h4 className="text-md mb-2 font-semibold">
                  {item.currency} • {item.responseCode === 'A' ? 'Success' : 'Failed'}
                </h4>
                <p className="text-muted-foreground">
                  {item.totalTransactions.toLocaleString()} tx
                </p>
              </div>
              <div className="text-right">
                <div className="text-muted-foreground mb-2">Amount</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(item.totalAmount, item.currency)}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="w-full">
                <ResponsiveContainer height={20} width="100%">
                  <LineChart data={makeSparkData(item.history)}>
                    <Line dataKey="v" dot={false} strokeWidth={2} type="monotone" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>Transactions per Terminal</CardHeader>
          <CardBody>
            <ResponsiveContainer height={300} width="100%">
              <BarChart data={terminalReports}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="serial" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="totalTransactions" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Amount Breakdown by Terminal</CardHeader>
          <CardBody>
            <ResponsiveContainer height={300} width="100%">
              <PieChart>
                <Pie
                  label
                  cx="50%"
                  cy="50%"
                  data={terminalReports.map(item => ({
                    name: item.serial,
                    value: item.totalAmount,
                  }))}
                  dataKey="value"
                  outerRadius={100}
                >
                  {terminalReports.map((_, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: any) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
export default TransactionCardsUI
