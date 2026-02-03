"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import NavHeader from "@/components/nav-header"

export default function Page1Name() {
  const [name, setName] = useState("")
  const router = useRouter()

  const handleContinue = () => {
    if (name.trim()) {
      router.push(`/pick-meme?name=${encodeURIComponent(name.trim())}`)
    }
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
        <h1 className="font-serif text-6xl md:text-7xl text-[#8B1538] mb-4">
          Be My Valentine
        </h1>
        
        <p className="text-[#8B1538] mb-8 text-lg">
          Create a special message for someone you love
        </p>
        
        <div className="mb-8">
          <label htmlFor="name" className="block text-[#8B1538] mb-3 text-left font-medium">
            Who is this Valentine for?
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter their name..."
            className="w-full px-4 py-3 rounded-xl border-2 border-[#DC143C] bg-[#FFF5F5] text-[#8B1538] placeholder-[#DC143C]/50 focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:border-transparent text-lg"
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
          />
        </div>
        
        <button
          onClick={handleContinue}
          disabled={!name.trim()}
          className="w-full py-4 rounded-xl bg-[#DC143C] text-white font-semibold text-lg hover:bg-[#8B1538] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          Continue
        </button>
        
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-[#DC143C]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ))}
        </div>
      </div>
    </main>
  )
}