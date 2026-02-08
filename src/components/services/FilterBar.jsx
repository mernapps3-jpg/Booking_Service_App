import Button from "../ui/Button"
import Dropdown from "../ui/Dropdown"
import { priceRanges, ratingOptions, sortOptions } from "../../utils/filters"

const FilterBar = ({
  categories,
  filters,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onSortChange,
  onReset,
}) => {
  const categoryOptions = categories.map((category) => ({
    label: category,
    value: category,
  }))

  return (
    <div className="grid gap-3 rounded-[28px] border border-slate-100 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto] lg:items-end">
      <Dropdown
        label="Category"
        value={filters.category}
        onChange={onCategoryChange}
        options={categoryOptions}
        placeholder="Select category"
      />
      <Dropdown
        label="Price"
        value={filters.priceRange}
        onChange={onPriceChange}
        options={priceRanges}
        placeholder="Select price range"
      />
      <Dropdown
        label="Rating"
        value={filters.rating}
        onChange={onRatingChange}
        options={ratingOptions}
        placeholder="Select rating"
      />
      <Dropdown
        label="Sort by"
        value={filters.sort}
        onChange={onSortChange}
        options={sortOptions}
        placeholder="Sort by"
      />
      <div className="flex items-end">
        <Button variant="outline" onClick={onReset} className="w-full">
          Reset filters
        </Button>
      </div>
    </div>
  )
}

export default FilterBar
