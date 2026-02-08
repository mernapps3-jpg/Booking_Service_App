import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ServiceCard from "../components/services/ServiceCard"
import EmptyState from "../components/common/EmptyState"
import ErrorState from "../components/common/ErrorState"
import { selectFavorites, toggleFavorite } from "../store/favoritesSlice"
import { getAllServices } from "../services/api"
import { openBooking } from "../store/uiSlice"
import { setSelectedService } from "../store/servicesSlice"

const FavoritesPage = () => {
  const dispatch = useDispatch()
  const favorites = useSelector(selectFavorites)
  const [services, setServices] = useState([])
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)

  useEffect(() => {
    let isActive = true

    const load = async () => {
      setStatus("loading")
      setError(null)
      try {
        const data = await getAllServices()
        if (isActive) {
          setServices(data)
          setStatus("succeeded")
        }
      } catch (err) {
        if (isActive) {
          setError(err?.message || "Unable to load favorites.")
          setStatus("failed")
        }
      }
    }

    load()
    return () => {
      isActive = false
    }
  }, [])

  const favoriteServices = services.filter((service) =>
    favorites.includes(service.id)
  )

  const handleBook = (service) => {
    dispatch(setSelectedService(service))
    dispatch(openBooking())
  }

  if (status === "failed") {
    return (
      <div className="container py-10">
        <ErrorState description={error} />
      </div>
    )
  }

  return (
    <div className="bg-white py-10 dark:bg-slate-950">
      <div className="container flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Favorites</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Saved services for quick booking later.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Browse services
          </Link>
        </div>

        {status === "loading" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-[28px] border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : null}

        {status === "succeeded" && favoriteServices.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            description="Tap the heart icon on a service to save it here."
          />
        ) : null}

        {status === "succeeded" && favoriteServices.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favoriteServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={handleBook}
                isFavorite
                onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default FavoritesPage
