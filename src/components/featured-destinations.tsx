import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"


const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    reviews: 2847,
    price: "From $89/night",
    tags: ["Beach", "Culture", "Adventure"],
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.9,
    reviews: 3521,
    price: "From $156/night",
    tags: ["City", "Culture", "Food"],
  },
  {
    id: 3,
    name: "Santorini, Greece",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    reviews: 1923,
    price: "From $234/night",
    tags: ["Beach", "Romance", "Luxury"],
  },
  {
    id: 4,
    name: "Paris, France",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.6,
    reviews: 4156,
    price: "From $178/night",
    tags: ["City", "Romance", "Culture"],
  },
]

export default function FeaturedDestinations() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Destinations</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the world's most beautiful places, handpicked by our travel experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      Popular
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{destination.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{destination.reviews} reviews</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {destination.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="font-semibold text-primary">{destination.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
