"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, Download, X } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

const mockBookings = [
  {
    id: "BK001",
    hotelName: "Grand Ocean Resort",
    location: "Bali, Indonesia",
    image: "/placeholder.svg?height=100&width=150",
    checkIn: new Date("2024-07-15"),
    checkOut: new Date("2024-07-20"),
    guests: 2,
    totalPrice: 445,
    status: "confirmed",
    bookingDate: new Date("2024-06-01"),
    confirmationNumber: "GOB-2024-001",
  },
  {
    id: "BK002",
    hotelName: "Tokyo Central Hotel",
    location: "Tokyo, Japan",
    image: "/placeholder.svg?height=100&width=150",
    checkIn: new Date("2024-08-10"),
    checkOut: new Date("2024-08-15"),
    guests: 1,
    totalPrice: 780,
    status: "pending",
    bookingDate: new Date("2024-06-10"),
    confirmationNumber: "TCH-2024-002",
  },
  {
    id: "BK003",
    hotelName: "Santorini Sunset Villa",
    location: "Santorini, Greece",
    image: "/placeholder.svg?height=100&width=150",
    checkIn: new Date("2024-05-01"),
    checkOut: new Date("2024-05-05"),
    guests: 2,
    totalPrice: 936,
    status: "completed",
    bookingDate: new Date("2024-04-01"),
    confirmationNumber: "SSV-2024-003",
  },
  {
    id: "BK004",
    hotelName: "Paris Boutique Hotel",
    location: "Paris, France",
    image: "/placeholder.svg?height=100&width=150",
    checkIn: new Date("2024-03-15"),
    checkOut: new Date("2024-03-18"),
    guests: 2,
    totalPrice: 534,
    status: "cancelled",
    bookingDate: new Date("2024-02-15"),
    confirmationNumber: "PBH-2024-004",
  },
]

const statusColors = {
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export default function BookingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [bookings, setBookings] = useState(mockBookings)

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    if (activeTab === "upcoming") return booking.status === "confirmed" || booking.status === "pending"
    if (activeTab === "past") return booking.status === "completed" || booking.status === "cancelled"
    return booking.status === activeTab
  })

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "cancelled" } : booking)),
    )
  }

  const downloadConfirmation = (booking: any) => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading confirmation for booking:", booking.id)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
            <p className="text-muted-foreground mb-4">You need to be signed in to view your bookings.</p>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
        <p className="text-muted-foreground">Manage your current and past reservations</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "all" ? "You haven't made any bookings yet." : `No ${activeTab} bookings found.`}
                </p>
                <Button asChild>
                  <a href="/hotels">Browse Hotels</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 h-32 md:h-auto">
                      <Image
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.hotelName}
                        width={150}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{booking.hotelName}</h3>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.location}
                          </div>
                          <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="text-right mt-4 md:mt-0">
                          <p className="text-2xl font-bold text-primary">${booking.totalPrice}</p>
                          <p className="text-sm text-muted-foreground">Total amount</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Check-in</p>
                            <p className="text-sm text-muted-foreground">{format(booking.checkIn, "MMM dd, yyyy")}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Check-out</p>
                            <p className="text-sm text-muted-foreground">{format(booking.checkOut, "MMM dd, yyyy")}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Guests</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Booked on {format(booking.bookingDate, "MMM dd, yyyy")}</span>
                          <span>•</span>
                          <span>Confirmation: {booking.confirmationNumber}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => downloadConfirmation(booking)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>

                          {(booking.status === "confirmed" || booking.status === "pending") && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
