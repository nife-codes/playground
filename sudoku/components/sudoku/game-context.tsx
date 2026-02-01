"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import {
  generatePuzzle,
  isValidMove,
  isPuzzleComplete,
  serializeBoard,
  deserializeBoard,
  findHint,
  type Board,
  type Difficulty,
  type SolutionBoard
} from '@/lib/sudoku'

interface MoveHistory {
  row: number
  col: number
  previousValue: number | null
  previousNotes: Set<number>
  newValue: number | null
  newNotes: Set<number>
}

interface GameState {
  board: Board
  solution: SolutionBoard
  difficulty: Difficulty
  selectedCell: [number, number] | null
  notesMode: boolean
  hearts: number
  maxHearts: number
  heartsEnabled: boolean
  mistakes: number
  time: number
  isPaused: boolean
  isComplete: boolean
  history: MoveHistory[]
}

interface GameContextType extends GameState {
  selectCell: (row: number, col: number) => void
  inputNumber: (num: number) => void
  clearCell: () => void
  toggleNotesMode: () => void
  toggleHeartsEnabled: () => void
  useHint: () => void
  undo: () => void
  newGame: (difficulty: Difficulty) => void
  togglePause: () => void
  resetGame: () => void
}

const GameContext = createContext<GameContextType | null>(null)

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

interface GameProviderProps {
  children: ReactNode
}

export function GameProvider({ children }: GameProviderProps) {
  const [board, setBoard] = useState<Board>([])
  const [solution, setSolution] = useState<SolutionBoard>([])
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [notesMode, setNotesMode] = useState(false)
  const [hearts, setHearts] = useState(5)
  const [maxHearts] = useState(5)
  const [heartsEnabled, setHeartsEnabled] = useState(true)
  const [mistakes, setMistakes] = useState(0)
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [history, setHistory] = useState<MoveHistory[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize game
  useEffect(() => {
    const savedGame = localStorage.getItem('sudoku-game')
    if (savedGame) {
      try {
        const data = JSON.parse(savedGame)
        setBoard(deserializeBoard(data.board))
        setSolution(data.solution)
        setDifficulty(data.difficulty)
        setHearts(data.hearts)
        setHeartsEnabled(data.heartsEnabled)
        setMistakes(data.mistakes)
        setTime(data.time)
        setIsComplete(data.isComplete)
      } catch {
        startNewGame('easy')
      }
    } else {
      startNewGame('easy')
    }
    setIsInitialized(true)
  }, [])

  // Save game to localStorage
  useEffect(() => {
    if (!isInitialized || board.length === 0) return
    
    localStorage.setItem('sudoku-game', JSON.stringify({
      board: serializeBoard(board),
      solution,
      difficulty,
      hearts,
      heartsEnabled,
      mistakes,
      time,
      isComplete
    }))
  }, [board, solution, difficulty, hearts, heartsEnabled, mistakes, time, isComplete, isInitialized])

  // Timer
  useEffect(() => {
    if (!isInitialized || isPaused || isComplete || board.length === 0) return
    
    const interval = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isPaused, isComplete, isInitialized, board.length])

  // Save best times
  useEffect(() => {
    if (!isComplete || !isInitialized) return
    
    const bestTimes = JSON.parse(localStorage.getItem('sudoku-best-times') || '{}')
    const currentBest = bestTimes[difficulty]
    
    if (!currentBest || time < currentBest) {
      bestTimes[difficulty] = time
      localStorage.setItem('sudoku-best-times', JSON.stringify(bestTimes))
    }
  }, [isComplete, time, difficulty, isInitialized])

  const startNewGame = useCallback((diff: Difficulty) => {
    const { puzzle, solution: newSolution } = generatePuzzle(diff)
    setBoard(puzzle)
    setSolution(newSolution)
    setDifficulty(diff)
    setSelectedCell(null)
    setNotesMode(false)
    setHearts(5)
    setMistakes(0)
    setTime(0)
    setIsPaused(false)
    setIsComplete(false)
    setHistory([])
  }, [])

  const selectCell = useCallback((row: number, col: number) => {
    if (isPaused || isComplete) return
    setSelectedCell([row, col])
  }, [isPaused, isComplete])

  const inputNumber = useCallback((num: number) => {
    if (!selectedCell || isPaused || isComplete) return
    
    const [row, col] = selectedCell
    const cell = board[row][col]
    
    if (cell.isOriginal) return

    const newBoard = board.map(r => r.map(c => ({ ...c, notes: new Set(c.notes) })))
    const previousValue = cell.value
    const previousNotes = new Set(cell.notes)

    if (notesMode) {
      // Toggle note
      if (newBoard[row][col].notes.has(num)) {
        newBoard[row][col].notes.delete(num)
      } else {
        newBoard[row][col].notes.add(num)
      }
      newBoard[row][col].value = null

      setHistory(h => [...h, {
        row,
        col,
        previousValue,
        previousNotes,
        newValue: null,
        newNotes: new Set(newBoard[row][col].notes)
      }])
    } else {
      // Place number
      const isCorrect = solution[row][col] === num
      
      if (!isCorrect) {
        // Wrong answer
        if (heartsEnabled) {
          setHearts(h => Math.max(0, h - 1))
        }
        setMistakes(m => m + 1)
        
        // Still place the number but mark it visually
        newBoard[row][col].value = num
        newBoard[row][col].notes.clear()
      } else {
        newBoard[row][col].value = num
        newBoard[row][col].notes.clear()
        
        // Remove this number from notes in related cells
        const boxRow = Math.floor(row / 3) * 3
        const boxCol = Math.floor(col / 3) * 3
        
        for (let r = 0; r < 9; r++) {
          newBoard[r][col].notes.delete(num)
        }
        for (let c = 0; c < 9; c++) {
          newBoard[row][c].notes.delete(num)
        }
        for (let r = boxRow; r < boxRow + 3; r++) {
          for (let c = boxCol; c < boxCol + 3; c++) {
            newBoard[r][c].notes.delete(num)
          }
        }
      }

      setHistory(h => [...h, {
        row,
        col,
        previousValue,
        previousNotes,
        newValue: num,
        newNotes: new Set()
      }])
    }

    setBoard(newBoard)

    // Check completion
    if (isPuzzleComplete(newBoard)) {
      // Verify all answers are correct
      let allCorrect = true
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (newBoard[r][c].value !== solution[r][c]) {
            allCorrect = false
            break
          }
        }
        if (!allCorrect) break
      }
      if (allCorrect) {
        setIsComplete(true)
      }
    }
  }, [selectedCell, board, solution, notesMode, isPaused, isComplete, heartsEnabled])

  const clearCell = useCallback(() => {
    if (!selectedCell || isPaused || isComplete) return
    
    const [row, col] = selectedCell
    const cell = board[row][col]
    
    if (cell.isOriginal) return

    const newBoard = board.map(r => r.map(c => ({ ...c, notes: new Set(c.notes) })))
    
    setHistory(h => [...h, {
      row,
      col,
      previousValue: cell.value,
      previousNotes: new Set(cell.notes),
      newValue: null,
      newNotes: new Set()
    }])

    newBoard[row][col].value = null
    newBoard[row][col].notes.clear()
    setBoard(newBoard)
  }, [selectedCell, board, isPaused, isComplete])

  const toggleNotesMode = useCallback(() => {
    setNotesMode(n => !n)
  }, [])

  const toggleHeartsEnabled = useCallback(() => {
    setHeartsEnabled(h => !h)
  }, [])

  const useHint = useCallback(() => {
    if (isPaused || isComplete || board.length === 0) return
    
    const hintCell = findHint(board, solution)
    if (!hintCell) return
    
    const [row, col] = hintCell
    const newBoard = board.map(r => r.map(c => ({ ...c, notes: new Set(c.notes) })))
    
    setHistory(h => [...h, {
      row,
      col,
      previousValue: board[row][col].value,
      previousNotes: new Set(board[row][col].notes),
      newValue: solution[row][col],
      newNotes: new Set()
    }])

    newBoard[row][col].value = solution[row][col]
    newBoard[row][col].notes.clear()
    setBoard(newBoard)
    setSelectedCell([row, col])

    // Check completion
    if (isPuzzleComplete(newBoard)) {
      setIsComplete(true)
    }
  }, [board, solution, isPaused, isComplete])

  const undo = useCallback(() => {
    if (history.length === 0 || isPaused || isComplete) return
    
    const lastMove = history[history.length - 1]
    const newBoard = board.map(r => r.map(c => ({ ...c, notes: new Set(c.notes) })))
    
    newBoard[lastMove.row][lastMove.col].value = lastMove.previousValue
    newBoard[lastMove.row][lastMove.col].notes = new Set(lastMove.previousNotes)
    
    setBoard(newBoard)
    setHistory(h => h.slice(0, -1))
    setSelectedCell([lastMove.row, lastMove.col])
  }, [history, board, isPaused, isComplete])

  const togglePause = useCallback(() => {
    setIsPaused(p => !p)
  }, [])

  const resetGame = useCallback(() => {
    startNewGame(difficulty)
  }, [difficulty, startNewGame])

  const value: GameContextType = {
    board,
    solution,
    difficulty,
    selectedCell,
    notesMode,
    hearts,
    maxHearts,
    heartsEnabled,
    mistakes,
    time,
    isPaused,
    isComplete,
    history,
    selectCell,
    inputNumber,
    clearCell,
    toggleNotesMode,
    toggleHeartsEnabled,
    useHint,
    undo,
    newGame: startNewGame,
    togglePause,
    resetGame
  }

  if (!isInitialized) {
    return null
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
