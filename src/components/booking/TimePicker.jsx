import { useState, useRef, useEffect } from "react"
import { Clock } from "lucide-react"

const pad = (value) => String(value).padStart(2, "0")

const toTimeString = (hours, minutes) => `${pad(hours)}:${pad(minutes)}`

const parseTimeString = (timeString) => {
  if (!timeString) return { hours: 9, minutes: 0 }
  const [hours, minutes] = timeString.split(":").map(Number)
  return { hours: hours || 9, minutes: minutes || 0 }
}

const TimePicker = ({ value, onChange }) => {
  const { hours: initialHours, minutes: initialMinutes } = parseTimeString(value)
  const [hours, setHours] = useState(initialHours)
  const [minutes, setMinutes] = useState(initialMinutes)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const { hours: parsedHours, minutes: parsedMinutes } = parseTimeString(value)
    setHours(parsedHours)
    setMinutes(parsedMinutes)
  }, [value])

  useEffect(() => {
    if (isOpen) {
      onChange(toTimeString(hours, minutes))
    }
  }, [hours, minutes, isOpen, onChange])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const formatDisplayTime = (h, m) => {
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h
    const ampm = h >= 12 ? "PM" : "AM"
    return `${hour12}:${pad(m)} ${ampm}`
  }

  const hoursList = Array.from({ length: 24 }, (_, i) => i)
  const minutesList = [0, 15, 30, 45]

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950"
      >
        <span className="text-slate-700 dark:text-slate-200">
          {value ? formatDisplayTime(hours, minutes) : "--:--"}
        </span>
        <Clock className="h-4 w-4 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-2xl border bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-1.5 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
            {formatDisplayTime(hours, minutes)}
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="mb-1 text-center text-xs font-semibold text-slate-500">Hour</div>
              <div className="max-h-[130px] space-y-0.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent dark:scrollbar-thumb-slate-600">
                {hoursList.map((h) => {
                  const isSelected = h === hours
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHours(h)}
                      className={`w-full rounded-lg px-2 py-1.5 text-sm font-semibold transition ${
                        isSelected
                          ? "bg-brand-500 text-white"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {pad(h)}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-1 text-center text-xs font-semibold text-slate-500">Minute</div>
              <div className="space-y-0.5">
                {minutesList.map((m) => {
                  const isSelected = m === minutes
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMinutes(m)}
                      className={`w-full rounded-lg px-2 py-1.5 text-sm font-semibold transition ${
                        isSelected
                          ? "bg-brand-500 text-white"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {pad(m)}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimePicker
