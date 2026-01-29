"use client"

import React from "react"

import { useEffect, useRef, useCallback } from "react"
import { useGame2048 } from "../hooks/use-game-2048"
import { GameBoard } from "./game-board"
import { GameRating } from "./game-rating"
import { Button } from "./ui/button"
import { RotateCcw, Trophy, Zap } from "lucide-react"

function ScoreBox({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center p-3 bg-card rounded-lg border border-border/50 min-w-[80px]">
      <div className="flex items-center gap-1 text-xs text-muted-foreground uppercase tracking-wider mb-1">
        <Icon className="w-3 h-3" />
        <span>{label}</span>
      </div>
      <span className="text-xl sm:text-2xl font-black text-foreground">{value}</span>
    </div>
  )
}

function GameOverlay({
  type,
  onRestart,
  onContinue,
}: {
  type: "win" | "lose"
  onRestart: () => void
  onContinue?: () => void
}) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm rounded-xl">
      <h2
        className={`text-3xl sm:text-4xl font-black mb-4 ${
          type === "win" ? "text-accent" : "text-primary"
        }`}
      >
        {type === "win" ? "You Win!" : "Game Over!"}
      </h2>
      <p className="text-muted-foreground mb-6 text-center px-4">
        {type === "win"
          ? "Amazing! You've unlocked the Spider-Verse!"
          : "The web has tangled. Try again!"}
      </p>
      <div className="flex gap-3">
        <Button onClick={onRestart} variant="outline" className="gap-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          Restart
        </Button>
        {type === "win" && onContinue && (
          <Button onClick={onContinue} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            Keep Playing
          </Button>
        )}
      </div>
    </div>
  )
}

function SpiderLogo() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-16 sm:h-16 text-primary">
      <ellipse cx="50" cy="40" rx="20" ry="15" fill="currentColor" />
      <ellipse cx="50" cy="60" rx="25" ry="20" fill="currentColor" />
      {/* Legs */}
      {[
        "M25 45 Q5 30 0 20",
        "M25 50 Q0 45 -5 55",
        "M25 55 Q5 70 0 80",
        "M25 60 Q10 80 5 95",
        "M75 45 Q95 30 100 20",
        "M75 50 Q100 45 105 55",
        "M75 55 Q95 70 100 80",
        "M75 60 Q90 80 95 95",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

export function SpiderGame() {
  const {
    grid,
    score,
    bestScore,
    gameOver,
    won,
    handleMove,
    restart,
    continueGame,
  } = useGame2048()

  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
        const direction = e.key.replace("Arrow", "").toLowerCase() as "up" | "down" | "left" | "right"
        handleMove(direction)
        playMoveSound()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleMove])

  // Touch controls
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y
      const minSwipe = 30

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipe) {
          handleMove(deltaX > 0 ? "right" : "left")
          playMoveSound()
        }
      } else {
        if (Math.abs(deltaY) > minSwipe) {
          handleMove(deltaY > 0 ? "down" : "up")
          playMoveSound()
        }
      }

      touchStartRef.current = null
    },
    [handleMove]
  )

  // Simple sound effect using Web Audio API
  const playMoveSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(400 + Math.random() * 200, audioContext.currentTime)
      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch {
      // Audio not supported
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <SpiderLogo />
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight text-balance">
            Spider-Verse 2048
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Merge tiles to unlock the multiverse!
          </p>
        </div>
      </div>

      {/* Scores and Controls */}
      <div className="flex items-center gap-3 w-full justify-center flex-wrap">
        <ScoreBox label="Score" value={score} icon={Zap} />
        <ScoreBox label="Best" value={bestScore} icon={Trophy} />
        <Button
          onClick={restart}
          variant="outline"
          size="sm"
          className="gap-2 border-primary/50 text-primary hover:bg-primary/10 bg-transparent"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">New Game</span>
        </Button>
      </div>

      {/* Game Board */}
      <div className="relative w-full flex justify-center">
        <GameBoard grid={grid} />
        {gameOver && <GameOverlay type="lose" onRestart={restart} />}
        {won && !gameOver && (
          <GameOverlay type="win" onRestart={restart} onContinue={continueGame} />
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Use arrow keys or swipe to move tiles</p>
        <p className="flex items-center justify-center gap-2">
          <span className="inline-block w-3 h-3 bg-primary/50 rounded" /> Miles Morales (2-64)
          <span className="inline-block w-3 h-3 bg-accent/50 rounded" /> Ghost Spider (128+)
        </p>
      </div>

      {/* Rating */}
      <GameRating />
    </div>
  )
}
