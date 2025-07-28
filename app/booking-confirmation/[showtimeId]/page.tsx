"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Download, Share2, Calendar, Clock, MapPin, Ticket, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/Navbar"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function BookingConfirmationPage({ params }: { params: { showtimeId: string } }) {
  const searchParams = useSearchParams()
  const selectedSeats = searchParams.get("seats")?.split(",") || []

  const [bookingId] = useState(`BK${Date.now()}`)

  const bookingData = {
    id: bookingId,
    movie: "Avatar: The Way of Water",
    cinema: "PVR Cinemas",
    location: "Phoenix Mall",
    date: "2024-01-15",
    time: "7:30 PM",
    screen: "Screen 3",
    seats: selectedSeats,
    ticketPrice: 300,
    convenienceFee: 30,
    total: selectedSeats.length * 300 + 30,
    bookingTime: new Date().toLocaleString(),
  }

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert("Ticket download functionality would be implemented here")
  }

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: `Movie Ticket - ${bookingData.movie}`,
        text: `I just booked tickets for ${bookingData.movie} at ${bookingData.cinema}!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Booking link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Your movie tickets have been successfully booked</p>
          </div>

          {/* Ticket Card */}
          <Card className="mb-6">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{bookingData.movie}</CardTitle>
                  <p className="opacity-90">{bookingData.cinema}</p>
                </div>
                <Ticket className="h-8 w-8" />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Booking Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Booking Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Booking ID:</span>
                        <span className="font-mono">{bookingData.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Booked on:</span>
                        <span>{bookingData.bookingTime}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Show Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{bookingData.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(bookingData.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {bookingData.time} | {bookingData.screen}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Seats</h3>
                    <div className="flex flex-wrap gap-2">
                      {bookingData.seats.map((seat) => (
                        <Badge key={seat} variant="secondary" className="text-sm">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* QR Code and Payment */}
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Show this QR code at the cinema</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">Payment Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tickets ({bookingData.seats.length})</span>
                        <span>₹{bookingData.seats.length * bookingData.ticketPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Convenience Fee</span>
                        <span>₹{bookingData.convenienceFee}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total Paid</span>
                        <span>₹{bookingData.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button onClick={handleDownloadTicket} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Ticket
            </Button>
            <Button variant="outline" onClick={handleShareBooking} className="flex-1 bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              Share Booking
            </Button>
          </div>

          {/* Important Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Please arrive at the cinema at least 15 minutes before the show time</li>
                <li>• Carry a valid ID proof along with your ticket</li>
                <li>• Outside food and beverages are not allowed</li>
                <li>• Tickets once booked cannot be cancelled or refunded</li>
                <li>• Show this QR code or booking ID at the cinema counter</li>
              </ul>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="text-center mt-8">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <Link href="/my-bookings" className="ml-4">
              <Button>View All Bookings</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
