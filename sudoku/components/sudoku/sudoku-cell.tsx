"use client"

import { cn } from "@/lib/utils"
import { useGame } from "./game-context"

interface SudokuCellProps {
  row: number
  col: number
}

export function SudokuCell({ row, col }: SudokuCellProps) {
  const { board, solution, selectedCell, selectCell, isPaused } = useGame()
  
  if (board.length === 0) return null
  
  const cell = board[row][col]
  const isSelected = selectedCell && selectedCell[0] === row && selectedCell[1] === col
  const selectedValue = selectedCell ? board[selectedCell[0]][selectedCell[1]].value : null
  
  // Check if cell is in the same row, column, or box as selected cell
  const isRelated = selectedCell && (
    row === selectedCell[0] ||
    col === selectedCell[1] ||
    (Math.floor(row / 3) === Math.floor(selectedCell[0] / 3) &&
     Math.floor(col / 3) === Math.floor(selectedCell[1] / 3))
  )
  
  // Check if cell has the same value as selected cell
  const isSameValue = selectedValue && cell.value === selectedValue
  
  // Check if cell value is wrong
  const isWrong = cell.value !== null && !cell.isOriginal && cell.value !== solution[row][col]
  
  // Border classes for 3x3 box separation
  const borderClasses = cn(
    // Right borders
    col === 2 && "border-r-2 border-r-primary/40",
    col === 5 && "border-r-2 border-r-primary/40",
    // Bottom borders
    row === 2 && "border-b-2 border-b-primary/40",
    row === 5 && "border-b-2 border-b-primary/40",
  )

  return (
    <button
      type="button"
      onClick={() => selectCell(row, col)}
      disabled={isPaused}
      className={cn(
        "relative flex items-center justify-center",
        "w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12",
        "text-lg sm:text-xl md:text-2xl font-semibold",
        "border border-border/50",
        "transition-all duration-150",
        "focus:outline-none focus:ring-0",
        borderClasses,
        // Background states
        isSelected && "bg-primary/30 ring-2 ring-primary ring-inset",
        !isSelected && isSameValue && "bg-secondary/60",
        !isSelected && !isSameValue && isRelated && "bg-muted/40",
        !isSelected && !isSameValue && !isRelated && "bg-card",
        // Hover
        !isSelected && "hover:bg-primary/10",
        // Text color
        cell.isOriginal && "text-foreground",
        !cell.isOriginal && !isWrong && "text-primary",
        isWrong && "text-destructive animate-pulse",
        // Disabled state
        isPaused && "opacity-0"
      )}
    >
      {cell.value ? (
        <span className={cn(
          "transition-transform duration-200",
          isWrong && "animate-shake"
        )}>
          {cell.value}
        </span>
      ) : cell.notes.size > 0 ? (
        <div className="grid grid-cols-3 gap-0 text-[8px] sm:text-[10px] text-muted-foreground leading-none p-0.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <span 
              key={n} 
              className={cn(
                "w-2 h-2 sm:w-2.5 sm:h-2.5 flex items-center justify-center",
                cell.notes.has(n) ? "opacity-100" : "opacity-0"
              )}
            >
              {n}
            </span>
          ))}
        </div>
      ) : null}
    </button>
  )
}
