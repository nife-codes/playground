"use client"

import React, { useEffect, useState } from "react"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

/**
 * Mobile swipe hint component
 * Shows swipe direction hints on mobile devices
 */
export function SwipeHint() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isMobile) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
      <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
        <p className="text-xs text-muted-foreground font-medium">Swipe to move</p>
        <div className="grid grid-cols-3 gap-1 w-12 h-12">
          {/* Top */}
          <div className="col-start-2 flex justify-center">
            <ArrowUp className="w-4 h-4 text-accent animate-bounce" />
          </div>
          {/* Left, Center, Right */}
          <div className="flex justify-center">
            <ArrowLeft className="w-4 h-4 text-accent" />
          </div>
          <div className="flex justify-center"></div>
          <div className="flex justify-center">
            <ArrowRight className="w-4 h-4 text-accent" />
          </div>
          {/* Bottom */}
          <div className="col-start-2 flex justify-center">
            <ArrowDown className="w-4 h-4 text-accent" />
          </div>
        </div>
      </div>
    </div>
  )
}
