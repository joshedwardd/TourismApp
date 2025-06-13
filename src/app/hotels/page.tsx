"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  PocketIcon as Pool,
  Heart,
  Filter,
  Search,
  CalendarIcon,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Image from "next/image"

const hotels = [
  {
    id: 1,
    name: "Grand Ocean Resort",
    location: "Bali, Indonesia",
    rating: 4.8,
    reviews: 1247,
    price: 89,
    originalPrice: 120,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Wifi", "Pool", "Gym", "Parking"],
    description: "Luxury beachfront resort with stunning ocean views",
    coordinates: { lat: -8.3405, lng: 115.092 },
  },
  {
    id: 2,
    name: "Tokyo Central Hotel",
    location: "Tokyo, Japan",
    rating: 4.6,
    reviews: 892,
    price: 156,
    originalPrice: 200,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Wifi", "Gym", "Coffee", "Parking"],
    description: "Modern hotel in the heart of Tokyo",
    coordinates: { lat: 35.6762, lng: 139.6503 },
  },
  {
    id: 3,
    name: "Santorini Sunset Villa",
    location: "Santorini, Greece",
    rating: 4.9,
    reviews: 567,
    price: 234,
    originalPrice: 300,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Wifi", "Pool", "Coffee"],
    description: "Romantic villa with breathtaking sunset views",
    coordinates: { lat: 36.3932, lng: 25.4615 },
  },
  {
    id: 4,
    name: "Paris Boutique Hotel",
    location: "Paris, France",
    rating: 4.7,
    reviews: 1034,
    price: 178,
    originalPrice: 220,
    image: "/placeholder.svg?height=200&width=300",
    amenities: ["Wifi", "Coffee", "Gym"],
    description: "Charming boutique hotel near the Eiffel Tower",
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
]

const amenityIcons = {
  Wifi: Wifi,
  Pool: Pool,
  Gym: Dumbbell,
  Parking: Car,
  Coffee: Coffee,
}

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [filteredHotels, setFilteredHotels] = useState(hotels)

  useEffect(() => {
    const filtered = hotels.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
      const matchesAmenities =
        selectedAmenities.length === 0 || selectedAmenities.every((amenity) => hotel.amenities.includes(amenity))

      return matchesSearch && matchesPrice && matchesAmenities
    })

    // Sort hotels
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Keep recommended order
        break
    }

    setFilteredHotels(filtered)
  }, [searchQuery, priceRange, selectedAmenities, sortBy])

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Your Perfect Stay</h1>
        <p className="text-muted-foreground">Discover amazing hotels and accommodations for your next trip</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hotels or destinations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Check-in */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : "Check-in"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
              </PopoverContent>
            </Popover>

            {/* Check-out */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !checkOut && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : "Check-out"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
              </PopoverContent>
            </Popover>

            {/* Guests */}
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-3">Price Range (per night)</h3>
              <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-medium mb-3">Amenities</h3>
              <div className="space-y-2">
                {Object.keys(amenityIcons).map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">{filteredHotels.length} hotels found</p>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Hotel List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex">
              <div className="relative w-1/3">
                <Image
                  src={hotel.image || "/placeholder.svg"}
                  alt={hotel.name}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hotel.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{hotel.rating}</span>
                      <span className="text-sm text-muted-foreground">({hotel.reviews})</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{hotel.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {hotel.amenities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
                    return (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        <IconComponent className="h-3 w-3 mr-1" />
                        {amenity}
                      </Badge>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">${hotel.price}</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">${hotel.originalPrice}</span>
                    <p className="text-sm text-muted-foreground">per night</p>
                  </div>
                  <Button>Book Now</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No hotels found matching your criteria</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setPriceRange([0, 500])
              setSelectedAmenities([])
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
