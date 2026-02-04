"use client"

import React from "react"
import { X, Keyboard, Smartphone, Lightbulb } from "lucide-react"

interface HelpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Play Sudoku</h2>
            <p className="text-sm text-muted-foreground">
              Fill the 9×9 grid with numbers 1-9
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <Keyboard className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Desktop Controls</h3>
                <p className="text-sm text-muted-foreground">
                  Press 1-9 to enter numbers. Press N for notes mode. Press Space to pause.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              <Smartphone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Mobile Controls</h3>
                <p className="text-sm text-muted-foreground">
                  Tap a cell, then tap a number from the number pad.
                </p>
              </div>
            </div>

            <div className="p-3 bg-primary/10 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Game Rules</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Each row must contain numbers 1-9 (no repeats)</li>
                <li>• Each column must contain numbers 1-9</li>
                <li>• Each 3×3 box must contain numbers 1-9</li>
                <li>• Wrong answers lose a heart (if enabled)</li>
                <li>• Use hints when you're stuck!</li>
              </ul>
            </div>

            <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
              <Lightbulb className="w-5 h-5 text-accent" />
              <p className="text-sm text-foreground">
                <strong>Pro tip:</strong> Use Notes mode to mark possible numbers before committing!
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}