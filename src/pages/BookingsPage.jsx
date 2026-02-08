import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import BookingCard from "../components/booking/BookingCard"
import EmptyState from "../components/common/EmptyState"
import { selectBookings } from "../store/bookingSlice"

const BookingsPage = () => {
  const bookings = useSelector(selectBookings)

  return (
    <div className="bg-slate-50 py-10 dark:bg-slate-950">
      <div className="container flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">My bookings</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage upcoming services and review details.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Browse services
          </Link>
        </div>

        {bookings.length === 0 ? (
          <EmptyState
            title="No bookings yet"
            description="Book your first service to see it here."
          />
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingsPage
