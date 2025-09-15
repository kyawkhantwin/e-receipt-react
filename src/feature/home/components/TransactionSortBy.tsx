import React from 'react'
import { Select, SelectSection, SelectItem } from '@heroui/select'
const sortOptions = [
  { key: 'desc', label: 'Newest' },
  { key: 'asc', label: 'Oldest' },
  { key: 'rid', label: 'RID' },
]

interface TransactionSortByProps {
  sort: string
  onChange: (sort: string) => void
}

const TransactionSortBy: React.FC<TransactionSortByProps> = ({ onChange, sort }) => {
  return (
    <div className="relative w-32">
      <Select
        selectedKeys={[sort]}
        onSelectionChange={(keys: any) => onChange(Array.from(keys)[0] as string)}
        className="w-full"
        aria-label="Select sort order"
      >
        {sortOptions.map(option => (
          <SelectItem key={option.key}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default TransactionSortBy
