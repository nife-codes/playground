"use client"

import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface HelpTooltipProps {
  children: React.ReactNode
}

export function HelpTooltip({ children }: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs text-sm space-y-2 p-4 bg-card border-border/50">
          <div className="font-semibold text-foreground">How to Play</div>
          <div className="space-y-1 text-muted-foreground text-xs">
            <p><strong>Objective:</strong> Merge tiles to reach 2048 and unlock the Spider-Verse!</p>
            <p><strong>Controls:</strong> Use arrow keys or swipe to move tiles in any direction.</p>
            <p><strong>Merging:</strong> When two tiles with the same number touch, they merge into one with their sum.</p>
            <p><strong>Spider-Verse:</strong> Miles Morales (red) tiles are 2-64, Ghost Spider (pink) tiles are 128+.</p>
            <p><strong>Game Over:</strong> When no moves are left, the game ends.</p>
            <p><strong>Scoring:</strong> Each merge adds the resulting tile's value to your score.</p>
            <p><strong>Best Score:</strong> Automatically saved - try to beat your personal best!</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
