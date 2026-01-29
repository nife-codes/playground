"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface Rating {
  stars: number
  timestamp: number
}

export function GameRating() {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [userRating, setUserRating] = useState<number | null>(null)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)

  useEffect(() => {
    // Load ratings from localStorage
    const savedRatings = localStorage.getItem("spider2048-ratings")
    const savedUserRating = localStorage.getItem("spider2048-user-rating")
    
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings) as Rating[])
    }
    if (savedUserRating) {
      setUserRating(Number.parseInt(savedUserRating, 10))
    }
  }, [])

  const handleRate = (stars: number) => {
    const newRating: Rating = { stars, timestamp: Date.now() }
    
    let updatedRatings: Rating[]
    if (userRating !== null) {
      // Update existing rating
      updatedRatings = ratings.map((r: Rating, i: number) =>
        i === ratings.length - 1 ? newRating : r
      )
    } else {
      // Add new rating
      updatedRatings = [...ratings, newRating]
    }
    
    setRatings(updatedRatings)
    setUserRating(stars)
    localStorage.setItem("spider2048-ratings", JSON.stringify(updatedRatings))
    localStorage.setItem("spider2048-user-rating", stars.toString())
  }

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum: number, r: Rating) => sum + r.stars, 0) / ratings.length
      : 0

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border/50">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Rate This Game
      </h3>
      
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            className="p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              className={cn(
                "w-6 h-6 transition-colors",
                (hoveredStar !== null ? star <= hoveredStar : star <= (userRating || 0))
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-muted-foreground"
              )}
            />
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-0.5 text-sm">
        <span className="text-foreground font-medium">
          {averageRating > 0 ? averageRating.toFixed(1) : "No ratings yet"}
        </span>
        <span className="text-muted-foreground text-xs">
          {ratings.length} {ratings.length === 1 ? "rating" : "ratings"}
        </span>
      </div>
      
      {userRating && (
        <p className="text-xs text-accent">
          You rated: {userRating} star{userRating > 1 ? "s" : ""}
        </p>
      )}
    </div>
  )
}
