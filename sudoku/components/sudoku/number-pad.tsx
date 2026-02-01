"use client"

import { cn } from "@/lib/utils"
import { useGame } from "./game-context"

export function NumberPad() {
  const { inputNumber, board, isPaused, isComplete } = useGame()

  // Count how many of each number are placed
  const numberCounts = Array(10).fill(0)
  board.forEach(row => {
    row.forEach(cell => {
      if (cell.value) numberCounts[cell.value]++
    })
  })

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
        const isComplete = numberCounts[num] >= 9
        
        return (
          <button
            key={num}
            type="button"
            onClick={() => inputNumber(num)}
            disabled={isPaused || isComplete}
            className={cn(
              "w-12 h-12 sm:w-14 sm:h-14",
              "rounded-xl font-bold text-xl sm:text-2xl",
              "transition-all duration-200",
              "shadow-md hover:shadow-lg",
              "active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              isComplete 
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
              (isPaused || isComplete) && "opacity-50 cursor-not-allowed"
            )}
          >
            {num}
          </button>
        )
      })}
    </div>
  )
}
