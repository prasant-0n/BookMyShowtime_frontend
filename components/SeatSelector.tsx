"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Seat {
  id: string
  row: string
  number: number
  type: "regular" | "premium" | "vip"
  status: "available" | "occupied" | "selected"
  price: number
}

interface SeatSelectorProps {
  seats: Seat[]
  onSeatSelect: (seatId: string) => void
  selectedSeats: string[]
}

export default function SeatSelector({ seats, onSeatSelect, selectedSeats }: SeatSelectorProps) {
  const getSeatColor = (seat: Seat) => {
    if (seat.status === "occupied") return "bg-red-500"
    if (seat.status === "selected") return "bg-green-500"

    switch (seat.type) {
      case "vip":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "premium":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const rows = Array.from(new Set(seats.map((seat) => seat.row))).sort()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Seats</CardTitle>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
            <span>Regular (₹200)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Premium (₹300)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>VIP (₹500)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Selected</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Screen */}
        <div className="mb-8">
          <div className="w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2"></div>
          <p className="text-center text-sm text-muted-foreground">SCREEN</p>
        </div>

        {/* Seats */}
        <div className="space-y-2">
          {rows.map((row) => {
            const rowSeats = seats.filter((seat) => seat.row === row).sort((a, b) => a.number - b.number)

            return (
              <div key={row} className="flex items-center gap-2">
                <div className="w-8 text-center font-medium">{row}</div>
                <div className="flex gap-1">
                  {rowSeats.map((seat) => (
                    <motion.button
                      key={seat.id}
                      whileHover={{ scale: seat.status === "occupied" ? 1 : 1.1 }}
                      whileTap={{ scale: seat.status === "occupied" ? 1 : 0.95 }}
                      onClick={() => seat.status !== "occupied" && onSeatSelect(seat.id)}
                      disabled={seat.status === "occupied"}
                      className={`w-8 h-8 rounded text-white text-xs font-medium transition-colors ${getSeatColor(seat)} ${
                        seat.status === "occupied" ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      {seat.number}
                    </motion.button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Selected Seats:</h4>
            <div className="flex flex-wrap gap-2 mb-3">
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
            <div className="flex justify-between items-center">
              <span className="font-medium">
                Total: ₹
                {selectedSeats.reduce((total, seatId) => {
                  const seat = seats.find((s) => s.id === seatId)
                  return total + (seat?.price || 0)
                }, 0)}
              </span>
              <Button>Proceed to Payment</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
