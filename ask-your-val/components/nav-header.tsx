"use client"

import { useState } from "react"
import Link from "next/link"
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function NavHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [isRateOpen, setIsRateOpen] = useState(false)
  const [reportText, setReportText] = useState("")
  const [reportEmail, setReportEmail] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReportSubmit = async () => {
    if (!reportText.trim()) return
    
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'reports'), {
        problem: reportText,
        email: reportEmail || 'anonymous',
        timestamp: new Date().toISOString(),
        page: window.location.href
      })
      alert('Report submitted! Thank you!')
      setReportText("")
      setReportEmail("")
      setIsReportOpen(false)
    } catch (error) {
      alert('Error submitting report. Please try again.')
      console.error(error)
    }
    setIsSubmitting(false)
  }

  const handleRateSubmit = async () => {
    if (rating === 0) return
    
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'ratings'), {
        rating: rating,
        timestamp: new Date().toISOString(),
        page: window.location.href
      })
      alert('Rating submitted! Thank you!')
      setRating(0)
      setIsRateOpen(false)
    } catch (error) {
      alert('Error submitting rating. Please try again.')
      console.error(error)
    }
    setIsSubmitting(false)
  }

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 p-4">
        <nav className="max-w-7xl mx-auto flex justify-end">
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://github.com/nife-codes/playground#readme"
              target="_blank"
              className="text-[#8B1538] hover:text-[#DC143C] transition-colors font-medium text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              Help
            </Link>

            <button
              onClick={() => setIsRateOpen(true)}
              className="text-[#8B1538] hover:text-[#DC143C] transition-colors font-medium text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Rate
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="text-[#8B1538] hover:text-[#DC143C] transition-colors font-medium text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Report
            </button>

            <Link
              href="https://github.com/nife-codes/playground"
              target="_blank"
              className="text-[#8B1538] hover:text-[#DC143C] transition-colors font-medium text-sm flex items-center gap-1 bg-[#FFB6C1]/20 px-3 py-1 rounded-lg hover:bg-[#FFB6C1]/40"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Contribute
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#8B1538] hover:text-[#DC143C] p-2"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-white rounded-xl shadow-2xl p-4 border-4 border-[#DC143C] min-w-[200px]">
            <Link
              href="https://github.com/nife-codes/playground#readme"
              target="_blank"
              className="block py-2 text-[#8B1538] hover:text-[#DC143C] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            <button
              onClick={() => { setIsRateOpen(true); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-[#8B1538] hover:text-[#DC143C] transition-colors font-medium"
            >
              Rate
            </button>
            <button
              onClick={() => { setIsReportOpen(true); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-[#8B1538] hover:text-[#DC143C] transition-colors font-medium"
            >
              Report
            </button>
            <Link
              href="https://github.com/nife-codes/playground"
              target="_blank"
              className="block py-2 text-[#8B1538] hover:text-[#DC143C] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contribute
            </Link>
          </div>
        )}
      </header>

      {isReportOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border-4 border-[#DC143C] shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#8B1538]">Report a Problem</h2>
              <button onClick={() => setIsReportOpen(false)} className="text-[#8B1538] hover:text-[#DC143C]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[#8B1538]/70 mb-4">Found a bug? Let us know what happened.</p>
            
            <div className="mb-4">
              <label className="block text-[#8B1538] mb-2 font-medium">What went wrong? *</label>
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Describe the problem..."
                className="w-full px-4 py-3 bg-[#FFF5F5] text-[#8B1538] rounded-xl border-2 border-[#FFB6C1] focus:border-[#DC143C] focus:outline-none min-h-[120px]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-[#8B1538] mb-2 font-medium">Email (optional)</label>
              <input
                type="email"
                value={reportEmail}
                onChange={(e) => setReportEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-[#FFF5F5] text-[#8B1538] rounded-xl border-2 border-[#FFB6C1] focus:border-[#DC143C] focus:outline-none"
              />
              <p className="text-sm text-[#8B1538]/60 mt-1">We'll only use this to follow up on your report.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsReportOpen(false)}
                className="flex-1 py-3 rounded-xl bg-transparent text-[#8B1538] border-2 border-[#FFB6C1] hover:bg-[#FFF5F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                disabled={!reportText.trim() || isSubmitting}
                className="flex-1 py-3 rounded-xl bg-[#DC143C] text-white hover:bg-[#8B1538] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isRateOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border-4 border-[#DC143C] shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#8B1538]">Rate this project</h2>
              <button onClick={() => setIsRateOpen(false)} className="text-[#8B1538] hover:text-[#DC143C]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center gap-2 my-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 24 24"
                    fill={(hoverRating || rating) >= star ? "#DC143C" : "none"}
                    stroke={(hoverRating || rating) >= star ? "#DC143C" : "#FFB6C1"}
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsRateOpen(false)}
                className="flex-1 py-3 rounded-xl bg-transparent text-[#8B1538] border-2 border-[#FFB6C1] hover:bg-[#FFF5F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRateSubmit}
                disabled={rating === 0 || isSubmitting}
                className="flex-1 py-3 rounded-xl bg-[#DC143C] text-white hover:bg-[#8B1538] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}