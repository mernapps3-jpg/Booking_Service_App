export const priceRanges = [
  { label: "All prices", value: "all", min: 0, max: Infinity },
  { label: "Under $50", value: "under-50", min: 0, max: 50 },
  { label: "$50 - $100", value: "50-100", min: 50, max: 100 },
  { label: "$100 - $200", value: "100-200", min: 100, max: 200 },
  { label: "$200+", value: "200-plus", min: 200, max: Infinity },
]

export const ratingOptions = [
  { label: "Any rating", value: "all" },
  { label: "4.5 and up", value: "4.5" },
  { label: "4.0 and up", value: "4.0" },
  { label: "3.5 and up", value: "3.5" },
]

export const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating-desc" },
]

export const findPriceRange = (value) =>
  priceRanges.find((range) => range.value === value) || priceRanges[0]
