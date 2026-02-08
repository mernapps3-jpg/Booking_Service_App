import { useEffect, useState } from "react"

// Custom hook to debounce a value
// Debouncing delays execution until after a specified time has passed
// Useful for search inputs to avoid making API calls on every keystroke
const useDebounce = (value, delay = 400) => {
  // State to hold the debounced value
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    // Set a timer to update debounced value after delay
    const timer = setTimeout(() => setDebounced(value), delay)
    
    // Cleanup function: clears timer if value changes before delay completes
    // This prevents multiple timers from running
    return () => clearTimeout(timer)
  }, [value, delay]) // Re-run when value or delay changes

  return debounced // Return the debounced value
}

export default useDebounce
