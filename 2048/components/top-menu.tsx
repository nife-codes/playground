"use client"

import React, { useState } from "react"
import { Menu, X, Github, Star, AlertCircle, HelpCircle } from "lucide-react"
import { Button } from "./ui/button"
import { RatingModal } from "./rating-modal"
import { HelpTooltip } from "./help-tooltip"

export function TopMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [showRating, setShowRating] = useState(false)

  const handleGithubClick = () => {
    window.open("https://github.com/nife-codes/playground", "_blank")
  }

  const handleReportClick = () => {
    window.open("https://github.com/nife-codes/playground/issues/new", "_blank")
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-lg sm:text-xl font-black text-primary">2048</div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <HelpTooltip>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-xs hover:bg-primary/10"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </Button>
            </HelpTooltip>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRating(true)}
              className="gap-2 text-xs hover:bg-accent/10"
            >
              <Star className="w-4 h-4" />
              <span>Rate us</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReportClick}
              className="gap-2 text-xs hover:bg-destructive/10"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Report</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGithubClick}
              className="gap-2 text-xs hover:bg-secondary/10"
            >
              <Github className="w-4 h-4" />
              <span>Contribute</span>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="px-4 py-3 space-y-2">
              <HelpTooltip>
                <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 text-sm">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help</span>
                </button>
              </HelpTooltip>
              <button
                onClick={() => {
                  setShowRating(true)
                  setIsOpen(false)
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent/10 transition-colors flex items-center gap-2 text-sm"
              >
                <Star className="w-4 h-4" />
                <span>Rate us</span>
              </button>
              <button
                onClick={() => {
                  handleReportClick()
                  setIsOpen(false)
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-destructive/10 transition-colors flex items-center gap-2 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Report a problem</span>
              </button>
              <button
                onClick={() => {
                  handleGithubClick()
                  setIsOpen(false)
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary/10 transition-colors flex items-center gap-2 text-sm"
              >
                <Github className="w-4 h-4" />
                <span>Contribute</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <RatingModal open={showRating} onOpenChange={setShowRating} />
    </>
  )
}