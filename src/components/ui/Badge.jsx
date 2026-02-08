const tones = {
  neutral:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  accent: "bg-brand-100 text-brand-700",
}

const Badge = ({ children, tone = "neutral" }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]} max-w-fit`}
  >
    {children}
  </span>
)

export default Badge
