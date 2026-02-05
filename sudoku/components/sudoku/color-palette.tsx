"use client"

import { Palette, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "./theme-provider"
import { useState } from "react"

type ColorTheme = "pink" | "blue" | "purple" | "green" | "orange" | "red"

const colors: { name: ColorTheme; label: string; preview: string }[] = [
  { name: "pink", label: "Pink", preview: "bg-[#e879f9]" },
  { name: "blue", label: "Blue", preview: "bg-[#60a5fa]" },
  { name: "purple", label: "Purple", preview: "bg-[#c084fc]" },
  { name: "green", label: "Green", preview: "bg-[#4ade80]" },
  { name: "orange", label: "Orange", preview: "bg-[#fb923c]" },
  { name: "red", label: "Red", preview: "bg-[#f87171]" },
]

export function ColorPalette() {
  const { colorTheme, setColorTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "p-2 rounded-full transition-all duration-200",
          "bg-card shadow-md hover:shadow-lg",
          "focus:outline-none focus:ring-2 focus:ring-primary"
        )}
        aria-label="Change color theme"
      >
        <Palette className="w-5 h-5 text-foreground" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg shadow-lg max-w-sm w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Color</h2>
                <p className="text-sm text-muted-foreground">
                  Pick a color theme that suits your style
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setColorTheme(color.name)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-lg transition-all",
                      "hover:bg-muted",
                      colorTheme === color.name && "bg-muted ring-2 ring-primary"
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full shadow-md",
                        color.preview
                      )}
                    />
                    <span className="text-xs font-medium text-foreground">
                      {color.label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}