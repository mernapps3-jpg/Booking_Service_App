export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)

export const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(value)
  )
