type PaginationParams = {
  page: number
  limit: number
  sort?: string
  serial: string
  range?: string
  search?: string
}

export const ApiConfig = {
  auth: '/auth/login',
  transaction: ({ page, limit, range, sort, serial, search }: PaginationParams) =>
    `/transaction?page=${page}&limit=${limit}&serial=${serial}${range ? `&range=${range}` : ''}${search ? `&search=${search}` : ''}${sort ? `&sort=${sort}` : ''}`,
  terminalList: (merchantId: string) => `/terminal/list/${merchantId}`,
  report: `/terminal/report`,
  resetPassword: '/auth/reset-password',
}
