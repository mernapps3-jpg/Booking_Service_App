import { createSlice } from "@reduxjs/toolkit"

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light"
  const stored = localStorage.getItem("theme")
  if (stored) return stored
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

const initialState = {
  theme: getInitialTheme(),
  isBookingOpen: false,
  toast: null,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark"
    },
    setTheme(state, action) {
      state.theme = action.payload
    },
    openBooking(state) {
      state.isBookingOpen = true
    },
    closeBooking(state) {
      state.isBookingOpen = false
    },
    showToast(state, action) {
      state.toast = action.payload
    },
    hideToast(state) {
      state.toast = null
    },
  },
})

export const {
  toggleTheme,
  setTheme,
  openBooking,
  closeBooking,
  showToast,
  hideToast,
} = uiSlice.actions

export const selectTheme = (state) => state.ui.theme
export const selectBookingOpen = (state) => state.ui.isBookingOpen
export const selectToast = (state) => state.ui.toast

export default uiSlice.reducer
