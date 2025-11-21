export interface TerminalData {
  serial: string
  appId: string | null
  tid: string | null
  mid: string[]
  totalTransactions: number
  totalAmount: number
  address: string
  secondaryAddress: string
}

export interface MerchantTerminalsResponse {
  status: number
  message: string
  data: {
    terminals: TerminalData[]
  }
}