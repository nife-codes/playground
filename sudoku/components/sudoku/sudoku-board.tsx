"use client"

import { SudokuCell } from "./sudoku-cell"
import { useGame } from "./game-context"
import { cn } from "@/lib/utils"
import { Pause } from "lucide-react"

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
      
      {isPaused && (
        <div className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Pause className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Game Paused</p>
          </div>
        </div>
      )}
    </div>
  )
}