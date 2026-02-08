import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postBooking } from "../services/api"

const loadBookings = () => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("bookings")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveBookings = (bookings) => {
  if (typeof window === "undefined") return
  localStorage.setItem("bookings", JSON.stringify(bookings))
}

const initialState = {
  bookings: loadBookings(),
  status: "idle",
  error: null,
  lastBooking: null,
}

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload, { getState }) => {
    const booking = await postBooking(payload)
    const current = getState().booking.bookings
    const updated = [booking, ...current]
    saveBookings(updated)
    return { booking, updated }
  }
)

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearLastBooking(state) {
      state.lastBooking = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.bookings = action.payload.updated
        state.lastBooking = action.payload.booking
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error?.message || "Unable to create booking."
      })
  },
})

export const { clearLastBooking } = bookingSlice.actions

export const selectBookings = (state) => state.booking.bookings
export const selectBookingStatus = (state) => state.booking.status
export const selectBookingError = (state) => state.booking.error
export const selectLastBooking = (state) => state.booking.lastBooking

export default bookingSlice.reducer
