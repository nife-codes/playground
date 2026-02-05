"use client"

import React from "react"
import { Undo2, Lightbulb, Pencil, Eraser, Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGame } from "./game-context"
import { useCoins } from "./coins-provider"

const HINT_COST = 10

export function GameControls() {
  const { 
    notesMode, 
    toggleNotesMode, 
    useHint, 
    undo, 
    clearCell,
    history,
    isPaused,
    isComplete 
  } = useGame()
  
  const { coins, spendCoins, hasEnoughCoins } = useCoins()

  const disabled = isPaused || isComplete
  const canAffordHint = hasEnoughCoins(HINT_COST)

  const handleHint = () => {
    if (!canAffordHint) return
    if (spendCoins(HINT_COST)) {
      useHint()
    }
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      <ControlButton
        icon={<Undo2 className="w-5 h-5" />}
        label="Undo"
        onClick={undo}
        disabled={disabled || history.length === 0}
      />
      <ControlButton
        icon={<Eraser className="w-5 h-5" />}
        label="Erase"
        onClick={clearCell}
        disabled={disabled}
      />
      <ControlButton
        icon={<Pencil className="w-5 h-5" />}
        label="Notes"
        onClick={toggleNotesMode}
        active={notesMode}
        disabled={disabled}
      />
      <ControlButton
        icon={
          <div className="relative">
            <Lightbulb className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 flex items-center gap-0.5 bg-accent text-accent-foreground rounded-full px-1 text-[10px] font-bold">
              <Coins className="w-2.5 h-2.5" />
              {HINT_COST}
            </div>
          </div>
        }
        label="Hint"
        onClick={handleHint}
        disabled={disabled || !canAffordHint}
      />
    </div>
  )
}

interface ControlButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
  disabled?: boolean
}

function ControlButton({ icon, label, onClick, active, disabled }: ControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center gap-1",
        "px-4 py-2 rounded-xl",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        active 
          ? "bg-primary text-primary-foreground shadow-lg"
          : "bg-card text-foreground hover:bg-muted shadow-md",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}