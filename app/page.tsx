"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import MovieCard from "@/components/MovieCard"
import HeroBanner from "@/components/HeroBanner"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useTheme } from "@/contexts/ThemeContext"

const featuredMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    genre: "Sci-Fi, Adventure",
    rating: 8.2,
    duration: "3h 12m",
    image: "/placeholder.svg?height=400&width=300&text=Avatar",
    banner: "https://img.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5857/1745986875857-i",
    description:
      "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
    releaseDate: "2022-12-16",
    language: "English",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
  },
  {
    id: 2,
    title: "Black Panther: Wakanda Forever",
    genre: "Action, Adventure",
    rating: 7.8,
    duration: "2h 41m",
    image: "/placeholder.svg?height=400&width=300&text=Black+Panther",
    banner: "https://img.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/1118/1752478331118-i",
    description:
      "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers.",
    releaseDate: "2022-11-11",
    language: "English",
    cast: ["Letitia Wright", "Angela Bassett", "Tenoch Huerta"],
  },
  {
    id: 3,
    title: "Top Gun: Maverick",
    genre: "Action, Drama",
    rating: 8.7,
    duration: "2h 10m",
    image: "/placeholder.svg?height=400&width=300&text=Top+Gun",
    banner: "https://img.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/5928/1752777915928-i",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    releaseDate: "2022-05-27",
    language: "English",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
  },
]

const nowShowingMovies = [
  {
    id: 4,
    title: "The Batman",
    genre: "Action, Crime",
    rating: 8.1,
    duration: "2h 56m",
    image: "/placeholder.svg?height=400&width=300&text=The+Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    releaseDate: "2022-03-04",
    language: "English",
  },
  {
    id: 5,
    title: "Doctor Strange 2",
    genre: "Action, Adventure",
    rating: 7.4,
    duration: "2h 6m",
    image: "/placeholder.svg?height=400&width=300&text=Doctor+Strange",
    description: "Doctor Strange teams up with a mysterious young girl who can travel across multiverses.",
    releaseDate: "2022-05-06",
    language: "English",
  },
  {
    id: 6,
    title: "Jurassic World Dominion",
    genre: "Action, Adventure",
    rating: 6.8,
    duration: "2h 27m",
    image: "/placeholder.svg?height=400&width=300&text=Jurassic+World",
    description:
      "Four years after the destruction of Isla Nublar, dinosaurs now live and hunt alongside humans all over the world.",
    releaseDate: "2022-06-10",
    language: "English",
  },
  {
    id: 7,
    title: "Minions: The Rise of Gru",
    genre: "Animation, Comedy",
    rating: 6.5,
    duration: "1h 27m",
    image: "/placeholder.svg?height=400&width=300&text=Minions",
    description: "The untold story of one twelve-year-old's dream to become the world's greatest supervillain.",
    releaseDate: "2022-07-01",
    language: "English",
  },
]

const comingSoonMovies = [
  {
    id: 8,
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Animation, Action",
    rating: 9.2,
    duration: "2h 20m",
    image: "/placeholder.svg?height=400&width=300&text=Spider-Man",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.",
    releaseDate: "2023-06-02",
    language: "English",
  },
  {
    id: 9,
    title: "Fast X",
    genre: "Action, Crime",
    rating: 7.2,
    duration: "2h 21m",
    image: "/placeholder.svg?height=400&width=300&text=Fast+X",
    description: "Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.",
    releaseDate: "2023-05-19",
    language: "English",
  },
  {
    id: 10,
    title: "Indiana Jones 5",
    genre: "Action, Adventure",
    rating: 7.8,
    duration: "2h 34m",
    image: "/placeholder.svg?height=400&width=300&text=Indiana+Jones",
    description: "Aging archaeologist Indiana Jones races against time to retrieve a legendary artifact.",
    releaseDate: "2023-06-30",
    language: "English",
  },
]

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"]

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai")
  const [searchQuery, setSearchQuery] = useState("")
  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <HeroBanner movies={featuredMovies} />

      {/* Search and City Selection */}
      <motion.section
        className="py-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for movies, cinemas, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Now Showing */}
      <motion.section
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Now Showing</h2>
            <p className="text-muted-foreground text-lg">Book tickets for the latest movies</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
            {nowShowingMovies.map((movie) => (
              <motion.div key={movie.id} variants={itemVariants}>
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Coming Soon */}
      <motion.section
        className="py-16 bg-muted/30"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Coming Soon</h2>
            <p className="text-muted-foreground text-lg">Get ready for these upcoming blockbusters</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
            {comingSoonMovies.map((movie) => (
              <motion.div key={movie.id} variants={itemVariants}>
                <MovieCard movie={movie} isComingSoon />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg">Join millions of movie lovers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment: "Amazing experience! Easy booking and great seat selection.",
                avatar: "/placeholder.svg?height=60&width=60&text=SJ",
              },
              {
                name: "Mike Chen",
                rating: 5,
                comment: "Love the interface and quick booking process. Highly recommended!",
                avatar: "/placeholder.svg?height=60&width=60&text=MC",
              },
              {
                name: "Emily Davis",
                rating: 4,
                comment: "Great app with excellent movie recommendations and smooth payments.",
                avatar: "/placeholder.svg?height=60&width=60&text=ED",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{testimonial.comment}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for the Ultimate Movie Experience?</h2>
            <p className="text-xl mb-8 opacity-90">Download our app and get exclusive deals on movie tickets</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Download App
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                Subscribe to Newsletter
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
