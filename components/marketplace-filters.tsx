"use client"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface MarketplaceFiltersProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function MarketplaceFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: MarketplaceFiltersProps) {
  const [showSortMenu, setShowSortMenu] = useState(false)

  const categories = ["All", "Bakery", "Produce", "Ready-to-Eat", "Dairy", "Beverages"]
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "expiring-soon", label: "Expiring Soon" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "distance", label: "Closest First" },
  ]

  return (
    <div className="space-y-6">
      {/* Search */}
      <Input
        type="search"
        placeholder="Search for food..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category === "All" ? null : category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              (category === "All" && !selectedCategory) || selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="relative">
        <button
          onClick={() => setShowSortMenu(!showSortMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
        >
          <span className="text-sm font-medium">Sort: {sortOptions.find((o) => o.value === sortBy)?.label}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showSortMenu && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value)
                  setShowSortMenu(false)
                }}
                className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                  sortBy === option.value ? "bg-primary/10 text-primary font-medium" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
