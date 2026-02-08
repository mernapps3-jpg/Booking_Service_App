import { Star } from "lucide-react"

const RatingStars = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fill = value >= index + 1
    return (
      <Star
        key={index}
        className={`h-4 w-4 ${
          fill ? "fill-amber-400 text-amber-400" : "text-slate-300"
        }`}
      />
    )
  })

  return <div className="flex items-center gap-1">{stars}</div>
}

export default RatingStars
