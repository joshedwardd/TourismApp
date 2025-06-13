"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, MapPin, Trash2, Share2 } from "lucide-react"
import Image from "next/image"

const mockWishlistItems = [
  {
    id: 1,
    type: "hotel",
    name: "Grand Ocean Resort",
    location: "Bali, Indonesia",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    reviews: 1247,
    price: 89,
    originalPrice: 120,
    addedDate: new Date("2024-05-15"),
  },
  {
    id: 2,
    type: "destination",
    name: "Kyoto Temple District",
    location: "Kyoto, Japan",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviews: 892,
    addedDate: new Date("2024-05-10"),
  },
  {
    id: 3,
    type: "package",
    name: "European Grand Tour",
    location: "Multiple Cities",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    reviews: 456,
    price: 3299,
    originalPrice: 3799,
    duration: "14 days",
    addedDate: new Date("2024-05-05"),
  },
]

export default function WishlistPage() {
  const { user } = useAuth()
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const shareWishlist = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.href)
    alert("Wishlist link copied to clipboard!")
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
            <p className="text-muted-foreground mb-4">You need to be signed in to view your wishlist.</p>
            <Button asChild>
              <a href="/auth/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} saved {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <Button variant="outline" onClick={shareWishlist}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Wishlist
          </Button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-4">Start exploring and save your favorite places and experiences</p>
            <Button asChild>
              <a href="/explore">Start Exploring</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-black capitalize">
                    {item.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white text-red-500">
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{item.location}</span>
                  {item.reviews && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{item.reviews} reviews</span>
                    </>
                  )}
                </div>

                {item.duration && <p className="text-sm text-muted-foreground mb-3">Duration: {item.duration}</p>}

                <div className="flex items-center justify-between">
                  <div>
                    {item.price && (
                      <>
                        <span className="text-xl font-bold text-primary">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">${item.originalPrice}</span>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {item.type === "hotel" ? "per night" : "per person"}
                        </p>
                      </>
                    )}
                  </div>
                  <Button size="sm">
                    {item.type === "hotel" ? "Book Now" : item.type === "package" ? "View Package" : "Explore"}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-3">Added {item.addedDate.toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
