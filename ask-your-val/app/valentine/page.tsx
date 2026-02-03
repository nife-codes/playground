"use client"

import { useState, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { FallingFlowers } from "@/components/falling-flowers"

const milkMochaMemes = [
  { id: 1, url: "https://media.tenor.com/IhSVfjKLYjAAAAAM/milk-and-mocha-cute.gif" },
  { id: 2, url: "https://media.tenor.com/15CQz0cP4IUAAAAM/milk-and-mocha.gif" },
  { id: 3, url: "https://media.tenor.com/tB0ReqHJVVgAAAAM/milk-mocha.gif" },
  { id: 4, url: "https://media.tenor.com/dlOPj-2T_JoAAAAM/milk-and-mocha-love.gif" },
  { id: 5, url: "https://media.tenor.com/M-5wLPQCHYAAAAAM/love-bear.gif" },
  { id: 6, url: "https://media.tenor.com/xlhFy_dicnMAAAAM/milk-and-mocha.gif" },
]

const noButtonTexts = [
  "No",
  "Are you sure?",
  "Biko nau",
  "I'm on my knees",
  "I will drink Hypo o",
  "Obara Chineke",
  "Pretty please?",
  "With sugar on top?",
  "Last chance!",
]

function CelebrationHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([])
  
  useEffect(() => {
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: 16 + Math.random() * 24,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heart-fall"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            top: "-50px",
          }}
        >
          <svg 
            width={heart.size} 
            height={heart.size} 
            viewBox="0 0 24 24" 
            fill="#DC143C"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      ))}
    </div>
  )
}

function ValentineContent() {
  const [answered, setAnswered] = useState(false)
  const [saidYes, setSaidYes] = useState(false)
  const [noClickCount, setNoClickCount] = useState(0)
  const [noButtonStyle, setNoButtonStyle] = useState({ scale: 1, opacity: 1 })
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "Valentine"
  const memeId = parseInt(searchParams.get("meme") || "1")
  
  const selectedMeme = milkMochaMemes.find(m => m.id === memeId) || milkMochaMemes[0]

  const handleYes = () => {
    setAnswered(true)
    setSaidYes(true)
  }

  const handleNo = () => {
    const newCount = noClickCount + 1
    setNoClickCount(newCount)
    
    if (newCount >= noButtonTexts.length) {
      setNoButtonStyle({ scale: 0, opacity: 0 })
    } else {
      const newScale = Math.max(0.4, 1 - newCount * 0.1)
      setNoButtonStyle({ scale: newScale, opacity: 1 })
    }
  }

  const noButtonText = noButtonTexts[Math.min(noClickCount, noButtonTexts.length - 1)]

  if (answered && saidYes) {
    return (
      <main 
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: "url('/images/heart-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <CelebrationHearts />
        <FallingFlowers />
        
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center relative z-10 animate-bounce-in">
          <h1 className="font-serif text-5xl md:text-6xl text-[#DC143C] mb-4">
            Yay!
          </h1>
          
          <p className="text-[#8B1538] text-xl mb-6">
            {"You made someone very happy!"}
          </p>
          
          <div className="rounded-xl overflow-hidden border-4 border-[#DC143C] mb-6 inline-block">
            <Image
              src={selectedMeme.url || "/placeholder.svg"}
              alt="Celebration"
              width={280}
              height={280}
              className="object-cover"
              unoptimized
            />
          </div>
          
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className="w-8 h-8 text-[#DC143C] animate-pulse" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ))}
          </div>
        </div>
      </main>
    )
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
      <FallingFlowers />
      
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center relative z-10">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-[#DC143C] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl text-[#8B1538] mb-2">
          Dear {name},
        </h1>
        
        <h2 className="font-serif text-5xl md:text-6xl text-[#DC143C] mb-8">
          Will you be my Valentine?
        </h2>
        
        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={handleYes}
            className="px-8 py-4 rounded-xl bg-[#DC143C] text-white font-semibold text-xl hover:bg-[#8B1538] transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Yes!
          </button>
          
          {noButtonStyle.opacity > 0 && (
            <button
              onClick={handleNo}
              style={{
                transform: `scale(${noButtonStyle.scale})`,
                opacity: noButtonStyle.opacity,
              }}
              className="px-8 py-4 rounded-xl bg-[#FFB6C1] text-[#8B1538] font-semibold text-xl hover:bg-[#FF69B4] hover:text-white transition-all shadow-lg"
            >
              {noButtonText}
            </button>
          )}
        </div>
        
        {noClickCount > 0 && noClickCount < noButtonTexts.length && (
          <p className="mt-4 text-[#8B1538]/70 text-sm animate-pulse">
            {"Leave the 'No' button alone nau!!"}
          </p>
        )}
        
        {noClickCount >= noButtonTexts.length && (
          <p className="mt-4 text-[#DC143C] font-medium">
            {"Looks like 'Yes' is your only option now!"}
          </p>
        )}
      </div>
    </main>
  )
}

export default function Page4Valentine() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFB6C1]">
        <div className="text-[#8B1538] text-xl">Loading...</div>
      </div>
    }>
      <ValentineContent />
    </Suspense>
  )
}
