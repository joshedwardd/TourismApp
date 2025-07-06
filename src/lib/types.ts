export interface User {
  id: string
  email: string
  user_metadata: {
    display_name?: string
    avatar_url?: string
    full_name?: string
  }
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  display_name: string
  email: string
  phone?: string
  location?: string
  date_of_birth?: string
  bio?: string
  avatar_url?: string
  preferences: UserPreferences
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  currency: "USD" | "IDR" | "EUR" | "JPY"
  language: "en" | "id" | "ja" | "fr"
  theme: "light" | "dark" | "system"
  travel_style: string[]
  budget: "budget" | "mid-range" | "luxury"
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

export interface Hotel {
  id: string
  name: string
  description: string
  location_city: string
  location_country: string
  location_lat: number
  location_lng: number
  images: string[]
  amenities: string[]
  rating: number
  review_count: number
  price_per_night: number
  currency: string
  availability: boolean
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  user_id: string
  hotel_id: string
  check_in: string
  check_out: string
  guests: number
  total_price: number
  currency: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  payment_method: string
  confirmation_number: string
  created_at: string
  updated_at: string
  hotel?: Hotel
}

export interface Review {
  id: string
  user_id: string
  hotel_id: string
  booking_id?: string
  rating: number
  comment: string
  images?: string[]
  helpful_count: number
  created_at: string
  updated_at: string
  user_profile?: UserProfile
}

export interface Destination {
  id: string
  name: string
  country: string
  description: string
  images: string[]
  attractions: string[]
  best_time_to_visit: string
  average_temperature: string
  popular_activities: string[]
  coordinates_lat: number
  coordinates_lng: number
  created_at: string
  updated_at: string
}

export interface TravelPackage {
  id: string
  title: string
  description: string
  duration: number
  destinations: string[]
  inclusions: string[]
  price: number
  currency: string
  images: string[]
  rating: number
  difficulty: "easy" | "moderate" | "challenging"
  max_guests: number
  created_at: string
  updated_at: string
}

export interface WishlistItem {
  id: string
  user_id: string
  item_type: "hotel" | "destination" | "package"
  item_id: string
  created_at: string
  hotel?: Hotel
  destination?: Destination
  package?: TravelPackage
}

export interface SupportTicket {
  id: string
  user_id: string
  subject: string
  message: string
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  created_at: string
  updated_at: string
}
