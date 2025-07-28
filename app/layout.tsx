import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { AuthProvider } from "@/contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieFlix - Book Movie Tickets Online",
  description:
    "Your ultimate destination for movie ticket booking. Discover the latest movies, find showtimes, and book tickets with ease.",
  keywords: "movie tickets, cinema, booking, entertainment, movies",
  authors: [{ name: "MovieFlix Team" }],
  openGraph: {
    title: "MovieFlix - Book Movie Tickets Online",
    description: "Your ultimate destination for movie ticket booking",
    type: "website",
    locale: "en_US",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
