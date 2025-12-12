export type SummaryItem = {
  currency: string
  responseCode: string
  totalTransactions: number
  totalAmount: number
  history?: number[]
}

export type TerminalReport = {
  serial: string
  totalTransactions: number
  totalAmount: number
  currencyReports: any[]
}

export type TransactionCardsProps = {
  combinedSummary: SummaryItem[]
  terminalReports: TerminalReport[]
}