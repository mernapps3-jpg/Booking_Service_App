const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"

const variants = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 dark:hover:bg-brand-400",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
  outline:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
  ghost: "text-slate-600 hover:text-slate-900 dark:text-slate-300",
}

const sizes = {
  sm: "px-3 py-1.5",
  md: "px-4 py-2",
  lg: "px-5 py-2.5",
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) => (
  <button
    type={type}
    className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
)

export default Button
