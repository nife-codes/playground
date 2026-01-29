"use client"

import { useState, useCallback, useEffect } from "react"

export interface Tile {
  id: number
  value: number
  row: number
  col: number
  isNew: boolean
  isMerged: boolean
}

type Direction = "up" | "down" | "left" | "right"

let tileIdCounter = 0

function getNewTileId() {
  return ++tileIdCounter
}

function createEmptyGrid(): (Tile | null)[][] {
  return Array(4)
    .fill(null)
    .map(() => Array(4).fill(null))
}

function getEmptyPositions(grid: (Tile | null)[][]): { row: number; col: number }[] {
  const positions: { row: number; col: number }[] = []
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (!grid[row][col]) {
        positions.push({ row, col })
      }
    }
  }
  return positions
}

function addRandomTile(grid: (Tile | null)[][]): (Tile | null)[][] {
  const emptyPositions = getEmptyPositions(grid)
  if (emptyPositions.length === 0) return grid

  const newGrid = grid.map((row) => [...row])
  const { row, col } = emptyPositions[Math.floor(Math.random() * emptyPositions.length)]
  newGrid[row][col] = {
    id: getNewTileId(),
    value: Math.random() < 0.9 ? 2 : 4,
    row,
    col,
    isNew: true,
    isMerged: false,
  }
  return newGrid
}

function initializeGrid(): (Tile | null)[][] {
  let grid = createEmptyGrid()
  grid = addRandomTile(grid)
  grid = addRandomTile(grid)
  return grid
}

function rotateGrid(grid: (Tile | null)[][]): (Tile | null)[][] {
  const newGrid = createEmptyGrid()
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const tile = grid[row][col]
      if (tile) {
        newGrid[col][3 - row] = { ...tile, row: col, col: 3 - row }
      }
    }
  }
  return newGrid
}

function slideLeft(grid: (Tile | null)[][]): { grid: (Tile | null)[][]; score: number; moved: boolean } {
  let score = 0
  let moved = false
  const newGrid = createEmptyGrid()

  for (let row = 0; row < 4; row++) {
    const tiles = grid[row].filter((t) => t !== null) as Tile[]
    const merged: Tile[] = []

    for (let i = 0; i < tiles.length; i++) {
      if (i < tiles.length - 1 && tiles[i].value === tiles[i + 1].value) {
        const newValue = tiles[i].value * 2
        score += newValue
        merged.push({
          id: getNewTileId(),
          value: newValue,
          row,
          col: merged.length,
          isNew: false,
          isMerged: true,
        })
        i++
        moved = true
      } else {
        const newCol = merged.length
        if (tiles[i].col !== newCol) moved = true
        merged.push({
          ...tiles[i],
          row,
          col: newCol,
          isNew: false,
          isMerged: false,
        })
      }
    }

    for (let col = 0; col < merged.length; col++) {
      newGrid[row][col] = merged[col]
    }
  }

  return { grid: newGrid, score, moved }
}

function move(grid: (Tile | null)[][], direction: Direction): { grid: (Tile | null)[][]; score: number; moved: boolean } {
  let rotatedGrid = grid.map((row) =>
    row.map((tile) => (tile ? { ...tile, isNew: false, isMerged: false } : null))
  )

  const rotations: Record<Direction, number> = {
    left: 0,
    up: 1,
    right: 2,
    down: 3,
  }

  for (let i = 0; i < rotations[direction]; i++) {
    rotatedGrid = rotateGrid(rotatedGrid)
  }

  const result = slideLeft(rotatedGrid)

  for (let i = 0; i < (4 - rotations[direction]) % 4; i++) {
    result.grid = rotateGrid(result.grid)
  }

  return result
}

function canMove(grid: (Tile | null)[][]): boolean {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (!grid[row][col]) return true
      const value = grid[row][col]!.value
      if (col < 3 && grid[row][col + 1]?.value === value) return true
      if (row < 3 && grid[row + 1]?.[col]?.value === value) return true
    }
  }
  return false
}

function hasWon(grid: (Tile | null)[][]): boolean {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col]?.value === 2048) return true
    }
  }
  return false
}

export function useGame2048() {
  const [grid, setGrid] = useState<(Tile | null)[][]>(() => initializeGrid())
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [keepPlaying, setKeepPlaying] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("spider2048-best")
    if (saved) setBestScore(Number.parseInt(saved, 10))
  }, [])

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem("spider2048-best", score.toString())
    }
  }, [score, bestScore])

  const handleMove = useCallback(
    (direction: Direction) => {
      if (gameOver || (won && !keepPlaying)) return

      const result = move(grid, direction)
      if (result.moved) {
        const newGrid = addRandomTile(result.grid)
        setGrid(newGrid)
        setScore((s: number) => s + result.score)

        if (!keepPlaying && hasWon(newGrid)) {
          setWon(true)
        } else if (!canMove(newGrid)) {
          setGameOver(true)
        }
      }
    },
    [grid, gameOver, won, keepPlaying]
  )

  const restart = useCallback(() => {
    tileIdCounter = 0
    setGrid(initializeGrid())
    setScore(0)
    setGameOver(false)
    setWon(false)
    setKeepPlaying(false)
  }, [])

  const continueGame = useCallback(() => {
    setKeepPlaying(true)
    setWon(false)
  }, [])

  return {
    grid,
    score,
    bestScore,
    gameOver,
    won,
    handleMove,
    restart,
    continueGame,
  }
}
