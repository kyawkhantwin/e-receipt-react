export interface MerchantResponseDto {
  id: string
  name: string
  mobile: string
  description: string | null
  address: string
  address2: string | null
  phone: string | null
  mids: string
  createdBy: string
  updatedBy: string | null
  createdAt: string
  updatedAt: string
}

export interface MetaDto {
  total: number
  page: string
  lastPage: number
}

export interface PaginatedMerchantResponseDto {
  merchants: MerchantResponseDto[]
  meta: MetaDto
}
