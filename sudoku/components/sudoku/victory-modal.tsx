"use client"

import { Star, Trophy, Clock, Heart, Sparkles, Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGame } from "./game-context"
import { useCoins } from "./coins-provider"
import { useEffect, useState } from "react"

export function VictoryModal() {
  const { isComplete, time, mistakes, hearts, heartsEnabled, difficulty, newGame } = useGame()
  const { earnCoins } = useCoins()
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [isNewBest, setIsNewBest] = useState(false)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [hasAwardedCoins, setHasAwardedCoins] = useState(false)

  useEffect(() => {
    if (isComplete && !hasAwardedCoins) {
      const bestTimes = JSON.parse(localStorage.getItem('sudoku-best-times') || '{}')
      const previousBest = bestTimes[difficulty]
      setBestTime(previousBest || time)
      setIsNewBest(!previousBest || time < previousBest)

      const baseReward = {
        easy: 30,
        medium: 50,
        hard: 75
      }[difficulty]

      const perfectBonus = mistakes === 0 ? 25 : 0
      const total = baseReward + perfectBonus

      setCoinsEarned(total)
      earnCoins(total)
      setHasAwardedCoins(true)
    }
  }, [isComplete, difficulty, time, mistakes, earnCoins, hasAwardedCoins])

  useEffect(() => {
    if (!isComplete) {
      setHasAwardedCoins(false)
      setCoinsEarned(0)
    }
  }, [isComplete])

  if (!isComplete) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Trophy className="w-16 h-16 text-primary" />
            <Sparkles className="w-6 h-6 text-accent absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          Puzzle Complete!
        </h2>
        <p className="text-center text-muted-foreground mb-6 capitalize">
          {difficulty} difficulty
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className={cn(
                "w-10 h-10 transition-all duration-500",
                star <= stars
                  ? "fill-accent text-accent animate-in zoom-in-50"
                  : "fill-muted text-muted"
              )}
              style={{ animationDelay: `${star * 150}ms` }}
            />
          ))}
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between bg-accent/20 rounded-xl px-4 py-3 border-2 border-accent">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-accent" />
              <span className="font-medium text-foreground">Coins Earned</span>
            </div>
            <span className="font-bold text-accent text-lg">+{coinsEarned}</span>
          </div>

          <div className="flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Time</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-foreground">{formatTime(time)}</span>
              {isNewBest && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  NEW BEST!
                </span>
              )}
            </div>
          </div>

          {heartsEnabled && (
            <div className="flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <span className="font-medium text-foreground">Hearts Left</span>
              </div>
              <span className="font-bold text-foreground">{hearts}/5</span>
            </div>
          )}

          <div className="flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3">
            <span className="font-medium text-foreground">Mistakes</span>
            <span className={cn(
              "font-bold",
              mistakes === 0 ? "text-accent" : mistakes <= 2 ? "text-primary" : "text-destructive"
            )}>
              {mistakes}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => newGame(difficulty)}
          className={cn(
            "w-full py-4 rounded-xl",
            "bg-primary text-primary-foreground",
            "font-bold text-lg",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
          )}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}