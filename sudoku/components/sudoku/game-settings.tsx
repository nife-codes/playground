"use client"

import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGame } from "./game-context"
import type { Difficulty } from "@/lib/sudoku"

export function GameSettings() {
  const { difficulty, newGame, heartsEnabled, toggleHeartsEnabled, isPaused, isComplete } = useGame()

  const difficulties: { value: Difficulty; label: string }[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        {difficulties.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => newGame(value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              difficulty === value
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-foreground hover:bg-muted shadow-md"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm font-medium text-foreground">Hearts</span>
          <button
            type="button"
            role="switch"
            aria-checked={heartsEnabled}
            onClick={toggleHeartsEnabled}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full",
              "transition-colors duration-200 border-2",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              heartsEnabled ? "bg-primary border-primary" : "bg-muted border-border"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full shadow-md",
                "transition-transform duration-200",
                heartsEnabled ? "translate-x-6 bg-primary-foreground" : "translate-x-1 bg-foreground"
              )}
            />
          </button>
        </label>

        <button
          type="button"
          onClick={() => newGame(difficulty)}
          className={cn(
            "flex items-center gap-2",
            "px-4 py-2 rounded-full",
            "bg-secondary text-secondary-foreground",
            "text-sm font-medium",
            "shadow-md hover:shadow-lg",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          )}
        >
          <RefreshCw className="w-4 h-4" />
          New Game
        </button>
      </div>
    </div>
  )
}