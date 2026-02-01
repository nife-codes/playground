export type Difficulty = 'easy' | 'medium' | 'hard'
export type CellValue = number | null
export type NotesValue = Set<number>

export interface Cell {
  value: CellValue
  isOriginal: boolean
  notes: NotesValue
}

export type Board = Cell[][]
export type SolutionBoard = number[][]

// Generate a complete valid Sudoku solution
function generateSolution(): SolutionBoard {
  const board: SolutionBoard = Array(9).fill(null).map(() => Array(9).fill(0))
  fillBoard(board)
  return board
}

function fillBoard(board: SolutionBoard): boolean {
  const emptyCell = findEmptyCell(board)
  if (!emptyCell) return true

  const [row, col] = emptyCell
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])

  for (const num of numbers) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num
      if (fillBoard(board)) return true
      board[row][col] = 0
    }
  }

  return false
}

function findEmptyCell(board: SolutionBoard): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) return [row, col]
    }
  }
  return null
}

function isValidPlacement(board: SolutionBoard, row: number, col: number, num: number): boolean {
  // Check row
  if (board[row].includes(num)) return false

  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false
    }
  }

  return true
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Generate a puzzle by removing numbers from a complete solution
export function generatePuzzle(difficulty: Difficulty): { puzzle: Board; solution: SolutionBoard } {
  const solution = generateSolution()
  const puzzle: Board = solution.map(row =>
    row.map(value => ({
      value,
      isOriginal: true,
      notes: new Set<number>()
    }))
  )

  const cellsToRemove = {
    easy: 35,
    medium: 45,
    hard: 55
  }[difficulty]

  const positions = shuffleArray(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9] as [number, number])
  )

  let removed = 0
  for (const [row, col] of positions) {
    if (removed >= cellsToRemove) break
    puzzle[row][col] = { value: null, isOriginal: false, notes: new Set<number>() }
    removed++
  }

  return { puzzle, solution }
}

// Check if a move is valid (doesn't conflict with existing numbers)
export function isValidMove(board: Board, row: number, col: number, value: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c].value === value) return false
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col].value === value) return false
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c].value === value) return false
    }
  }

  return true
}

// Check if puzzle is complete
export function isPuzzleComplete(board: Board): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) return false
    }
  }
  return true
}

// Get all cells that have the same value
export function getHighlightedCells(board: Board, selectedValue: number | null): Set<string> {
  if (selectedValue === null) return new Set()
  
  const highlighted = new Set<string>()
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === selectedValue) {
        highlighted.add(`${row}-${col}`)
      }
    }
  }
  return highlighted
}

// Get related cells (same row, column, or box)
export function getRelatedCells(row: number, col: number): Set<string> {
  const related = new Set<string>()
  
  // Same row
  for (let c = 0; c < 9; c++) {
    related.add(`${row}-${c}`)
  }
  
  // Same column
  for (let r = 0; r < 9; r++) {
    related.add(`${r}-${col}`)
  }
  
  // Same box
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      related.add(`${r}-${c}`)
    }
  }
  
  return related
}

// Serialize board for localStorage
export function serializeBoard(board: Board): string {
  return JSON.stringify(
    board.map(row =>
      row.map(cell => ({
        value: cell.value,
        isOriginal: cell.isOriginal,
        notes: Array.from(cell.notes)
      }))
    )
  )
}

// Deserialize board from localStorage
export function deserializeBoard(data: string): Board {
  const parsed = JSON.parse(data)
  return parsed.map((row: { value: CellValue; isOriginal: boolean; notes: number[] }[]) =>
    row.map(cell => ({
      value: cell.value,
      isOriginal: cell.isOriginal,
      notes: new Set(cell.notes)
    }))
  )
}

// Find a hint (a cell that can be filled)
export function findHint(board: Board, solution: SolutionBoard): [number, number] | null {
  const emptyCells: [number, number][] = []
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) {
        emptyCells.push([row, col])
      }
    }
  }
  
  if (emptyCells.length === 0) return null
  
  return emptyCells[Math.floor(Math.random() * emptyCells.length)]
}
