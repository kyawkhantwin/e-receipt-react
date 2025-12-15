import { Skeleton } from '@heroui/skeleton'

interface TableSkeletonProps {
  rows?: number
  columns?: number
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="w-full space-y-3">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 rounded-md" />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 rounded-md" />
          ))}
        </div>
      ))}
    </div>
  )
}

export default TableSkeleton
