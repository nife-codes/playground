"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import NavHeader from "@/components/nav-header"

function GenerateContent() {
  const [copied, setCopied] = useState(false)
  const [generatedLink, setGeneratedLink] = useState("")
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || ""
  const meme = searchParams.get("meme") || "1"

  useEffect(() => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    setGeneratedLink(`${baseUrl}/valentine?name=${encodeURIComponent(name)}&meme=${meme}`)
  }, [name, meme])

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/images/heart-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <NavHeader />
      
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center relative z-10">
        <div className="mb-6">
          <svg className="w-20 h-20 mx-auto text-[#DC143C] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        
        <h1 className="font-serif text-5xl md:text-6xl text-[#8B1538] mb-4">
          Your Link is Ready!
        </h1>
        
        <p className="text-[#8B1538] mb-6 text-lg">
          Share this special link with <span className="font-bold text-[#DC143C]">{name}</span>
        </p>
        
        <div className="bg-[#FFF5F5] rounded-xl p-4 mb-6 border-2 border-[#FFB6C1]">
          <p className="text-[#8B1538] text-sm break-all font-mono">
            {generatedLink}
          </p>
        </div>
        
        <button
          onClick={handleCopy}
          className="w-full py-4 rounded-xl bg-[#DC143C] text-white font-semibold text-lg hover:bg-[#8B1538] transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy Link
            </>
          )}
        </button>
        
        
          href={generatedLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-[#8B1538] hover:text-[#DC143C] transition-colors underline"
        >
          Preview your Valentine
        </a>
        
        <div className="mt-8 pt-6 border-t border-[#FFB6C1]">
          <p className="text-[#8B1538]/70 text-sm">
            Send this link via text, email, or any messenger!
          </p>
        </div>
      </div>
    </main>
  )
}

export default function Page3Generate() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFB6C1]">
        <div className="text-[#8B1538] text-xl">Loading...</div>
      </div>
    }>
      <GenerateContent />
    </Suspense>
  )
}