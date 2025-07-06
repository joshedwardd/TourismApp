export interface Destination {
  id: string
  name: string
  country: string
  continent: string
  description: string
  shortDescription: string
  image: string
  gallery: string[]
  rating: number
  reviewCount: number
  price: {
    min: number
    max: number
    currency: string
  }
  category: string[]
  highlights: string[]
  bestTimeToVisit: string
  duration: string
  difficulty: "Easy" | "Moderate" | "Challenging"
  featured: boolean
  coordinates: {
    lat: number
    lng: number
  }
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    description:
      "Bali is a tropical paradise known for its stunning beaches, ancient temples, lush rice terraces, and vibrant culture. Experience the perfect blend of relaxation and adventure in this Indonesian gem.",
    shortDescription: "Tropical paradise with stunning beaches and rich culture",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.8,
    reviewCount: 2847,
    price: { min: 800, max: 2500, currency: "USD" },
    category: ["Beach", "Culture", "Adventure"],
    highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Seminyak Beach", "Mount Batur Sunrise"],
    bestTimeToVisit: "April - October",
    duration: "7-14 days",
    difficulty: "Easy",
    featured: true,
    coordinates: { lat: -8.3405, lng: 115.092 },
  },
  {
    id: "2",
    name: "Swiss Alps",
    country: "Switzerland",
    continent: "Europe",
    description:
      "The Swiss Alps offer breathtaking mountain scenery, world-class skiing, charming villages, and pristine lakes. Perfect for adventure seekers and nature lovers alike.",
    shortDescription: "Majestic mountains perfect for adventure and relaxation",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.9,
    reviewCount: 1923,
    price: { min: 1200, max: 4000, currency: "USD" },
    category: ["Mountain", "Adventure", "Nature"],
    highlights: ["Matterhorn", "Jungfraujoch", "Lake Geneva", "Zermatt Village"],
    bestTimeToVisit: "December - March, June - September",
    duration: "5-10 days",
    difficulty: "Moderate",
    featured: true,
    coordinates: { lat: 46.8182, lng: 8.2275 },
  },
  {
    id: "3",
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    description:
      "Tokyo is a vibrant metropolis where traditional culture meets cutting-edge technology. Explore ancient temples, bustling markets, and experience the unique Japanese way of life.",
    shortDescription: "Modern metropolis blending tradition with innovation",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.7,
    reviewCount: 3156,
    price: { min: 1000, max: 3500, currency: "USD" },
    category: ["City", "Culture", "Food"],
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tsukiji Market", "Mount Fuji Day Trip"],
    bestTimeToVisit: "March - May, September - November",
    duration: "5-12 days",
    difficulty: "Easy",
    featured: true,
    coordinates: { lat: 35.6762, lng: 139.6503 },
  },
  {
    id: "4",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    description:
      "Santorini is famous for its stunning sunsets, white-washed buildings, and crystal-clear waters. This Greek island paradise offers romance, relaxation, and breathtaking views.",
    shortDescription: "Iconic Greek island with stunning sunsets and architecture",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.6,
    reviewCount: 2234,
    price: { min: 900, max: 2800, currency: "USD" },
    category: ["Beach", "Romance", "Culture"],
    highlights: ["Oia Sunset", "Red Beach", "Fira Town", "Wine Tasting"],
    bestTimeToVisit: "April - October",
    duration: "4-8 days",
    difficulty: "Easy",
    featured: false,
    coordinates: { lat: 36.3932, lng: 25.4615 },
  },
  {
    id: "5",
    name: "Machu Picchu",
    country: "Peru",
    continent: "South America",
    description:
      "Machu Picchu is an ancient Incan citadel set high in the Andes Mountains. This UNESCO World Heritage site offers incredible history, stunning views, and unforgettable trekking experiences.",
    shortDescription: "Ancient Incan citadel high in the Andes Mountains",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.9,
    reviewCount: 1876,
    price: { min: 600, max: 2000, currency: "USD" },
    category: ["Adventure", "History", "Mountain"],
    highlights: ["Inca Trail", "Huayna Picchu", "Sacred Valley", "Cusco City"],
    bestTimeToVisit: "May - September",
    duration: "4-7 days",
    difficulty: "Challenging",
    featured: true,
    coordinates: { lat: -13.1631, lng: -72.545 },
  },
  {
    id: "6",
    name: "Dubai",
    country: "UAE",
    continent: "Asia",
    description:
      "Dubai is a futuristic city known for its luxury shopping, ultramodern architecture, and vibrant nightlife. Experience the perfect blend of traditional Arabian culture and modern innovation.",
    shortDescription: "Futuristic city of luxury and modern marvels",
    image: "/placeholder.svg?height=400&width=600",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 4.5,
    reviewCount: 2987,
    price: { min: 800, max: 5000, currency: "USD" },
    category: ["City", "Luxury", "Shopping"],
    highlights: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Desert Safari"],
    bestTimeToVisit: "November - March",
    duration: "3-7 days",
    difficulty: "Easy",
    featured: false,
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
]

export const categories = [
  "All",
  "Beach",
  "Mountain",
  "City",
  "Culture",
  "Adventure",
  "Nature",
  "Romance",
  "History",
  "Food",
  "Luxury",
  "Shopping",
]

export const continents = ["All", "Asia", "Europe", "North America", "South America", "Africa", "Oceania"]
