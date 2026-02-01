"use client"

import { SudokuCell } from "./sudoku-cell"
import { useGame } from "./game-context"
import { cn } from "@/lib/utils"

export function SudokuBoard() {
  const { isPaused } = useGame()

  return (
    <div className="relative">
      <div 
        className={cn(
          "grid grid-cols-9",
          "bg-card rounded-xl overflow-hidden",
          "shadow-lg shadow-primary/10",
          "border-2 border-primary/30"
        )}
      >
        {Array.from({ length: 9 }, (_, row) =>
          Array.from({ length: 9 }, (_, col) => (
            <SudokuCell key={`${row}-${col}`} row={row} col={col} />
          ))
        )}
      </div>
      
      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">⏸️</div>
            <p className="text-lg font-medium text-muted-foreground">Game Paused</p>
          </div>
        </div>
      )}
    </div>
  )
}
