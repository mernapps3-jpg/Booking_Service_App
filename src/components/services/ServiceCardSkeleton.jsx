const ServiceCardSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <div className="h-44 w-full animate-pulse bg-slate-200 dark:bg-slate-800" />
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="mt-auto flex gap-2">
        <div className="h-9 flex-1 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-9 flex-1 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  </div>
)

export default ServiceCardSkeleton
