"use client"

import { useState, useEffect } from "react"

const BEST_SCORE_KEY = "spider2048-best-score"

/**
 * Hook for managing persistent best score in localStorage
 * Automatically saves and retrieves best score across sessions
 */
export function useBestScore() {
  const [bestScore, setBestScore] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load best score from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BEST_SCORE_KEY)
      if (saved) {
        const score = Number.parseInt(saved, 10)
        if (!isNaN(score)) {
          setBestScore(score)
        }
      }
    } catch (error) {
      console.error("Failed to load best score:", error)
    }
    setIsLoaded(true)
  }, [])

  // Save best score to localStorage whenever it changes
  const updateBestScore = (newScore: number) => {
    if (newScore > bestScore) {
      setBestScore(newScore)
      try {
        localStorage.setItem(BEST_SCORE_KEY, newScore.toString())
      } catch (error) {
        console.error("Failed to save best score:", error)
      }
    }
  }

  // Clear best score (useful for testing or reset)
  const clearBestScore = () => {
    setBestScore(0)
    try {
      localStorage.removeItem(BEST_SCORE_KEY)
    } catch (error) {
      console.error("Failed to clear best score:", error)
    }
  }

  return {
    bestScore,
    updateBestScore,
    clearBestScore,
    isLoaded,
  }
}
