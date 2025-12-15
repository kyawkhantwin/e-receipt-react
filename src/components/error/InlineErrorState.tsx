import { Button } from '@heroui/button'

interface InlineErrorStateProps {
  message: string
  onRetry?: () => void
}

const InlineErrorState: React.FC<InlineErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="border-danger/30 flex flex-col items-center gap-2 rounded-xl border p-4 text-center">
      <span className="text-danger text-sm font-medium">{message}</span>

      {onRetry && (
        <Button size="sm" variant="bordered" onPress={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}

export default InlineErrorState
