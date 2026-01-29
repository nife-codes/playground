"use client"

import type { Tile } from "@/hooks/use-game-2048"
import { cn } from "@/lib/utils"

interface GameTileProps {
  tile: Tile
}

// Miles Morales themed (lower values) and Ghost Spider themed (higher values)
const tileStyles: Record<number, { bg: string; text: string; character: "miles" | "ghost" }> = {
  2: { bg: "bg-[#1a1a2e]", text: "text-red-400", character: "miles" },
  4: { bg: "bg-[#2d1b1b]", text: "text-red-300", character: "miles" },
  8: { bg: "bg-[#4a1515]", text: "text-white", character: "miles" },
  16: { bg: "bg-[#6b1c1c]", text: "text-white", character: "miles" },
  32: { bg: "bg-[#8b2020]", text: "text-white", character: "miles" },
  64: { bg: "bg-[#c42c2c]", text: "text-white", character: "miles" },
  128: { bg: "bg-[#2a2a3a]", text: "text-pink-300", character: "ghost" },
  256: { bg: "bg-[#3d2d4a]", text: "text-pink-200", character: "ghost" },
  512: { bg: "bg-[#4a3d5a]", text: "text-cyan-300", character: "ghost" },
  1024: { bg: "bg-[#5a4d6a]", text: "text-cyan-200", character: "ghost" },
  2048: { bg: "bg-gradient-to-br from-pink-500 via-cyan-400 to-white", text: "text-black", character: "ghost" },
}

function WebPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Radial lines */}
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <line
          key={angle}
          x1="50"
          y1="50"
          x2={50 + 50 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 50 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="0.5"
        />
      ))}
      {/* Concentric arcs */}
      {[20, 35, 50].map((r) => (
        <circle
          key={r}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
      ))}
    </svg>
  )
}

function MilesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Miles Morales Spider Eyes - angular, sharp shape */}
      <path d="M2 8 L6 6 L10 10 L8 14 L2 12 Z" />
      <path d="M22 8 L18 6 L14 10 L16 14 L22 12 Z" />
    </svg>
  )
}

function GhostIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9v12l2.5-1.5L10 21l2-1.5L14 21l2.5-1.5L19 21V9c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5v8.17l-.5-.3-2.5 1.5-2-1.5-2 1.5-2.5-1.5-.5.3V9c0-2.76 2.24-5 5-5z" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <path d="M12 14c-1.1 0-2 .45-2 1s.9 1 2 1 2-.45 2-1-.9-1-2-1z" />
    </svg>
  )
}

export function GameTile({ tile }: GameTileProps) {
  const style = tileStyles[tile.value] || tileStyles[2048]
  const CharacterIcon = style.character === "miles" ? MilesIcon : GhostIcon

  return (
    <div
      className={cn(
        "absolute flex flex-col items-center justify-center rounded-lg font-bold transition-all duration-100 ease-out overflow-hidden border-2",
        style.bg,
        style.text,
        tile.isNew && "animate-pop-in",
        tile.isMerged && "animate-merge",
        style.character === "miles" ? "border-red-600/30" : "border-pink-400/30"
      )}
      style={{
        width: "calc(25% - 8px)",
        height: "calc(25% - 8px)",
        left: `calc(${tile.col * 25}% + 4px)`,
        top: `calc(${tile.row * 25}% + 4px)`,
      }}
    >
      <WebPattern />
      <CharacterIcon className="w-5 h-5 sm:w-6 sm:h-6 opacity-60 relative z-10" />
      <span className="text-lg sm:text-xl md:text-2xl font-black relative z-10 drop-shadow-lg">
        {tile.value}
      </span>
    </div>
  )
}
