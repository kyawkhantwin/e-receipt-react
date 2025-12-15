import { Skeleton } from '@heroui/skeleton'

interface SkeletonBlockProps {
  width?: string
  height?: string
  rounded?: string
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-lg',
}) => {
  return <Skeleton className={`${width} ${height} ${rounded}`} />
}

export default SkeletonBlock
