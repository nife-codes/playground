"use client"

import React, { useState } from "react"
import { Star } from "lucide-react"
import { useRatings } from "../hooks/use-ratings"

interface RatingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RatingModal({ open, onOpenChange }: RatingModalProps) {
  const [selectedStars, setSelectedStars] = useState(0)
  const [hoverStars, setHoverStars] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { averageRating, totalRatings, hasRated, submitRating } = useRatings()

  if (!open) return null

  const handleSubmit = async () => {
    if (selectedStars === 0) return
    
    setIsSubmitting(true)
    const success = await submitRating(selectedStars)
    setIsSubmitting(false)
    
    if (success) {
      setSubmitted(true)
      setTimeout(() => {
        onOpenChange(false)
        setSubmitted(false)
        setSelectedStars(0)
      }, 2000)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false)
      setSelectedStars(0)
      setSubmitted(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {hasRated ? "Thanks for rating!" : submitted ? "Thank you!" : "Rate this game"}
            </h2>
            {averageRating !== null && (
              <p className="text-sm text-muted-foreground">
                Current rating: {averageRating} stars from {totalRatings} {totalRatings === 1 ? "rating" : "ratings"}
              </p>
            )}
          </div>

          {hasRated ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">You've already rated this game!</p>
            </div>
          ) : submitted ? (
            <div className="text-center py-6">
              <p className="text-accent text-lg font-semibold">Rating submitted!</p>
            </div>
          ) : (
            <>
              <div className="flex justify-center gap-2 py-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedStars(star)}
                    onMouseEnter={() => setHoverStars(star)}
                    onMouseLeave={() => setHoverStars(0)}
                    className="transition-transform hover:scale-110"
                    disabled={isSubmitting}
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoverStars || selectedStars)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={selectedStars === 0 || isSubmitting}
                  className="flex-1 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </>
          )}

          {!hasRated && !submitted && (
            <p className="text-xs text-center text-muted-foreground">
              Your rating is stored locally. You can only rate once per browser.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}