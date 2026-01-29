"use client"

import React, { useState } from "react"
import { Star, Check } from "lucide-react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog"

interface RatingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RatingModal({ open, onOpenChange }: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return

    try {
    
      const ratingData = {
        stars: rating,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      }

      const ratings = JSON.parse(localStorage.getItem("spider-ratings") || "[]")
      ratings.push(ratingData)
      localStorage.setItem("spider-ratings", JSON.stringify(ratings))

      setSubmitted(true)
      setTimeout(() => {
        onOpenChange(false)
        setSubmitted(false)
        setRating(0)
      }, 2000)
    } catch (error) {
      console.error("Failed to submit rating:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Rate the Game
          </DialogTitle>
          <DialogDescription>
            Let us know what you think about Spider-Verse 2048!
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <div className="rounded-full bg-accent/20 p-3">
              <Check className="w-6 h-6 text-accent" />
            </div>
            <p className="text-center text-sm font-medium">
              Thanks for your feedback! 🕷️
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 py-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? "fill-accent text-accent"
                        : "text-muted-foreground hover:text-accent"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {rating === 0 && "Click to rate"}
              {rating === 1 && "Not great"}
              {rating === 2 && "Could be better"}
              {rating === 3 && "Pretty good"}
              {rating === 4 && "Really good"}
              {rating === 5 && "Amazing!"}
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="gap-2"
              >
                <Star className="w-4 h-4" />
                Submit Rating
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
