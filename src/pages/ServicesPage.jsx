import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ServiceCard from "../components/services/ServiceCard"
import ServiceCardSkeleton from "../components/services/ServiceCardSkeleton"
import SearchBar from "../components/services/SearchBar"
import FilterBar from "../components/services/FilterBar"
import Pagination from "../components/ui/Pagination"
import EmptyState from "../components/common/EmptyState"
import ErrorState from "../components/common/ErrorState"
import useDebounce from "../hooks/useDebounce"
import categories from "../data/categories"
import {
  fetchServices,
  selectFilters,
  selectPagination,
  selectServices,
  selectServicesError,
  selectServicesStatus,
  resetFilters,
  setCategory,
  setPage,
  setPriceRange,
  setRating,
  setSort,
  setSearch,
  setSelectedService,
} from "../store/servicesSlice"
import { openBooking, showToast } from "../store/uiSlice"
import { selectFavorites, toggleFavorite } from "../store/favoritesSlice"
import { selectIsAuthenticated } from "../store/authSlice"

const ServicesPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const services = useSelector(selectServices)
  const status = useSelector(selectServicesStatus)
  const error = useSelector(selectServicesError)
  const filters = useSelector(selectFilters)
  const pagination = useSelector(selectPagination)
  const favorites = useSelector(selectFavorites)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const [searchValue, setSearchValue] = useState(filters.search)
  const debouncedSearch = useDebounce(searchValue)

  useEffect(() => {
    dispatch(setSearch(debouncedSearch))
    dispatch(setPage(1))
  }, [debouncedSearch, dispatch])

  useEffect(() => {
    dispatch(fetchServices())
  }, [dispatch, filters])

  const handleBook = (service) => {
    if (!service) return
    
    if (!isAuthenticated) {
      dispatch(
        showToast({
          message: "Please login to book a service",
          type: "error",
        })
      )
      navigate("/login")
      return
    }
    
    if (service && typeof service === "object" && "id" in service) {
      dispatch(setSelectedService(service))
      dispatch(openBooking())
    }
  }

  const handleFavorite = (serviceId) => {
    if (!isAuthenticated) {
      dispatch(
        showToast({
          message: "Please login to save favorites",
          type: "error",
        })
      )
      navigate("/login")
      return
    }
    dispatch(toggleFavorite(serviceId))
  }

  const handleReset = () => {
    dispatch(resetFilters())
    setSearchValue("")
  }

  return (
    <div className="bg-white py-10 dark:bg-slate-950">
      <div className="container flex flex-col gap-8">
        <section className="grid gap-6 rounded-[32px] border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-8 shadow-soft dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
              Curated services
            </p>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              Book services that fit your schedule, budget, and style.
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Discover highly-rated pros, compare prices, and lock in a time in
              just a few taps. Everything you need is in one place.
            </p>
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              count={pagination.total}
            />
            <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Total services
                </span>
                <span className="mt-1 text-2xl font-bold text-brand-600 dark:text-brand-500">
                  {pagination.total}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Categories
                </span>
                <span className="mt-1 text-2xl font-bold text-brand-600 dark:text-brand-500">
                  {categories.length - 1}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Avg. response
                </span>
                <span className="mt-1 text-2xl font-bold text-brand-600 dark:text-brand-500">
                  2 hrs
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
                alt="Featured service"
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 space-y-1 text-white">
                <p className="text-xs uppercase tracking-widest">Top rated</p>
                <p className="text-lg font-semibold">Wellness &amp; Care</p>
              </div>
            </div>
          </div>
        </section>

        <FilterBar
          categories={categories}
          filters={filters}
          onCategoryChange={(value) => {
            dispatch(setCategory(value))
            dispatch(setPage(1))
          }}
          onPriceChange={(value) => {
            dispatch(setPriceRange(value))
            dispatch(setPage(1))
          }}
          onRatingChange={(value) => {
            dispatch(setRating(value))
            dispatch(setPage(1))
          }}
          onSortChange={(value) => {
            dispatch(setSort(value))
            dispatch(setPage(1))
          }}
          onReset={handleReset}
        />

        {status === "failed" ? (
          <ErrorState description={error} onRetry={() => dispatch(fetchServices())} />
        ) : null}

        {status === "loading" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: filters.pageSize }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {status === "succeeded" && services.length === 0 ? (
          <EmptyState actionLabel="Reset filters" onAction={handleReset} />
        ) : null}

        {status === "succeeded" && services.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onBook={handleBook}
                  isFavorite={favorites.includes(service.id)}
                  onToggleFavorite={handleFavorite}
                />
              ))}
            </div>
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(page) => dispatch(setPage(page))}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default ServicesPage
