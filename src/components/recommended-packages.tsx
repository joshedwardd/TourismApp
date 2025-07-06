import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, Calendar } from "lucide-react"
import Image from "next/image"

const packages = [
  {
    id: 1,
    title: "Bali Adventure Package",
    duration: "7 days",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=250&width=400",
    highlights: ["Temple Tours", "Beach Activities", "Cultural Experiences"],
    maxGuests: 8,
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Japan Cultural Journey",
    duration: "10 days",
    price: 2499,
    originalPrice: 2899,
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=250&width=400",
    highlights: ["Tokyo & Kyoto", "Traditional Ryokan", "Cherry Blossom"],
    maxGuests: 12,
    difficulty: "Moderate",
  },
  {
    id: 3,
    title: "European Grand Tour",
    duration: "14 days",
    price: 3299,
    originalPrice: 3799,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=250&width=400",
    highlights: ["5 Countries", "Historic Cities", "Local Cuisine"],
    maxGuests: 16,
    difficulty: "Moderate",
  },
]

export default function RecommendedPackages() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recommended Travel Packages</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully curated travel experiences designed to give you the best of each destination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-600 hover:bg-green-700">Save ${pkg.originalPrice - pkg.price}</Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                    <span className="text-sm text-muted-foreground">({pkg.reviews})</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Max {pkg.maxGuests}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{pkg.difficulty}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {pkg.highlights.map((highlight) => (
                      <Badge key={highlight} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">${pkg.price}</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">${pkg.originalPrice}</span>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                  <Button>Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
