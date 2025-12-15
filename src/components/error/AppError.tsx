import ErrorState from './ErrorState'
import InlineErrorState from './InlineErrorState'

type AppErrorProps =
  | {
      variant: 'page'
      title?: string
      message?: string
      onRetry?: () => void
    }
  | {
      variant: 'inline'
      message: string
      onRetry?: () => void
    }

const AppError: React.FC<AppErrorProps> = props => {
  if (props.variant === 'inline') {
    return <InlineErrorState message={props.message} onRetry={props.onRetry} />
  }

  return <ErrorState message={props.message} title={props.title} onAction={props.onRetry} />
}

export default AppError
