import { Button } from '@heroui/button'

interface ErrorStateProps {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred',
  actionLabel = 'Retry',
  onAction,
}) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-4 text-center">
      <span className="text-danger text-lg font-semibold">{title}</span>
      <span className="text-default-500 text-sm">{message}</span>

      {onAction && (
        <Button variant="bordered" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default ErrorState
