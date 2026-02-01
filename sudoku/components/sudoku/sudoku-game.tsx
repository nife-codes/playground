"use client"

import { useEffect } from "react"
import { GameProvider, useGame } from "./game-context"
import { SudokuBoard } from "./sudoku-board"
import { NumberPad } from "./number-pad"
import { GameControls } from "./game-controls"
import { GameHeader } from "./game-header"
import { GameSettings } from "./game-settings"
import { VictoryModal } from "./victory-modal"

function GameContent() {
  const { inputNumber, clearCell, toggleNotesMode, undo, togglePause, selectedCell, isPaused, isComplete } = useGame()

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused || isComplete) {
        if (e.key === ' ' || e.key === 'Escape') {
          e.preventDefault()
          togglePause()
        }
        return
      }

      if (e.key >= '1' && e.key <= '9') {
        inputNumber(parseInt(e.key))
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        clearCell()
      } else if (e.key === 'n' || e.key === 'N') {
        toggleNotesMode()
      } else if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        undo()
      } else if (e.key === ' ') {
        e.preventDefault()
        togglePause()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inputNumber, clearCell, toggleNotesMode, undo, togglePause, isPaused, isComplete])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6 sm:py-10">
      {/* Title */}
      <h1 className="text-5xl sm:text-6xl font-serif text-primary mb-6">
        Sudoku
      </h1>

      {/* Game Header (Hearts + Timer) */}
      <div className="mb-6 w-full max-w-md">
        <GameHeader />
      </div>

      {/* Settings */}
      <div className="mb-6">
        <GameSettings />
      </div>

      {/* Sudoku Board */}
      <div className="mb-6">
        <SudokuBoard />
      </div>

      {/* Game Controls */}
      <div className="mb-6">
        <GameControls />
      </div>

      {/* Number Pad */}
      <div className="mb-6">
        <NumberPad />
      </div>

      {/* Keyboard hints */}
      <div className="text-center text-sm text-muted-foreground mt-4 hidden sm:block">
        <p>Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">1-9</kbd> to enter numbers, <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">N</kbd> for notes, <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space</kbd> to pause</p>
      </div>

      {/* Victory Modal */}
      <VictoryModal />
    </div>
  )
}

export function SudokuGame() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  )
}
