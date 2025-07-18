export interface TransactionTableType {
  rid: string
  amount: string
  statusLabel: string
  approved: boolean
  dateISO: {
    date: string
    time: string
    distanceToNow: string
  }
  type: String
}
