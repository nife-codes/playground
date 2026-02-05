"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark"
type ColorTheme = "pink" | "blue" | "purple" | "green" | "orange" | "red"

interface ThemeContextType {
  theme: Theme
  colorTheme: ColorTheme
  toggleTheme: () => void
  setColorTheme: (color: ColorTheme) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

const colorThemes = {
  pink: {
    light: {
      primary: "oklch(0.72 0.15 330)",
      accent: "oklch(0.78 0.12 200)",
      secondary: "oklch(0.85 0.08 260)",
    },
    dark: {
      primary: "oklch(0.75 0.18 330)",
      accent: "oklch(0.65 0.15 320)",
      secondary: "oklch(0.70 0.12 280)",
    }
  },
  blue: {
    light: {
      primary: "oklch(0.60 0.20 240)",
      accent: "oklch(0.70 0.18 220)",
      secondary: "oklch(0.80 0.12 250)",
    },
    dark: {
      primary: "oklch(0.65 0.22 240)",
      accent: "oklch(0.60 0.20 220)",
      secondary: "oklch(0.70 0.15 250)",
    }
  },
  purple: {
    light: {
      primary: "oklch(0.65 0.22 290)",
      accent: "oklch(0.70 0.18 270)",
      secondary: "oklch(0.80 0.12 280)",
    },
    dark: {
      primary: "oklch(0.68 0.24 290)",
      accent: "oklch(0.65 0.20 270)",
      secondary: "oklch(0.72 0.15 280)",
    }
  },
  green: {
    light: {
      primary: "oklch(0.65 0.18 150)",
      accent: "oklch(0.70 0.15 130)",
      secondary: "oklch(0.80 0.10 160)",
    },
    dark: {
      primary: "oklch(0.68 0.20 150)",
      accent: "oklch(0.65 0.18 130)",
      secondary: "oklch(0.72 0.12 160)",
    }
  },
  orange: {
    light: {
      primary: "oklch(0.70 0.18 40)",
      accent: "oklch(0.75 0.16 30)",
      secondary: "oklch(0.82 0.12 50)",
    },
    dark: {
      primary: "oklch(0.72 0.20 40)",
      accent: "oklch(0.68 0.18 30)",
      secondary: "oklch(0.75 0.14 50)",
    }
  },
  red: {
    light: {
      primary: "oklch(0.65 0.22 20)",
      accent: "oklch(0.70 0.18 10)",
      secondary: "oklch(0.80 0.12 30)",
    },
    dark: {
      primary: "oklch(0.68 0.24 20)",
      accent: "oklch(0.65 0.20 10)",
      secondary: "oklch(0.72 0.15 30)",
    }
  }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light")
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("pink")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("sudoku-theme") as Theme | null
    const savedColorTheme = localStorage.getItem("sudoku-color-theme") as ColorTheme | null
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
    
    if (savedColorTheme) {
      setColorThemeState(savedColorTheme)
    }
    
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    
    const colors = colorThemes[colorTheme][theme]
    root.style.setProperty('--primary', colors.primary)
    root.style.setProperty('--accent', colors.accent)
    root.style.setProperty('--secondary', colors.secondary)
    
    localStorage.setItem("sudoku-theme", theme)
    localStorage.setItem("sudoku-color-theme", colorTheme)
  }, [theme, colorTheme, mounted])

  const toggleTheme = () => {
    setTheme(t => t === "light" ? "dark" : "light")
  }

  const setColorTheme = (color: ColorTheme) => {
    setColorThemeState(color)
  }

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, toggleTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}