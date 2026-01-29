"use client"

import React, { useState } from "react"
import { AlertCircle, Send, Check } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog"

interface ProblemReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProblemReportModal({
  open,
  onOpenChange,
}: ProblemReportModalProps) {
  const [email, setEmail] = useState("")
  const [problem, setProblem] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !problem) return

    setLoading(true)
    try {
      
      const reportData = {
        email,
        problem,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        url: typeof window !== "undefined" ? window.location.href : "",
      }

      
      const reports = JSON.parse(
        localStorage.getItem("spider-problem-reports") || "[]"
      )
      reports.push(reportData)
      localStorage.setItem("spider-problem-reports", JSON.stringify(reports))

      setSubmitted(true)
      setTimeout(() => {
        onOpenChange(false)
        setSubmitted(false)
        setEmail("")
        setProblem("")
      }, 2000)
    } catch (error) {
      console.error("Failed to submit report:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            Report a Problem
          </DialogTitle>
          <DialogDescription>
            Help us improve by letting us know what went wrong
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <div className="rounded-full bg-green-500/20 p-3">
              <Check className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-center text-sm font-medium">
              Thanks for reporting! We'll look into it. 🕷️
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email (so we can follow up)
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card border-border/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="problem"
                className="text-sm font-medium text-foreground"
              >
                What's the problem?
              </label>
              <textarea
                id="problem"
                placeholder="Describe the issue you encountered..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                required
                rows={4}
                className="w-full px-3 py-2 bg-card border border-border/50 rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!email || !problem || loading}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Send Report"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
