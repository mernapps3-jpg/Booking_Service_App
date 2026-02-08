import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const pad = (value) => String(value).padStart(2, "0")

const toDateString = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)

const addMonths = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1)

const getCalendarDays = (monthDate) => {
  const start = startOfMonth(monthDate)
  const startDay = start.getDay()
  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 42; i += 1) {
    const day = new Date(start)
    day.setDate(start.getDate() - startDay + i)
    day.setHours(0, 0, 0, 0)
    days.push({
      date: day,
      inMonth: day.getMonth() === monthDate.getMonth(),
      isPast: day < today,
    })
  }

  return days
}

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const DatePicker = ({ value, onChange }) => {
  const initialDate = value ? new Date(value) : new Date()
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(initialDate))

  const days = useMemo(
    () => getCalendarDays(visibleMonth),
    [visibleMonth]
  )

  const handleSelect = (date) => {
    onChange(toDateString(date))
  }

  return (
    <div className="rounded-2xl border bg-white p-3 text-sm shadow-soft dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between pb-3">
        <button
          type="button"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
          className="rounded-full border p-1 text-slate-500 transition hover:text-slate-700 dark:border-slate-700"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          {visibleMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          type="button"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          className="rounded-full border p-1 text-slate-500 transition hover:text-slate-700 dark:border-slate-700"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-slate-400">
        {weekdayLabels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center">
        {days.map((day) => {
          const dayString = toDateString(day.date)
          const isSelected = value === dayString
          return (
            <button
              key={dayString}
              type="button"
              onClick={() => handleSelect(day.date)}
              disabled={day.isPast}
              className={`h-9 rounded-full text-xs font-semibold transition ${
                isSelected
                  ? "bg-brand-500 text-white"
                  : day.inMonth
                  ? "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  : "text-slate-300 dark:text-slate-700"
              } ${day.isPast ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {day.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DatePicker
