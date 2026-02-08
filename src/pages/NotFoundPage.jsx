import { Link } from "react-router-dom"

const NotFoundPage = () => (
  <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <h1 className="text-3xl font-semibold">Page not found</h1>
    <p className="text-sm text-slate-500 dark:text-slate-400">
      The page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
    >
      Back to services
    </Link>
  </div>
)

export default NotFoundPage
