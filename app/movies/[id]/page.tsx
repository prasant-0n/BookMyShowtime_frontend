"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Clock, Calendar, MapPin, Users, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"

interface MovieDetails {
  id: number
  title: string
  genre: string
  rating: number
  duration: string
  image: string
  banner: string
  description: string
  releaseDate: string
  language: string
  cast: string[]
  director: string
  synopsis: string
}

interface Showtime {
  id: string
  time: string
  cinema: string
  location: string
  price: number
  availableSeats: number
}

const mockMovie: MovieDetails = {
  id: 1,
  title: "Avatar: The Way of Water",
  genre: "Sci-Fi, Adventure, Drama",
  rating: 8.2,
  duration: "3h 12m",
  image: "https://img.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5857/1745986875857-i",
  banner: "https://img.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/1118/1752478331118-i",
  description:
    "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
  releaseDate: "2022-12-16",
  language: "English",
  cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang", "Kate Winslet"],
  director: "James Cameron",
  synopsis:
    "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
}

const mockShowtimes: Showtime[] = [
  { id: "1", time: "10:00 AM", cinema: "PVR Cinemas", location: "Phoenix Mall", price: 250, availableSeats: 45 },
  { id: "2", time: "1:30 PM", cinema: "PVR Cinemas", location: "Phoenix Mall", price: 300, availableSeats: 32 },
  { id: "3", time: "5:00 PM", cinema: "INOX", location: "Forum Mall", price: 280, availableSeats: 28 },
  { id: "4", time: "8:30 PM", cinema: "INOX", location: "Forum Mall", price: 350, availableSeats: 15 },
  { id: "5", time: "11:00 PM", cinema: "Cinepolis", location: "Central Mall", price: 200, availableSeats: 52 },
]

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    // Simulate API call
    setMovie(mockMovie)
    setShowtimes(mockShowtimes)
  }, [params.id])

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.banner})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="overflow-hidden">
              <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-auto object-cover" />
            </Card>
          </motion.div>

          {/* Movie Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-lg p-6">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="mr-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{movie.rating}/10</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {movie.duration}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </div>
                <Badge variant="outline">{movie.language}</Badge>
              </div>

              <p className="text-lg text-muted-foreground mb-4">{movie.genre}</p>

              <div className="flex gap-4 mb-6">
                <Button size="lg" className="flex-1">
                  Book Tickets
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Synopsis</h3>
                  <p className="text-muted-foreground leading-relaxed">{movie.synopsis}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Director</h3>
                  <p className="text-muted-foreground">{movie.director}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <Badge key={index} variant="secondary">
                        {actor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Showtimes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Book Tickets</h2>

            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Select Date</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((date) => {
                  const dateStr = date.toISOString().split("T")[0]
                  const isSelected = selectedDate === dateStr
                  const isToday = dateStr === new Date().toISOString().split("T")[0]

                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`flex-shrink-0 p-3 rounded-lg border text-center min-w-[80px] transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card hover:bg-muted border-border"
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {isToday ? "Today" : date.toLocaleDateString("en", { weekday: "short" })}
                      </div>
                      <div className="text-xs opacity-70">
                        {date.getDate()}/{date.getMonth() + 1}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Showtimes */}
            <div className="space-y-4">
              <h3 className="font-semibold">Available Shows</h3>
              {showtimes.map((showtime) => (
                <Card key={showtime.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-lg font-semibold">{showtime.time}</span>
                        <Badge variant="outline">{showtime.cinema}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {showtime.location}
                        <Users className="ml-4 mr-1 h-4 w-4" />
                        {showtime.availableSeats} seats available
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold mb-2">₹{showtime.price}</div>
                      <Link href={`/booking/${showtime.id}`}>
                        <Button>Select Seats</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}
