"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Wallet, Smartphone, Shield, Clock, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "upi",
    name: "UPI",
    icon: <Smartphone className="h-5 w-5" />,
    description: "Google Pay, PhonePe, Paytm",
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    icon: <Wallet className="h-5 w-5" />,
    description: "Paytm, Amazon Pay, MobiKwik",
  },
]

export default function PaymentPage({ params }: { params: { showtimeId: string } }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [upiId, setUpiId] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedSeats = searchParams.get("seats")?.split(",") || []

  // Mock booking data
  const bookingData = {
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
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast.success("Payment successful! Booking confirmed.")
      router.push(`/booking-confirmation/${params.showtimeId}?seats=${selectedSeats.join(",")}`)
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              />
            </div>
          </div>
        )
      case "upi":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input id="upiId" placeholder="yourname@paytm" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>You will be redirected to your UPI app to complete the payment</p>
            </div>
          </div>
        )
      case "wallet":
        return (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Wallet className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Select your preferred wallet</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {["Paytm", "Amazon Pay", "MobiKwik"].map((wallet) => (
                <Button key={wallet} variant="outline" className="h-16 bg-transparent">
                  {wallet}
                </Button>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
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
            <h1 className="text-2xl font-bold">Payment</h1>
            <p className="text-muted-foreground">Complete your booking</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Choose Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              {method.icon}
                              <div>
                                <div className="font-medium">{method.name}</div>
                                <div className="text-sm text-muted-foreground">{method.description}</div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>

                  <Separator className="my-6" />

                  {/* Payment Form */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Payment Details</h3>
                    {renderPaymentForm()}
                  </div>

                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      Your payment information is secure and encrypted
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                    <h3 className="font-semibold text-lg mb-2">{bookingData.movie}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {bookingData.cinema}, {bookingData.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(bookingData.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {bookingData.time} | {bookingData.screen}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Selected Seats</h4>
                    <div className="flex flex-wrap gap-1">
                      {bookingData.seats.map((seat) => (
                        <Badge key={seat} variant="secondary">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Tickets ({bookingData.seats.length})</span>
                      <span>₹{bookingData.seats.length * bookingData.ticketPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Convenience Fee</span>
                      <span>₹{bookingData.convenienceFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total Amount</span>
                      <span>₹{bookingData.total}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
                    {isProcessing ? "Processing Payment..." : `Pay ₹${bookingData.total}`}
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    By proceeding, you agree to our Terms & Conditions
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
