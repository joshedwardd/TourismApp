"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X, MapPin, DollarSign, Star, Clock } from "lucide-react"
import { categories, continents } from "@/lib/data/destination"

interface FilterState {
  search: string
  category: string
  continent: string
  priceRange: [number, number]
  rating: number
  difficulty: string
}

interface DestinationFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  resultsCount: number
}

export function DestinationFilters({ filters, onFiltersChange, resultsCount }: DestinationFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      category: "All",
      continent: "All",
      priceRange: [0, 5000],
      rating: 0,
      difficulty: "All",
    })
  }

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "search") return value !== ""
    if (key === "category" || key === "continent" || key === "difficulty") return value !== "All"
    if (key === "priceRange") return value[0] !== 0 || value[1] !== 5000
    if (key === "rating") return value > 0
    return false
  }).length

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search destinations, countries, or experiences..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <Select value={filters.continent} onValueChange={(value) => updateFilter("continent", value)}>
            <SelectTrigger className="w-[140px] bg-background/50">
              <SelectValue placeholder="Continent" />
            </SelectTrigger>
            <SelectContent>
              {continents.map((continent) => (
                <SelectItem key={continent} value={continent}>
                  {continent}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.slice(1, 6).map((category) => (
            <Badge
              key={category}
              variant={filters.category === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => updateFilter("category", filters.category === category ? "All" : category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Advanced Filters Sheet */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
              <SheetDescription>Refine your search to find the perfect destination</SheetDescription>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* All Categories */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={filters.category === category ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => updateFilter("category", category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price Range
                </h4>
                <div className="space-y-3">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
                    max={5000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0].toLocaleString()}</span>
                    <span>${filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Minimum Rating */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Minimum Rating
                </h4>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <Badge
                      key={rating}
                      variant={filters.rating === rating ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => updateFilter("rating", rating)}
                    >
                      {rating === 0 ? "Any" : `${rating}+ ⭐`}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Difficulty Level
                </h4>
                <div className="flex gap-2">
                  {["All", "Easy", "Moderate", "Challenging"].map((difficulty) => (
                    <Badge
                      key={difficulty}
                      variant={filters.difficulty === difficulty ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => updateFilter("difficulty", difficulty)}
                    >
                      {difficulty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={clearFilters} className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
                <Button onClick={() => setIsOpen(false)} className="flex-1">
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {resultsCount} destination{resultsCount !== 1 ? "s" : ""} found
        </p>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear filters ({activeFiltersCount})
          </Button>
        )}
      </div>
    </div>
  )
}
