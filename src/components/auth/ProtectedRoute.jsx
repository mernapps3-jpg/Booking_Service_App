import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../../store/authSlice"

// ProtectedRoute component - Route guard pattern
// Wraps routes that require authentication
// If user is not authenticated, redirects to login page
const ProtectedRoute = ({ children }) => {
  // Get authentication status from Redux store
  const isAuthenticated = useSelector(selectIsAuthenticated)

  // If not authenticated, redirect to login
  // replace prop: replaces current history entry (can't go back)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If authenticated, render the protected component
  return children
}

export default ProtectedRoute
