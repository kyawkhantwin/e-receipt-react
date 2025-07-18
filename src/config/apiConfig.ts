type PaginationParams = {
  page: number
  limit: number
  sort?: string
}

export const ApiConfig = {
  auth: '/auth/login',
  transaction: ({ page, limit, sort }: PaginationParams) =>
    `/transaction?page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}`,
}
