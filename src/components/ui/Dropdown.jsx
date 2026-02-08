import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Dropdown = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  label,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false)
      buttonRef.current?.focus()
    }
  }

  const handleKeyDown = (event) => {
    if (disabled) return

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault()
        setIsOpen(!isOpen)
        break
      case "ArrowDown":
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          const currentIndex = options.findIndex(
            (opt) => getOptionValue(opt) === value
          )
          const nextIndex = Math.min(currentIndex + 1, options.length - 1)
          onChange(getOptionValue(options[nextIndex]))
        }
        break
      case "ArrowUp":
        event.preventDefault()
        if (isOpen) {
          const currentIndex = options.findIndex(
            (opt) => getOptionValue(opt) === value
          )
          const prevIndex = Math.max(currentIndex - 1, 0)
          onChange(getOptionValue(options[prevIndex]))
        }
        break
      default:
        break
    }
  }

  const getOptionValue = (option) => {
    return typeof option === "object" ? option.value : option
  }

  const getOptionLabel = (option) => {
    return typeof option === "object" ? option.label : option
  }

  const selectedOption = options.find(
    (opt) => getOptionValue(opt) === value
  )
  const displayValue = selectedOption
    ? getOptionLabel(selectedOption)
    : placeholder

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
    buttonRef.current?.focus()
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="mb-1 block text-xs font-semibold text-slate-500">
          {label}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`flex w-full items-center justify-between gap-2 rounded-2xl border bg-slate-50 px-3 py-2 text-sm text-left transition-all outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:bg-white dark:hover:bg-slate-900"
        } ${isOpen ? "border-brand-500" : "border-slate-200"}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label || "Select option"}
      >
        <span
          className={`truncate ${
            !selectedOption ? "text-slate-400" : "text-slate-900 dark:text-white"
          }`}
        >
          {displayValue}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900"
            role="listbox"
          >
            <div className="max-h-60 overflow-auto p-1">
              {options.length === 0 ? (
                <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                  No options available
                </div>
              ) : (
                options.map((option, index) => {
                  const optionValue = getOptionValue(option)
                  const optionLabel = getOptionLabel(option)
                  const isSelected = value === optionValue

                  return (
                    <button
                      key={optionValue || index}
                      type="button"
                      onClick={() => handleSelect(optionValue)}
                      className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-left transition-colors ${
                        isSelected
                          ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400"
                          : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span className="truncate">{optionLabel}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 flex-shrink-0 text-brand-600 dark:text-brand-400" />
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown
