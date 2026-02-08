import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Clock, MapPin, Heart } from "lucide-react"
import Badge from "../ui/Badge"
import Button from "../ui/Button"
import RatingStars from "../ui/RatingStars"
import { formatCurrency } from "../../utils/format"

const MotionArticle = motion.article

const ServiceCard = ({
  service,
  onBook,
  isFavorite = false,
  onToggleFavorite = () => {},
}) => (
  <MotionArticle
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-soft transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={service.images[0]}
        alt={service.title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <button
        type="button"
        onClick={() => onToggleFavorite(service.id)}
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-soft transition hover:scale-105 dark:bg-slate-900/90 dark:text-slate-100"
        aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
      >
        <Heart
          className={`h-4 w-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
        />
      </button>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <Badge>{service.category}</Badge>
        <span className="text-sm font-semibold text-brand-600">
          {formatCurrency(service.price)}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {service.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {service.duration}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <RatingStars value={service.rating} />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {service.rating} ({service.reviews})
          </span>
        </div>
        <span className="text-xs text-emerald-600">{service.availability}</span>
      </div>
      <div className="mt-auto flex gap-2">
        <Link
          to={`/services/${service.id}`}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          View details
        </Link>
        <Button
          onClick={() => onBook(service)}
          variant="primary"
          className="flex-1"
        >
          Book now
        </Button>
      </div>
    </div>
  </MotionArticle>
)

export default ServiceCard
