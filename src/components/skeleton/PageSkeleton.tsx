import CardSkeleton from './CardSkeleton'
import TableSkeleton from './TableSkeleton'

type PageSkeletonProps =
  | { variant: 'card'; count?: number }
  | { variant: 'table'; rows?: number; columns?: number }

const PageSkeleton: React.FC<PageSkeletonProps> = props => {
  if (props.variant === 'table') {
    return <TableSkeleton columns={props.columns} rows={props.rows} />
  }

  return <CardSkeleton count={props.count} />
}

export default PageSkeleton
