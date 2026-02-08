import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import Button from "../ui/Button"
import { formatCurrency, formatDate } from "../../utils/format"

const BookingSuccess = ({ booking, onClose }) => {
  const [showContent, setShowContent] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleViewBookings = () => {
    onClose()
    navigate("/bookings")
  }

  return (
    <div className="flex flex-col gap-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500"
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <CheckCircle className="h-12 w-12 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <h3 className="text-xl font-semibold">Booking confirmed!</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          We saved your booking and sent a confirmation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="rounded-2xl border bg-slate-50 p-4 text-left text-sm dark:border-slate-800 dark:bg-slate-950"
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold">{booking.serviceTitle}</span>
          <span className="text-brand-600">
            {formatCurrency(booking.price)}
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {formatDate(booking.date)} - {booking.time}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 10 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <Button onClick={handleViewBookings}>View My Bookings</Button>
      </motion.div>
    </div>
  )
}

export default BookingSuccess
