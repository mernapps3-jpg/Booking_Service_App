import { NavLink, Link, useNavigate } from "react-router-dom"
import { CalendarCheck, Heart, LayoutGrid, Moon, Sun, LogIn, LogOut, User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { selectTheme, toggleTheme, showToast } from "../../store/uiSlice"
import { selectIsAuthenticated, selectUser, logout } from "../../store/authSlice"
import Button from "../ui/Button"

// Function that returns className based on active state
// NavLink passes isActive prop automatically
// This highlights the current route in the navigation
const navLinkStyles = ({ isActive }) =>
  `flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" // Active styles
      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" // Inactive styles
  }`

const Navbar = () => {
  // Hooks to interact with Redux store and React Router
  const dispatch = useDispatch() // To dispatch actions
  const navigate = useNavigate() // To programmatically navigate
  const theme = useSelector(selectTheme) // Get current theme from store
  const isAuthenticated = useSelector(selectIsAuthenticated) // Check if user is logged in
  const user = useSelector(selectUser) // Get current user object

  // Handler function for logout button
  const handleLogout = () => {
    dispatch(logout()) // Clear auth state
    dispatch(
      showToast({
        message: "Logged out successfully",
        type: "success",
      })
    )
    navigate("/") // Redirect to home page
  }

  return (
    // sticky: Navbar stays at top when scrolling
    // z-30: High z-index so it appears above other content
    // bg-white/80: 80% opacity white background
    // backdrop-blur: Blur effect behind navbar
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo/Brand - Link to home page */}
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-500 text-white">
            S
          </span>
          ServiceFlow
        </Link>
        {/* Navigation links - hidden on mobile, visible on md+ screens */}
        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkStyles} end>
            {/* end prop: Only active when path exactly matches "/" */}
            <LayoutGrid className="h-4 w-4" />
            Services
          </NavLink>
          {/* Conditional rendering: Only show these links if user is authenticated */}
          {isAuthenticated && (
            <>
              <NavLink to="/favorites" className={navLinkStyles}>
                <Heart className="h-4 w-4" />
                Favorites
              </NavLink>
              <NavLink to="/bookings" className={navLinkStyles}>
                <CalendarCheck className="h-4 w-4" />
                My Bookings
              </NavLink>
            </>
          )}
        </nav>
        {/* Right side: User info and actions */}
        <div className="flex items-center gap-3">
          {/* Conditional rendering based on auth status */}
          {isAuthenticated ? (
            <>
              {/* User info - hidden on mobile, visible on md+ */}
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900 md:flex">
                <User className="h-4 w-4 text-slate-500" />
                {/* Optional chaining (?.) safely accesses user.name */}
                <span className="text-slate-700 dark:text-slate-300">
                  {user?.name || "User"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                {/* Text hidden on small screens, visible on sm+ */}
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            // Show login button if not authenticated
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate("/login")}
              className="gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          )}
          {/* Theme toggle button */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="flex h-10 w-10 items-center justify-center rounded-full border bg-white text-slate-700 transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-slate-900 dark:text-slate-200"
            aria-label="Toggle dark mode" // Accessibility: screen readers
            type="button"
          >
            {/* Show sun icon in dark mode, moon icon in light mode */}
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
