"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Ticket, Download, Star, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useAuth } from "@/contexts/AuthContext"

interface Booking {
  id: string
  movie: string
  cinema: string
  location: string
  date: string
  time: string
  seats: string[]
  total: number
  status: "upcoming" | "completed" | "cancelled"
  poster: string
  bookingDate: string
}

const mockBookings: Booking[] = [
  {
    id: "BK1704067200000",
    movie: "Avatar: The Way of Water",
    cinema: "PVR Cinemas",
    location: "Phoenix Mall",
    date: "2024-01-15",
    time: "7:30 PM",
    seats: ["F5", "F6"],
    total: 630,
    status: "upcoming",
    poster: "/placeholder.svg?height=300&width=200&text=Avatar",
    bookingDate: "2024-01-10",
  },
  {
    id: "BK1703980800000",
    movie: "Spider-Man: No Way Home",
    cinema: "INOX",
    location: "Forum Mall",
    date: "2024-01-08",
    time: "9:00 PM",
    seats: ["H7", "H8", "H9"],
    total: 900,
    status: "completed",
    poster: "/placeholder.svg?height=300&width=200&text=Spider-Man",
    bookingDate: "2024-01-05",
  },
  {
    id: "BK1703894400000",
    movie: "The Batman",
    cinema: "Cinepolis",
    location: "Central Mall",
    date: "2024-01-05",
    time: "6:00 PM",
    seats: ["D4"],
    total: 250,
    status: "cancelled",
    poster: "/placeholder.svg?height=300&width=200&text=Batman",
    bookingDate: "2024-01-02",
  },
]

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const { user } = useAuth()

  useEffect(() => {
    // Simulate API call
    setBookings(mockBookings)
  }, [])

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true
    return booking.status === activeTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const handleDownloadTicket = (bookingId: string) => {
    // In a real app, this would download the ticket
    alert(`Downloading ticket for booking ${bookingId}`)
  }

  const handleRateMovie = (movieName: string) => {
    // In a real app, this would open a rating modal
    alert(`Rate ${movieName}`)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-muted-foreground mb-8">You need to login to view your bookings</p>
          <Button asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">Manage your movie ticket bookings</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-16">
                  <Ticket className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === "all" ? "You haven't made any bookings yet" : `No ${activeTab} bookings found`}
                  </p>
                  <Button asChild>
                    <a href="/">Book Your First Movie</a>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Movie Poster */}
                            <div className="flex-shrink-0">
                              <img
                                src={booking.poster || "/placeholder.svg"}
                                alt={booking.movie}
                                className="w-24 h-36 object-cover rounded-lg"
                              />
                            </div>

                            {/* Booking Details */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-bold mb-1">{booking.movie}</h3>
                                  <p className="text-muted-foreground">
                                    {booking.cinema}, {booking.location}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </Badge>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleDownloadTicket(booking.id)}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Ticket
                                      </DropdownMenuItem>
                                      {booking.status === "completed" && (
                                        <DropdownMenuItem onClick={() => handleRateMovie(booking.movie)}>
                                          <Star className="mr-2 h-4 w-4" />
                                          Rate Movie
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(booking.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {booking.time}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Ticket className="h-4 w-4" />
                                  Seats: {booking.seats.join(", ")}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                                  </p>
                                  <p className="font-semibold">Total: ₹{booking.total}</p>
                                </div>
                                <div className="flex gap-2">
                                  {booking.status === "upcoming" && (
                                    <Button onClick={() => handleDownloadTicket(booking.id)}>
                                      <Download className="mr-2 h-4 w-4" />
                                      Download Ticket
                                    </Button>
                                  )}
                                  {booking.status === "completed" && (
                                    <Button variant="outline" onClick={() => handleRateMovie(booking.movie)}>
                                      <Star className="mr-2 h-4 w-4" />
                                      Rate Movie
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
