"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Film, DollarSign, TrendingUp, TrendingDown, Ticket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DashboardStats {
  totalUsers: number
  totalMovies: number
  totalBookings: number
  totalRevenue: number
  recentBookings: Array<{
    id: string
    movie: string
    user: string
    amount: number
    date: string
  }>
  popularMovies: Array<{
    title: string
    bookings: number
    revenue: number
  }>
}

const mockStats: DashboardStats = {
  totalUsers: 12543,
  totalMovies: 45,
  totalBookings: 8932,
  totalRevenue: 2456789,
  recentBookings: [
    { id: "BK001", movie: "Avatar: The Way of Water", user: "John Doe", amount: 630, date: "2024-01-15" },
    { id: "BK002", movie: "Black Panther", user: "Jane Smith", amount: 450, date: "2024-01-15" },
    { id: "BK003", movie: "Top Gun: Maverick", user: "Mike Johnson", amount: 520, date: "2024-01-14" },
    { id: "BK004", movie: "Spider-Man", user: "Sarah Wilson", amount: 380, date: "2024-01-14" },
    { id: "BK005", movie: "The Batman", user: "Tom Brown", amount: 290, date: "2024-01-13" },
  ],
  popularMovies: [
    { title: "Avatar: The Way of Water", bookings: 1234, revenue: 456789 },
    { title: "Black Panther: Wakanda Forever", bookings: 987, revenue: 345678 },
    { title: "Top Gun: Maverick", bookings: 876, revenue: 298765 },
    { title: "Spider-Man: No Way Home", bookings: 765, revenue: 234567 },
  ],
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setStats(mockStats), 1000)
  }, [])

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Active Movies",
      value: stats.totalMovies.toString(),
      icon: Film,
      change: "+3",
      changeType: "positive" as const,
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings.toLocaleString(),
      icon: Ticket,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Total Revenue",
      value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`,
      icon: DollarSign,
      change: "+15%",
      changeType: "positive" as const,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your movie booking platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest ticket bookings on your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{booking.movie}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.user} • {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary">₹{booking.amount}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular Movies */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle>Popular Movies</CardTitle>
              <CardDescription>Top performing movies by bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.popularMovies.map((movie, index) => (
                  <div key={movie.title} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{movie.title}</p>
                      <div className="text-right">
                        <p className="text-sm font-medium">{movie.bookings} bookings</p>
                        <p className="text-xs text-muted-foreground">₹{movie.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <Progress value={(movie.bookings / stats.popularMovies[0].bookings) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
