import React from 'react'
import { Select, SelectItem } from '@heroui/select'
const sortOptions = [
  { key: '1d', label: '1 Day' },
  { key: '1w', label: '1 Week' },
  { key: '1m', label: '1 Month' },
]

interface TransactionSortByProps {
  sort: string
  onChange: (sort: string) => void
}

const TransactionSortBy: React.FC<TransactionSortByProps> = ({ onChange, sort }) => {
  return (
    <div className="relative w-32">
      <Select
        aria-label="Select sort order"
        className="w-full"
        selectedKeys={[sort]}
        onSelectionChange={(keys: any) => onChange(Array.from(keys)[0] as string)}
      >
        {sortOptions.map(option => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default TransactionSortBy
