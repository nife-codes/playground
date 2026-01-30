"use client"

import React, { useState } from "react"
import { X, AlertCircle } from "lucide-react"
import { useBugReports } from "../hooks/use-bug-reports"

interface BugReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BugReportModal({ open, onOpenChange }: BugReportModalProps) {
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { submitReport, isSubmitting } = useBugReports()

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = await submitReport(description, email)
    
    if (result.success) {
      setSubmitted(true)
      setDescription("")
      setEmail("")
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false)
      setTimeout(() => {
        setSubmitted(false)
        setDescription("")
        setEmail("")
      }, 300)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="space-y-4">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Report Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for helping us improve the game.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Report a Problem</h2>
                <p className="text-sm text-muted-foreground">
                  Found a bug? Let us know what happened.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                    What went wrong? *
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the problem..."
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    We'll only use this to follow up on your report.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !description.trim()}
                    className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}