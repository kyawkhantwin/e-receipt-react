import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table'
import { Pagination } from '@heroui/pagination'
import { Input } from '@heroui/input'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import useMerchants from '@/hooks/useMerchants'
import InlineErrorState from '@/components/error/InlineErrorState'
import TableSkeleton from '@/components/skeleton/TableSkeleton'
import { setSelectedMerchant } from '@/redux/merchantSlice'
import { MerchantResponseDto } from '@/types/MerchantTypes'
import useDebounce from '@/hooks/useDebounce'

export default function MerchantPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { merchants, loading, error, fetchMerchants } = useMerchants()

  const handleFetchMerchants = useCallback(() => {
    fetchMerchants(page, limit, debouncedSearchTerm)
  }, [fetchMerchants, page, limit, debouncedSearchTerm])

  useEffect(() => {
    handleFetchMerchants()
  }, [handleFetchMerchants])

  const handleRowClick = (merchant: MerchantResponseDto) => {
    dispatch(setSelectedMerchant(merchant))
    navigate(`/merchants/${merchant.id}`)
  }

  if (loading) {
    return (
      <div className="p-6">
        <TableSkeleton columns={5} rows={10} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <InlineErrorState message={error.message} onRetry={handleFetchMerchants} />
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-semibold">Merchant List</h1>

        <Input
          isClearable
          className="w-full md:max-w-sm"
          placeholder="Search merchants..."
          value={searchTerm}
          onValueChange={value => {
            setSearchTerm(value)
          }}
        />
        <div />
      </div>

      <div className="relative overflow-x-auto rounded-lg">
        <Table aria-label="Merchant table">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn className="hidden sm:table-cell">Mobile</TableColumn>
            <TableColumn className="hidden md:table-cell">Address</TableColumn>
            <TableColumn className="hidden lg:table-cell">Address2</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No merchants found">
            {(merchants?.merchants || []).map(merchant => (
              <TableRow
                key={merchant.id}
                className="hover:bg-default-100 cursor-pointer transition"
                onClick={() => handleRowClick(merchant)}
              >
                <TableCell>{merchant.id}</TableCell>
                <TableCell>{merchant.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{merchant.mobile}</TableCell>
                <TableCell className="hidden md:table-cell">{merchant.address}</TableCell>
                <TableCell className="hidden lg:table-cell">{merchant.address2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {merchants && (
        <div className="flex justify-center pt-2">
          <Pagination showControls page={page} total={merchants.meta.lastPage} onChange={setPage} />
        </div>
      )}
    </div>
  )
}
