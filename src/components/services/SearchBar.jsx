import { Search } from "lucide-react"

// SearchBar component - controlled component pattern
// Props:
//   value: Current search input value (controlled by parent)
//   onChange: Callback function when input changes
//   count: Number of services found (displayed in badge)
const SearchBar = ({ value, onChange, count }) => (
  // Container: flex-col on mobile, flex-row on md+ screens
  <div className="flex flex-col gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-soft dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center">
    {/* Input container: flex-1 makes it take available space */}
    <div className="flex flex-1 items-center gap-3">
      <Search className="h-4 w-4 text-slate-400" />
      {/* Controlled input: value and onChange come from parent */}
      <input
        type="text"
        value={value} // Controlled: value comes from props
        onChange={(event) => onChange(event.target.value)} // Call parent's onChange
        placeholder="Search services, locations, or keywords..."
        className="w-full bg-transparent text-sm outline-none"
        aria-label="Search services" // Accessibility: screen reader label
      />
    </div>
    {/* Results count badge */}
    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
      {count} services
    </div>
  </div>
)

export default SearchBar
