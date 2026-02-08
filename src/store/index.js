import { configureStore } from "@reduxjs/toolkit"
import servicesReducer from "./servicesSlice"
import bookingReducer from "./bookingSlice"
import chatReducer from "./chatSlice"
import uiReducer from "./uiSlice"
import favoritesReducer from "./favoritesSlice"
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    booking: bookingReducer,
    chat: chatReducer,
    ui: uiReducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
})
