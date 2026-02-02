"use client"

import { HeartCrack, RotateCcw, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGame } from "./game-context"

export function GameOverModal() {
  const { hearts, heartsEnabled, resetGame, newGame, difficulty } = useGame()
  
  const isGameOver = heartsEnabled && hearts === 0

  if (!isGameOver) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-card rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <HeartCrack className="w-16 h-16 text-destructive" />
            <Sparkles className="w-6 h-6 text-muted-foreground absolute -top-1 -right-1" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          Game Over
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          You ran out of hearts! Don't worry, try again!
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={resetGame}
            className={cn(
              "w-full py-4 rounded-xl",
              "bg-primary text-primary-foreground",
              "font-bold text-lg",
              "shadow-lg hover:shadow-xl",
              "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => newGame(difficulty)}
            className={cn(
              "w-full py-3 rounded-xl",
              "bg-secondary text-secondary-foreground",
              "font-medium",
              "shadow-md hover:shadow-lg",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-card"
            )}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}