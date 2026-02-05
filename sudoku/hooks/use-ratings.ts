"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, query, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Rating {
  stars: number
  timestamp: number
}

export function useRatings() {
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [totalRatings, setTotalRatings] = useState(0)
  const [hasRated, setHasRated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const rated = localStorage.getItem("sudoku-rated")
    setHasRated(rated === "true")
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    try {
      const q = query(collection(db, "sudoku-ratings"))
      const querySnapshot = await getDocs(q)
      
      const ratings: Rating[] = []
      querySnapshot.forEach((doc) => {
        ratings.push(doc.data() as Rating)
      })

      if (ratings.length > 0) {
        const sum = ratings.reduce((acc, r) => acc + r.stars, 0)
        const avg = sum / ratings.length
        setAverageRating(Number(avg.toFixed(1)))
        setTotalRatings(ratings.length)
      }
    } catch (error) {
      console.error("Error fetching ratings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitRating = async (stars: number) => {
    if (hasRated) {
      return false
    }

    try {
      await addDoc(collection(db, "sudoku-ratings"), {
        stars,
        timestamp: Date.now()
      })

      localStorage.setItem("sudoku-rated", "true")
      setHasRated(true)
      await fetchRatings()
      return true
    } catch (error) {
      console.error("Error submitting rating:", error)
      return false
    }
  }

  return {
    averageRating,
    totalRatings,
    hasRated,
    isLoading,
    submitRating,
    refreshRatings: fetchRatings
  }
}