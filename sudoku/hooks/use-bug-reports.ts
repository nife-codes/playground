"use client"

import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface BugReport {
  description: string
  email?: string
  timestamp: number
  userAgent: string
}

export function useBugReports() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitReport = async (description: string, email?: string) => {
    if (!description.trim()) {
      return { success: false, error: "Description is required" }
    }

    setIsSubmitting(true)
    try {
      await addDoc(collection(db, "sudoku-reports"), {
        description: description.trim(),
        email: email?.trim() || null,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      })

      setIsSubmitting(false)
      return { success: true }
    } catch (error) {
      console.error("Error submitting report:", error)
      setIsSubmitting(false)
      return { success: false, error: "Failed to submit report" }
    }
  }

  return {
    submitReport,
    isSubmitting
  }
}