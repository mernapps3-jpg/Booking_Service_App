import { createSlice } from "@reduxjs/toolkit"

// Default credentials for demo purposes
const DEFAULT_EMAIL = "user@example.com"
const DEFAULT_PASSWORD = "password123"

// Helper function to get auth from localStorage on app load
// This persists authentication across page refreshes
const getInitialAuth = () => {
  // Check if we're in browser (not SSR)
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("auth")
  if (stored) {
    try {
      return JSON.parse(stored) // Parse JSON string to object
    } catch {
      return null // Return null if parsing fails
    }
  }
  return null
}

// Initial state - loads from localStorage if available
const initialState = {
  user: getInitialAuth(), // User object or null
  isAuthenticated: !!getInitialAuth(), // Boolean: true if user exists
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Called after successful login
    // action.payload contains user object { id, email, name }
    loginSuccess(state, action) {
      state.user = action.payload
      state.isAuthenticated = true
      // Persist to localStorage so user stays logged in after refresh
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(action.payload))
      }
    },
    // Called after successful registration
    // Same logic as loginSuccess
    registerSuccess(state, action) {
      state.user = action.payload
      state.isAuthenticated = true
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(action.payload))
      }
    },
    // Called when user logs out
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      // Remove from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth")
      }
    },
  },
})

export const { loginSuccess, registerSuccess, logout } = authSlice.actions
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export { DEFAULT_EMAIL, DEFAULT_PASSWORD }

export default authSlice.reducer
