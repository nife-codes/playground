"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface CoinsContextType {
  coins: number
  spendCoins: (amount: number) => boolean
  earnCoins: (amount: number) => void
  hasEnoughCoins: (amount: number) => boolean
}

const CoinsContext = createContext<CoinsContextType | null>(null)

export function useCoins() {
  const context = useContext(CoinsContext)
  if (!context) {
    throw new Error("useCoins must be used within CoinsProvider")
  }
  return context
}

interface CoinsProviderProps {
  children: ReactNode
}

export function CoinsProvider({ children }: CoinsProviderProps) {
  const [coins, setCoins] = useState(100)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedCoins = localStorage.getItem("sudoku-coins")
    if (savedCoins) {
      setCoins(Number.parseInt(savedCoins, 10))
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem("sudoku-coins", coins.toString())
  }, [coins, isInitialized])

  const spendCoins = useCallback((amount: number) => {
    if (coins < amount) return false
    setCoins(c => c - amount)
    return true
  }, [coins])

  const earnCoins = useCallback((amount: number) => {
    setCoins(c => c + amount)
  }, [])

  const hasEnoughCoins = useCallback((amount: number) => {
    return coins >= amount
  }, [coins])

  if (!isInitialized) {
    return null
  }

  return (
    <CoinsContext.Provider value={{ coins, spendCoins, earnCoins, hasEnoughCoins }}>
      {children}
    </CoinsContext.Provider>
  )
}