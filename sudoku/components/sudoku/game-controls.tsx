"use client"

import React from "react"

import { Undo2, Lightbulb, Pencil, Eraser } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGame } from "./game-context"

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

  const disabled = isPaused || isComplete

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
        icon={<Lightbulb className="w-5 h-5" />}
        label="Hint"
        onClick={useHint}
        disabled={disabled}
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
