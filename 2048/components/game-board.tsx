"use client"

import type { Tile } from "@/hooks/use-game-2048"
import { GameTile } from "./game-tile"

interface GameBoardProps {
  grid: (Tile | null)[][]
}

function WebBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Spider web pattern */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="50"
          x2={50 + 70 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 70 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-foreground"
        />
      ))}
      {[15, 30, 45, 60].map((r) => (
        <circle
          key={r}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          className="text-foreground"
        />
      ))}
    </svg>
  )
}

export function GameBoard({ grid }: GameBoardProps) {
  const tiles = grid.flat().filter((t): t is Tile => t !== null)

  return (
    <div className="relative w-full max-w-[400px] aspect-square bg-card rounded-xl p-2 border-2 border-primary/30 shadow-2xl shadow-primary/20">
      <WebBackground />
      
      {/* Grid cells */}
      <div className="absolute inset-2 grid grid-cols-4 grid-rows-4 gap-2">
        {Array(16)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="bg-secondary/50 rounded-lg border border-border/50"
            />
          ))}
      </div>

      {/* Tiles */}
      <div className="absolute inset-2">
        {tiles.map((tile) => (
          <GameTile key={tile.id} tile={tile} />
        ))}
      </div>
    </div>
  )
}
