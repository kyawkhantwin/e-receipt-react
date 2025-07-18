import React from 'react'
import { ChevronDown } from 'lucide-react'

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
      <select
        value={sort}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        className="w-full appearance-none rounded-md border bg-transparent px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
      >
        {sortOptions.map((option) => (
          <option
            key={option.key}
            value={option.key}
            className="font-medium text-gray-700"
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  )
}

export default TransactionSortBy
