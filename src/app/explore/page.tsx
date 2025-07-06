"use client"

import { useState, useMemo } from "react"
import { DestinationCard } from "@/components/destination-card"
import { DestinationFilters } from "@/components/destination-filter"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { destinations } from "@/lib/data/destination"
import { Compass, TrendingUp, Award, Sparkles } from "lucide-react"

interface FilterState {
  search: string
  category: string
  continent: string
  priceRange: [number, number]
  rating: number
  difficulty: string
}

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "All",
    continent: "All",
    priceRange: [0, 5000],
    rating: 0,
    difficulty: "All",
  })
  const [wishlist, setWishlist] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"popular" | "price" | "rating">("popular")

  const filteredDestinations = useMemo(() => {
    const filtered = destinations.filter((destination) => {
      // Search filter
      if (
        filters.search &&
        !destination.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !destination.country.toLowerCase().includes(filters.search.toLowerCase()) &&
        !destination.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (filters.category !== "All" && !destination.category.includes(filters.category)) {
        return false
      }

      // Continent filter
      if (filters.continent !== "All" && destination.continent !== filters.continent) {
        return false
      }

      // Price filter
      if (destination.price.min > filters.priceRange[1] || destination.price.max < filters.priceRange[0]) {
        return false
      }

      // Rating filter
      if (filters.rating > 0 && destination.rating < filters.rating) {
        return false
      }

      // Difficulty filter
      if (filters.difficulty !== "All" && destination.difficulty !== filters.difficulty) {
        return false
      }

      return true
    })

    // Sort results
    switch (sortBy) {
      case "price":
        filtered.sort((a, b) => a.price.min - b.price.min)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.reviewCount - a.reviewCount
        })
        break
    }

    return filtered
  }, [filters, sortBy])

  const handleAddToWishlist = (destinationId: string) => {
    setWishlist((prev) =>
      prev.includes(destinationId) ? prev.filter((id) => id !== destinationId) : [...prev, destinationId],
    )
  }

  const featuredDestinations = destinations.filter((d) => d.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Compass className="w-3 h-3 mr-1" />
            Explore the World
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Next
            <span className="block text-primary">Adventure</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From tropical beaches to mountain peaks, find the perfect destination for your next unforgettable journey
          </p>
        </div>

        {/* Featured Destinations */}
        {filters.search === "" && filters.category === "All" && filters.continent === "All" && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg">
                <Award className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold">Featured Destinations</h2>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredDestinations.slice(0, 3).map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onAddToWishlist={handleAddToWishlist}
                  isInWishlist={wishlist.includes(destination.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8">
          <DestinationFilters
            filters={filters}
            onFiltersChange={setFilters}
            resultsCount={filteredDestinations.length}
          />
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {filters.search || filters.category !== "All" || filters.continent !== "All"
              ? "Search Results"
              : "All Destinations"}
          </h2>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("popular")}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Popular
            </Button>
            <Button variant={sortBy === "rating" ? "default" : "outline"} size="sm" onClick={() => setSortBy("rating")}>
              ⭐ Rating
            </Button>
            <Button variant={sortBy === "price" ? "default" : "outline"} size="sm" onClick={() => setSortBy("price")}>
              💰 Price
            </Button>
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onAddToWishlist={handleAddToWishlist}
                isInWishlist={wishlist.includes(destination.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Compass className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms to find more destinations
            </p>
            <Button
              onClick={() =>
                setFilters({
                  search: "",
                  category: "All",
                  continent: "All",
                  priceRange: [0, 5000],
                  rating: 0,
                  difficulty: "All",
                })
              }
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
