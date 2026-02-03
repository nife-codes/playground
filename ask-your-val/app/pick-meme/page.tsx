"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"


const milkMochaMemes = [
  {
    id: 1,
    name: "Spinning Hug",
    url: "/memes/excited.gif",
  },
  {
    id: 2,
    name: "Cheek Hug",
    url: "/memes/cutesy.gif",
  },
  {
    id: 3,
    name: "Love Hug",
    url: "/memes/love.gif",
  },
  {
    id: 4,
    name: "Lift",
    url: "/memes/lift.gif",
  },
  {
    id: 5,
    name: "Cuddle",
    url: "/memes/cuddle.gif",
  },
  {
    id: 6,
    name: "Handshake",
    url: "/memes/together.gif",
  },
]

function PickMemeContent() {
  const [selectedMeme, setSelectedMeme] = useState<number | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || ""

  const handleContinue = () => {
    if (selectedMeme !== null) {
      router.push(`/generate?name=${encodeURIComponent(name)}&meme=${selectedMeme}`)
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
  
      
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-2xl w-full text-center relative z-10">
        <h1 className="font-serif text-5xl md:text-6xl text-[#8B1538] mb-2">
          Pick a Reaction
        </h1>
        
        <p className="text-[#8B1538] mb-6 text-lg">
          {"Choose what they'll see when they say YES"}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {milkMochaMemes.map((meme) => (
            <button
              key={meme.id}
              onClick={() => setSelectedMeme(meme.id)}
              className={`relative rounded-xl overflow-hidden border-4 transition-all hover:scale-105 ${
                selectedMeme === meme.id 
                  ? "border-[#DC143C] ring-4 ring-[#FF69B4] shadow-lg" 
                  : "border-[#FFB6C1] hover:border-[#DC143C]"
              }`}
            >
              <div className="aspect-square relative bg-[#FFF5F5]">
                <Image
                  src={meme.url || "/placeholder.svg"}
                  alt={meme.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#8B1538]/80 to-transparent p-2">
                <span className="text-white text-sm font-medium">{meme.name}</span>
              </div>
              {selectedMeme === meme.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#DC143C] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleContinue}
          disabled={selectedMeme === null}
          className="w-full py-4 rounded-xl bg-[#DC143C] text-white font-semibold text-lg hover:bg-[#8B1538] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          Continue
        </button>
        
        <button
          onClick={() => router.back()}
          className="mt-4 text-[#8B1538] hover:text-[#DC143C] transition-colors"
        >
          Go Back
        </button>
      </div>
    </main>
  )
}

export default function Page2PickMeme() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFB6C1]">
        <div className="text-[#8B1538] text-xl">Loading...</div>
      </div>
    }>
      <PickMemeContent />
    </Suspense>
  )
}
