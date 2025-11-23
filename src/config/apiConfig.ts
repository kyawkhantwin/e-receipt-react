type PaginationParams = {
  page: number
  limit: number
  sort?: string
  serial: string
  search?: string
}

export const ApiConfig = {
  auth: '/auth/login',
  transaction: ({ page, limit, sort, serial, search }: PaginationParams) =>
    `/transaction?page=${page}&limit=${limit}&serial=${serial}${sort ? `&sort=${sort}` : ''}${search ? `&search=${search}` : ''}`,
  terminalList: (merchantId: string) => `/terminal/list/${merchantId}`,
  report: `/terminal/report`,
  resetPassword: '/auth/reset-password',
}
