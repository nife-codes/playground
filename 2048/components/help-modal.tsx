"use client"

import React from "react"
import { X, Keyboard, Smartphone } from "lucide-react"

interface HelpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Play</h2>
            <p className="text-sm text-muted-foreground">
              Combine tiles to reach 2048!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <Keyboard className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Desktop Controls</h3>
                <p className="text-sm text-muted-foreground">
                  Use arrow keys (↑ ↓ ← →) to move tiles in any direction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <Smartphone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Mobile Controls</h3>
                <p className="text-sm text-muted-foreground">
                  Swipe up, down, left, or right to move tiles.
                </p>
              </div>
            </div>

            <div className="p-3 bg-primary/10 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Game Rules</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Tiles slide in the direction you choose</li>
                <li>• When two tiles with the same number touch, they merge</li>
                <li>• After each move, a new tile (2 or 4) appears</li>
                <li>• Goal: Create a tile with the number 2048</li>
                <li>• Game ends when no moves are possible</li>
              </ul>
            </div>

            <div className="flex gap-2 items-center justify-center text-xs text-muted-foreground pt-2">
              <span className="inline-block w-3 h-3 bg-primary/50 rounded"></span>
              <span>Miles Morales (2-64)</span>
              <span className="inline-block w-3 h-3 bg-accent/50 rounded ml-2"></span>
              <span>Ghost Spider (128+)</span>
            </div>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}