import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { getServiceById, getServices } from "../services/api"

// Initial state defines the structure of our services slice
// This is the starting point before any actions are dispatched
const initialState = {
  items: [], // Array of service objects fetched from API
  selected: null, // Currently selected service (for details page)
  status: "idle", // Loading state: "idle" | "loading" | "succeeded" | "failed"
  error: null, // Error message if fetch fails
  filters: {
    search: "", // Search query string
    category: "All", // Selected category filter
    rating: "all", // Minimum rating filter
    priceRange: "all", // Price range filter
    sort: "featured", // Sort option (featured, price-low, price-high, rating)
    page: 1, // Current page number
    pageSize: 6, // Number of items per page
  },
  pagination: {
    page: 1, // Current page
    totalPages: 1, // Total number of pages
    total: 0, // Total number of services
  },
}

// createAsyncThunk handles async operations (API calls)
// Automatically generates pending, fulfilled, and rejected actions
export const fetchServices = createAsyncThunk(
  "services/fetchServices", // Action type prefix
  async (overrides = {}, { getState }) => {
    // getState() gives us access to current Redux state
    const { filters } = getState().services
    // Merge current filters with any overrides, then call API
    return getServices({ ...filters, ...overrides })
  }
)

// Async thunk to fetch a single service by ID
// Used on the service details page
export const fetchServiceById = createAsyncThunk(
  "services/fetchServiceById",
  async (id) => getServiceById(id)
)

// createSlice automatically generates action creators and reducers
// Redux Toolkit uses Immer, so we can "mutate" state directly
const servicesSlice = createSlice({
  name: "services", // Slice name (used in action types)
  initialState,
  reducers: {
    // Synchronous reducers - update state immediately
    // action.payload contains the value passed when dispatching
    setSearch(state, action) {
      state.filters.search = action.payload
    },
    setCategory(state, action) {
      state.filters.category = action.payload
    },
    setRating(state, action) {
      state.filters.rating = action.payload
    },
    setPriceRange(state, action) {
      state.filters.priceRange = action.payload
    },
    setSort(state, action) {
      state.filters.sort = action.payload
    },
    setPage(state, action) {
      state.filters.page = action.payload
    },
    setPageSize(state, action) {
      state.filters.pageSize = action.payload
    },
    resetFilters(state) {
      state.filters = { ...initialState.filters }
    },
    setSelectedService(state, action) {
      state.selected = action.payload
    },
    clearSelectedService(state) {
      state.selected = null
    },
  },
  // extraReducers handle actions from async thunks
  // Builder pattern allows chaining multiple cases
  extraReducers: (builder) => {
    builder
      // When fetchServices starts (pending)
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading"
        state.error = null // Clear previous errors
      })
      // When fetchServices succeeds (fulfilled)
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload.data // Update services array
        state.pagination = {
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        }
      })
      // When fetchServices fails (rejected)
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error?.message || "Unable to load services."
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.selected = action.payload
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error?.message || "Unable to load service."
      })
  },
})

// Export action creators - use these with dispatch()
// Example: dispatch(setSearch("plumber"))
export const {
  setSearch,
  setCategory,
  setRating,
  setPriceRange,
  setSort,
  setPage,
  setPageSize,
  resetFilters,
  setSelectedService,
  clearSelectedService,
} = servicesSlice.actions

// Selectors - functions to get specific parts of state
// Use with useSelector() hook
// Example: const services = useSelector(selectServices)
export const selectServicesState = (state) => state.services
export const selectServices = (state) => state.services.items
export const selectFilters = (state) => state.services.filters
export const selectPagination = (state) => state.services.pagination
export const selectSelectedService = (state) => state.services.selected
export const selectServicesStatus = (state) => state.services.status
export const selectServicesError = (state) => state.services.error

// Memoized selector - only recalculates when dependencies change
// Useful for derived/computed values (performance optimization)
export const selectRelatedServices = createSelector(
  [selectServices, selectSelectedService], // Dependencies
  (services, selected) => {
    if (!selected) return []
    // Filter services by same category, excluding current service
    return services.filter(
      (service) =>
        service.id !== selected.id && service.category === selected.category
    )
  }
)

export default servicesSlice.reducer
