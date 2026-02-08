import { createSelector, createSlice } from "@reduxjs/toolkit"

const loadFavorites = () => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("favorites")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveFavorites = (favorites) => {
  if (typeof window === "undefined") return
  localStorage.setItem("favorites", JSON.stringify(favorites))
}

const initialState = {
  items: loadFavorites(),
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload
      const exists = state.items.includes(id)
      state.items = exists
        ? state.items.filter((item) => item !== id)
        : [id, ...state.items]
      saveFavorites(state.items)
    },
    clearFavorites(state) {
      state.items = []
      saveFavorites([])
    },
  },
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions

export const selectFavorites = (state) => state.favorites.items
export const selectIsFavorite = createSelector(
  [selectFavorites, (_, id) => id],
  (favorites, id) => favorites.includes(id)
)

export default favoritesSlice.reducer
