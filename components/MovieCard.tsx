"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Clock, Calendar, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Movie {
  id: number
  title: string
  genre: string
  rating: number
  duration: string
  image: string
  description: string
  releaseDate: string
  language: string
}

interface MovieCardProps {
  movie: Movie
  isComingSoon?: boolean
}

export default function MovieCard({ movie, isComingSoon = false }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden group cursor-pointer h-full">
        <div className="relative">
          <img
            src={movie.image || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {isComingSoon ? (
                <Button size="lg" variant="secondary">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Trailer
                </Button>
              ) : (
                <Link href={`/movies/${movie.id}`}>
                  <Button size="lg">Book Now</Button>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-black/70 text-white border-0">
              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              {movie.rating}
            </Badge>
          </div>

          {/* Coming Soon Badge */}
          {isComingSoon && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive">Coming Soon</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{movie.genre}</p>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {movie.duration}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {new Date(movie.releaseDate).toLocaleDateString()}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{movie.description}</p>

          {!isComingSoon && (
            <Link href={`/movies/${movie.id}`}>
              <Button className="w-full bg-transparent" variant="outline">
                View Details
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
