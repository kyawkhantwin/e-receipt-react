export interface TerminalData {
  id: string
  serial: string
  terminalId: string
  status: string
  merchantId: string
  address: string | null
  address2: string | null
  address3: string | null
  name: string
  appId: string | null
  tid: string | null
  mid: string[]
  merchantName?: string
  totalTransactions: number
  totalAmount: number
}

export interface MerchantTerminalsResponse {
  status: number
  message: string
  data: {
    terminals: TerminalData[]
  }
}
