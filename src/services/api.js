import { delay } from "../utils/delay"
import { findPriceRange } from "../utils/filters"
import { createId } from "../utils/id"

const servicesUrl = new URL("../data/services.json", import.meta.url).href
const faqsUrl = new URL("../data/faqs.json", import.meta.url).href

let servicesCache = null
let faqsCache = null

const fetchJson = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Unable to load data.")
  }
  return response.json()
}

const loadServices = async () => {
  if (servicesCache) return servicesCache
  servicesCache = await fetchJson(servicesUrl)
  return servicesCache
}

const loadFaqs = async () => {
  if (faqsCache) return faqsCache
  faqsCache = await fetchJson(faqsUrl)
  return faqsCache
}

const searchMatch = (service, query) => {
  if (!query) return true
  const target = `${service.title} ${service.category} ${service.description}`.toLowerCase()
  return target.includes(query.toLowerCase())
}

export const getServices = async ({
  search,
  category,
  rating,
  priceRange,
  sort,
  page,
  pageSize,
}) => {
  await delay(500)
  const data = await loadServices()
  const range = findPriceRange(priceRange)
  const minRating = rating === "all" ? 0 : Number(rating)

  const filtered = data.filter((service) => {
    const matchesCategory = category === "All" || service.category === category
    const matchesSearch = searchMatch(service, search)
    const matchesRating = service.rating >= minRating
    const matchesPrice =
      service.price >= range.min && service.price <= range.max

    return matchesCategory && matchesSearch && matchesRating && matchesPrice
  })

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating-desc":
        return b.rating - a.rating
      default:
        return b.reviews - a.reviews
    }
  })

  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const end = start + pageSize
  const paged = sorted.slice(start, end)

  return {
    data: paged,
    total,
    totalPages,
    page: currentPage,
  }
}

export const getServiceById = async (id) => {
  await delay(350)
  const data = await loadServices()
  const service = data.find((item) => item.id === id)
  if (!service) {
    throw new Error("Service not found.")
  }
  return service
}

export const postBooking = async (payload) => {
  await delay(650)
  return {
    id: createId("booking"),
    status: "confirmed",
    createdAt: new Date().toISOString(),
    ...payload,
  }
}

export const getFaqs = async () => {
  await delay(400)
  return loadFaqs()
}

export const getAllServices = async () => {
  await delay(350)
  return loadServices()
}
