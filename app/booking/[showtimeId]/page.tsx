"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import SeatSelector from "@/components/SeatSelector"
import { useRouter } from "next/navigation"

interface Seat {
  id: string
  row: string
  number: number
  type: "regular" | "premium" | "vip"
  status: "available" | "occupied" | "selected"
  price: number
}

interface ShowtimeDetails {
  id: string
  movieTitle: string
  cinema: string
  location: string
  date: string
  time: string
  screen: string
}

const mockShowtime: ShowtimeDetails = {
  id: "1",
  movieTitle: "Avatar: The Way of Water",
  cinema: "PVR Cinemas",
  location: "Phoenix Mall",
  date: "2024-01-15",
  time: "7:30 PM",
  screen: "Screen 3",
}

const generateSeats = (): Seat[] => {
  const seats: Seat[] = []
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

  rows.forEach((row, rowIndex) => {
    const seatsPerRow = 12
    const seatType = rowIndex < 3 ? "vip" : rowIndex < 6 ? "premium" : "regular"
    const basePrice = seatType === "vip" ? 500 : seatType === "premium" ? 300 : 200

    for (let i = 1; i <= seatsPerRow; i++) {
      const isOccupied = Math.random() < 0.3 // 30% chance of being occupied

      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        type: seatType,
        status: isOccupied ? "occupied" : "available",
        price: basePrice,
      })
    }
  })

  return seats
}

export default function BookingPage({ params }: { params: { showtimeId: string } }) {
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [showtime, setShowtime] = useState<ShowtimeDetails | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Simulate API calls
    setShowtime(mockShowtime)
    setSeats(generateSeats())
  }, [params.showtimeId])

  const handleSeatSelect = (seatId: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id === seatId) {
          const newStatus = seat.status === "selected" ? "available" : "selected"

          if (newStatus === "selected") {
            setSelectedSeats((prev) => [...prev, seatId])
          } else {
            setSelectedSeats((prev) => prev.filter((id) => id !== seatId))
          }

          return { ...seat, status: newStatus }
        }
        return seat
      }),
    )
  }

  const totalAmount = selectedSeats.reduce((total, seatId) => {
    const seat = seats.find((s) => s.id === seatId)
    return total + (seat?.price || 0)
  }, 0)

  if (!showtime) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Select Seats</h1>
            <p className="text-muted-foreground">Choose your preferred seats</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <SeatSelector seats={seats} onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />
            </motion.div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{showtime.movieTitle}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {showtime.cinema}, {showtime.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(showtime.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {showtime.time} | {showtime.screen}
                      </div>
                    </div>
                  </div>

                  {selectedSeats.length > 0 && (
                    <>
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Selected Seats</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedSeats.map((seatId) => {
                            const seat = seats.find((s) => s.id === seatId)
                            return seat ? (
                              <Badge key={seatId} variant="secondary">
                                {seat.row}
                                {seat.number}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span>Tickets ({selectedSeats.length})</span>
                          <span>₹{totalAmount}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Convenience Fee</span>
                          <span>₹{Math.round(totalAmount * 0.1)}</span>
                        </div>
                        <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
                          <span>Total</span>
                          <span>₹{totalAmount + Math.round(totalAmount * 0.1)}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => router.push(`/payment/${params.showtimeId}?seats=${selectedSeats.join(",")}`)}
                      >
                        Proceed to Payment
                      </Button>
                    </>
                  )}

                  {selectedSeats.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Please select seats to continue</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
