"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import MovieCard from "@/components/MovieCard"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const allMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    genre: "Sci-Fi, Adventure",
    rating: 8.2,
    duration: "3h 12m",
    image: "/placeholder.svg?height=400&width=300&text=Avatar",
    description:
      "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family.",
    releaseDate: "2022-12-16",
    language: "English",
  },
  {
    id: 2,
    title: "Black Panther: Wakanda Forever",
    genre: "Action, Adventure",
    rating: 7.8,
    duration: "2h 41m",
    image: "/placeholder.svg?height=400&width=300&text=Black+Panther",
    description:
      "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers.",
    releaseDate: "2022-11-11",
    language: "English",
  },
  {
    id: 3,
    title: "Top Gun: Maverick",
    genre: "Action, Drama",
    rating: 8.7,
    duration: "2h 10m",
    image: "/placeholder.svg?height=400&width=300&text=Top+Gun",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    releaseDate: "2022-05-27",
    language: "English",
  },
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
]

export default function MoviesPage() {
  const [movies, setMovies] = useState(allMovies)
  const [searchQuery, setSearchQuery] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")

  const genres = Array.from(new Set(allMovies.flatMap((movie) => movie.genre.split(", "))))
  const languages = Array.from(new Set(allMovies.map((movie) => movie.language)))

  useEffect(() => {
    const filtered = allMovies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = genreFilter === "all" || movie.genre.includes(genreFilter)
      const matchesLanguage = languageFilter === "all" || movie.language === languageFilter

      return matchesSearch && matchesGenre && matchesLanguage
    })

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "release-date":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return b.rating - a.rating // Default to rating
      }
    })

    setMovies(filtered)
  }, [searchQuery, genreFilter, languageFilter, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">All Movies</h1>
          <p className="text-muted-foreground text-lg">Discover and book tickets for the latest movies</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="release-date">Release Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Showing {movies.length} movie{movies.length !== 1 ? "s" : ""}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Movies Grid */}
        {movies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">No movies found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search criteria or filters</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}
