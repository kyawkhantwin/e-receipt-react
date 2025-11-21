export interface CashierReportResponse {
  status: number;
  message: string;
  data: {
    report: {
      serial: string;
      appId: string;
      totalTransactions: number;
      totalAmount: number;
    };
  };
}

export interface MerchantReportData {
  serial: string;
  appId: string;
  tid: string;
  mid: string;
  totalTransactions: number;
  totalAmount: number;
}

export interface MerchantReportResponse {
  status: number;
  message: string;
  data: {
    report: MerchantReportData[];
    totalTransactions: number;
    totalAmount: number;
  };
}