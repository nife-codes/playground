"use client"

import React, { useState } from "react"

interface HelpTooltipProps {
  children: React.ReactElement
}

export function HelpTooltip({ children }: HelpTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
      
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-64 p-3 bg-card border border-border rounded-lg shadow-lg">
          <div className="text-sm space-y-2">
            <p className="font-semibold text-foreground">How to Play</p>
            <p className="text-muted-foreground">
              Use arrow keys or swipe to move tiles. When two tiles with the same number touch, they merge into one!
            </p>
            <p className="text-muted-foreground">
              Goal: Reach 2048!
            </p>
          </div>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-border"></div>
        </div>
      )}
    </div>
  )
}