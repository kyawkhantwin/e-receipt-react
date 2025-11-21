type PaginationParams = {
  page: number
  limit: number
  sort?: string
  serial: string
}

export const ApiConfig = {
  auth: '/auth/login',
  transaction: ({ page, limit, sort, serial }: PaginationParams) =>
    `/transaction?page=${page}&limit=${limit}&serial=${serial}${sort ? `&sort=${sort}` : ''}`,
  terminalList: (merchantId: string) => `/terminal/list/${merchantId}`,
  report: '/terminal/report',
}
