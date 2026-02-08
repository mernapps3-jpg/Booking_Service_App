import { formatCurrency, formatDate } from "../../utils/format"

const BookingCard = ({ booking }) => (
  <div className="rounded-3xl border bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{booking.serviceTitle}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {formatDate(booking.date)} - {booking.time}
        </p>
      </div>
      <div className="text-sm font-semibold text-brand-600">
        {formatCurrency(booking.price)}
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
      <span>Booked for {booking.name}</span>
      <span>-</span>
      <span>{booking.email}</span>
      {booking.notes ? (
        <>
          <span>-</span>
          <span>{booking.notes}</span>
        </>
      ) : null}
    </div>
  </div>
)

export default BookingCard
