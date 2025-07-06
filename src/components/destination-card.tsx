  "use client"

  import Image from "next/image"
  import Link from "next/link"
  import { Card, CardContent } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Star, MapPin, Clock, Heart } from "lucide-react"
  import type { Destination } from "@/lib/data/destination"

  interface DestinationCardProps {
    destination: Destination
    onAddToWishlist?: (id: string) => void
    isInWishlist?: boolean
  }

  export function DestinationCard({ destination, onAddToWishlist, isInWishlist = false }: DestinationCardProps) {
    return (
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-card/50 backdrop-blur-sm">
        <div className="relative overflow-hidden">
          <Image
            src={destination.image || "/placeholder.svg"}
            alt={destination.name}
            width={600}
            height={400}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Featured Badge */}
          {destination.featured && (
            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
              ⭐ Featured
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
            onClick={() => onAddToWishlist?.(destination.id)}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
          </Button>

          {/* Price */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
            <p className="text-sm font-semibold text-gray-900">From ${destination.price.min.toLocaleString()}</p>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{destination.country}</span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {destination.name}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{destination.shortDescription}</p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {destination.category.slice(0, 3).map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{destination.rating}</span>
                  <span className="text-muted-foreground">({destination.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{destination.duration}</span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`text-xs ${
                  destination.difficulty === "Easy"
                    ? "text-green-600 border-green-200"
                    : destination.difficulty === "Moderate"
                      ? "text-yellow-600 border-yellow-200"
                      : "text-red-600 border-red-200"
                }`}
              >
                {destination.difficulty}
              </Badge>
            </div>

            {/* Action Button */}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
            >
              <Link href={`/destinations/${destination.id}`}>Explore Destination</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
