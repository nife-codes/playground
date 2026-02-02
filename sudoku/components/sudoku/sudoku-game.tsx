"use client"

import { useEffect } from "react"
import { GameProvider, useGame } from "./game-context"
import { ThemeProvider } from "./theme-provider"
import { ThemeToggle } from "./theme-toggle"
import { TopMenu } from "./top-menu"
import { SudokuBoard } from "./sudoku-board"
import { NumberPad } from "./number-pad"
import { GameControls } from "./game-controls"
import { GameHeader } from "./game-header"
import { GameSettings } from "./game-settings"
import { VictoryModal } from "./victory-modal"
import { GameOverModal } from "./game-over-modal"

function GameContent() {
  const { inputNumber, clearCell, toggleNotesMode, undo, togglePause, selectedCell, isPaused, isComplete } = useGame()

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
    <div className="min-h-screen bg-background">
      <TopMenu />
      
      <div className="flex flex-col items-center px-4 pt-20 pb-6 sm:pt-24 sm:pb-10">
        <div className="fixed top-20 right-4 z-40 sm:top-24">
          <ThemeToggle />
        </div>

        <h1 className="text-5xl sm:text-6xl font-serif text-primary mb-6">
          Sudoku
        </h1>

        <div className="mb-6 w-full max-w-md">
          <GameHeader />
        </div>

        <div className="mb-6">
          <GameSettings />
        </div>

        <div className="mb-6">
          <SudokuBoard />
        </div>

        <div className="mb-6">
          <GameControls />
        </div>

        <div className="mb-6">
          <NumberPad />
        </div>

        <div className="text-center text-sm text-muted-foreground mt-4 hidden sm:block">
          <p>Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">1-9</kbd> to enter numbers, <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">N</kbd> for notes, <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space</kbd> to pause</p>
        </div>

        <VictoryModal />
        <GameOverModal />
      </div>
    </div>
  )
}

export function SudokuGame() {
  return (
    <ThemeProvider>
      <GameProvider>
        <GameContent />
      </GameProvider>
    </ThemeProvider>
  )
}