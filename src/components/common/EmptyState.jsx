import Button from "../ui/Button"

const EmptyState = ({
  title = "No results found",
  description = "Try adjusting your filters or searching for another service.",
  actionLabel,
  onAction,
}) => (
  <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <div className="text-lg font-semibold">{title}</div>
    <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
    {actionLabel ? (
      <Button variant="outline" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </div>
)

export default EmptyState
