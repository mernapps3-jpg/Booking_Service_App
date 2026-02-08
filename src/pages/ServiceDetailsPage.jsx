import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { MapPin, Clock, CalendarCheck, Heart } from "lucide-react"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import RatingStars from "../components/ui/RatingStars"
import EmptyState from "../components/common/EmptyState"
import ErrorState from "../components/common/ErrorState"
import ServiceCard from "../components/services/ServiceCard"
import ServiceCardSkeleton from "../components/services/ServiceCardSkeleton"
import {
  fetchServiceById,
  selectSelectedService,
  selectServicesError,
  selectServicesStatus,
  setSelectedService,
} from "../store/servicesSlice"
import { openBooking, showToast } from "../store/uiSlice"
import { selectFavorites, toggleFavorite } from "../store/favoritesSlice"
import { selectIsAuthenticated } from "../store/authSlice"
import { formatCurrency } from "../utils/format"
import { getServices } from "../services/api"

const ServiceDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const service = useSelector(selectSelectedService)
  const status = useSelector(selectServicesStatus)
  const error = useSelector(selectServicesError)
  const favorites = useSelector(selectFavorites)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const [relatedServices, setRelatedServices] = useState([])
  const [isRelatedLoading, setIsRelatedLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchServiceById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (!service) return
    let isActive = true

    const loadRelated = async () => {
      setIsRelatedLoading(true)
      try {
        const response = await getServices({
          search: "",
          category: service.category,
          rating: "all",
          priceRange: "all",
          page: 1,
          pageSize: 6,
        })
        if (isActive) {
          setRelatedServices(
            response.data.filter((item) => item.id !== service.id)
          )
        }
      } catch {
        if (isActive) setRelatedServices([])
      } finally {
        if (isActive) setIsRelatedLoading(false)
      }
    }

    loadRelated()
    return () => {
      isActive = false
    }
  }, [service])

  const handleBook = (selectedService = service) => {
    if (!selectedService) return
    
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
    
    if (selectedService && typeof selectedService === "object" && "id" in selectedService) {
      dispatch(setSelectedService(selectedService))
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

  const isFavorite = service ? favorites.includes(service.id) : false

  if (status === "failed") {
    return (
      <div className="container py-16">
        <ErrorState description={error} />
      </div>
    )
  }

  if (status === "loading" || !service) {
    return (
      <div className="container py-16">
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    )
  }

  return (
    <div className="bg-slate-50 py-10 dark:bg-slate-950">
      <div className="container flex flex-col gap-8">
        <Link
          to="/"
          className="text-sm font-semibold text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
        >
          Back to services
        </Link>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
              <img
                src={service.images[0]}
                alt={service.title}
                className="h-72 w-full rounded-2xl object-cover"
              />
              <div className="grid gap-3">
                {service.images.slice(1, 3).map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={service.title}
                    className="h-32 w-full rounded-2xl object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Badge tone="accent">{service.category}</Badge>
              <div>
                <h1 className="text-3xl font-semibold">{service.title}</h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {service.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {service.duration}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4" />
                  {service.availability}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RatingStars value={service.rating} />
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {service.rating} ({service.reviews} reviews)
                </span>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">Highlights</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-500 dark:text-slate-400">
                  {service.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">What's included</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-500 dark:text-slate-400">
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div>
              <p className="text-xs font-semibold text-slate-500">Starting at</p>
              <p className="text-3xl font-semibold text-brand-600">
                {formatCurrency(service.price)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-950">
              <p className="font-semibold">Availability</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {service.availability} - {service.duration}
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Book now to reserve your preferred time.
              </p>
            </div>
            <Button onClick={() => handleBook()}>Book now</Button>
            <Button
              variant="outline"
              onClick={() => handleFavorite(service.id)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
              {isFavorite ? "Saved" : "Save for later"}
            </Button>
          </aside>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Related services in {service.category}
            </h2>
          </div>
          {isRelatedLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            </div>
          ) : relatedServices.length === 0 ? (
            <EmptyState
              title="No related services yet"
              description="Try browsing other categories or go back to the full list."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((item) => (
                <ServiceCard
                  key={item.id}
                  service={item}
                  onBook={handleBook}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={handleFavorite}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default ServiceDetailsPage
