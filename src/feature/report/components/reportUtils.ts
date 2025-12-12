import { SummaryItem, TerminalReport } from './types'

export const aggregateCombinedSummaryFromReport = (reportList: any[]): SummaryItem[] => {
  const combined: SummaryItem[] = []
  reportList.forEach((item: any) => {
    const currencyReports = item.currencyReports ?? []
    currencyReports.forEach((r: any) => {
      combined.push(r)
    })
  })
  return combined
}

export const deriveTerminalReports = (reportList: any[]): TerminalReport[] => {
  return reportList.map((item: any) => {
    const currencyReports = item.currencyReports ?? []
    const totalTransactions = currencyReports.reduce(
      (acc: number, r: any) => acc + (r.totalTransactions ?? 0),
      0
    )
    const totalAmount = currencyReports.reduce(
      (acc: number, r: any) => acc + (r.totalAmount ?? 0),
      0
    )
    return {
      serial: item.serial ?? 'Unknown',
      totalTransactions,
      totalAmount,
      currencyReports,
    }
  })
}
