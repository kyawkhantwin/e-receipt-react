import axiosClient from '@/config/axiosConfig.ts'
import { CashierReportResponse, MerchantReportResponse } from '@/types/ReportTypes'
import { MerchantTerminalsResponse } from '@/types/TerminalTypes'

import { ApiConfig } from '@/config/apiConfig.ts'

export const getMerchantTerminals = async (
  merchantId: string
): Promise<MerchantTerminalsResponse> => {
  const response = await axiosClient.get(ApiConfig.terminalList(merchantId))
  return response.data
}

export const getReport = async (params?: {
  serial?: string
  merchantId?: string
}): Promise<CashierReportResponse | MerchantReportResponse> => {
  const response = await axiosClient.get(ApiConfig.report, { params })
  return response.data
}
