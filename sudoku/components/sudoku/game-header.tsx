"use client"

import { Heart, Pause, Play, Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGame } from "./game-context"
import { useCoins } from "./coins-provider"

export function GameHeader() {
  const { hearts, maxHearts, heartsEnabled, time, isPaused, togglePause, isComplete } = useGame()
  const { coins } = useCoins()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto px-2 gap-3">
      <div className="flex items-center gap-1">
        {heartsEnabled ? (
          Array.from({ length: maxHearts }, (_, i) => (
            <Heart
              key={i}
              className={cn(
                "w-6 h-6 transition-all duration-300",
                i < hearts
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              )}
            />
          ))
        ) : (
          <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Casual Mode
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 bg-card shadow-md rounded-full px-3 py-1 border border-border">
        <Coins className="w-4 h-4 text-accent" />
        <span className="font-bold text-foreground">{coins}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={togglePause}
          disabled={isComplete}
          className={cn(
            "p-2 rounded-full transition-all duration-200",
            "bg-card shadow-md hover:shadow-lg",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            isComplete && "opacity-50 cursor-not-allowed"
          )}
          aria-label={isPaused ? "Resume game" : "Pause game"}
        >
          {isPaused ? (
            <Play className="w-5 h-5 text-primary fill-primary" />
          ) : (
            <Pause className="w-5 h-5 text-foreground" />
          )}
        </button>
        <span className="font-mono text-xl font-semibold text-foreground min-w-[70px] text-center">
          {formatTime(time)}
        </span>
      </div>
    </div>
  )
}