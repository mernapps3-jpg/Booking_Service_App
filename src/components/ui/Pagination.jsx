import Button from "./Button"

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </Button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
            pageNumber === page
              ? "bg-brand-500 text-white"
              : "border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          }`}
          type="button"
        >
          {pageNumber}
        </button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination
