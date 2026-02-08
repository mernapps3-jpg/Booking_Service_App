import Button from "../ui/Button"

const ErrorState = ({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  onRetry,
}) => (
  <div className="flex flex-col items-center gap-4 rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
    <div className="text-lg font-semibold">{title}</div>
    <p className="text-sm">{description}</p>
    {onRetry ? (
      <Button variant="outline" onClick={onRetry}>
        Retry
      </Button>
    ) : null}
  </div>
)

export default ErrorState
