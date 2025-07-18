export type DE3Type =
  | 'S' // Sale
  | 'V' // Void
  | 'P' // Preauth
  | 'PV' // Preauth Void
  | 'PC' // Preauth Complete
  | 'PCV' // Preauth Complete Void
  | 'ST' // Settlement
  | 'QR' // QR Payment
  | 'QRV' // QR Void
  | 'R' // Refund

export type DE22Type =
  | 'C' // Chip
  | 'W' // Contactless (CtLS)
  | 'M' // Magstripe
  | 'F' // Fallback
  | 'K' // Key-in

export type DE39Type =
  | 'A' // Approved
  | 'E' // Error

export interface TransactionType {
  DE2?: string
  DE3?: string
  DE4: string
  DE7?: string
  DE11: string
  DE22?: string
  DE37: string
  DE38?: string
  DE39: string
  DE41: string
  DE42: string
  DE49: string
  description: string
  batch_number: string
  invoice_number: string
  card_label?: string
  DE63_01?: string //sale count
  DE63_02?: string //total sale amount
  DE63_03?: string // refund count
  DE63_04?: string //refund amount
}
export type HomeData = {
  transactions: TransactionType[]
  pagination: paginationData
}
export type paginationData = {
  totalPage: number
  totalItems: number
  page: number
  limit: number
}

export const entryModeMap: Record<string, string> = {
  C: 'Chip',
  W: 'Contactless',
  M: 'Magstripe',
  F: 'Fallback',
  K: 'Manual Entry',
  PP: 'PayPass',
  PW: 'PayWave',
  QP: 'QuickPass',
}
export const DE3Map: Record<string, string> = {
  S: 'Sale',
  V: 'Void Sale',
  P: 'Preauth',
  PV: 'Preauth Void',
  PC: 'Preauth Complete',
  PCV: 'Preauth Complete Void',
  ST: 'Settlement',
  QR: 'QR Payment',
  QRV: 'QR Refund',
  R: 'Refund',
  CAV: 'Cash Advance',
}