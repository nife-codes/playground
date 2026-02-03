"use client"

import { useEffect, useState } from "react"

interface Flower {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  type: number
}

export function FallingFlowers() {
  const [flowers, setFlowers] = useState<Flower[]>([])

  useEffect(() => {
    const flowerArray: Flower[] = []
    for (let i = 0; i < 20; i++) {
      flowerArray.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 6,
        size: 16 + Math.random() * 20,
        type: Math.floor(Math.random() * 4),
      })
    }
    setFlowers(flowerArray)
  }, [])

  const renderFlower = (type: number, size: number) => {
    const colors = ["#DC143C", "#FF69B4", "#FFB6C1", "#8B1538"]
    const color = colors[type]
    
    switch (type) {
      case 0:
        // Rose
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 8 6 8 10C8 12 9 14 12 14C15 14 16 12 16 10C16 6 12 2 12 2Z" fill={color} />
            <path d="M12 6C12 6 10 8 10 10C10 11 11 12 12 12C13 12 14 11 14 10C14 8 12 6 12 6Z" fill="#FFF5E8" fillOpacity="0.3" />
            <path d="M12 14V22" stroke="#4A7C4E" strokeWidth="2" />
            <path d="M12 18C10 18 8 16 8 16" stroke="#4A7C4E" strokeWidth="1.5" fill="none" />
            <path d="M12 16C14 16 16 14 16 14" stroke="#4A7C4E" strokeWidth="1.5" fill="none" />
          </svg>
        )
      case 1:
        // Tulip
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 6 8 6 12C6 16 9 18 12 18C15 18 18 16 18 12C18 8 12 2 12 2Z" fill={color} />
            <path d="M10 8C10 8 11 10 12 10C13 10 14 8 14 8" stroke="#FFF5E8" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M12 18V22" stroke="#4A7C4E" strokeWidth="2" />
          </svg>
        )
      case 2:
        // Cherry Blossom
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3" fill={color} />
            <circle cx="8" cy="12" r="3" fill={color} />
            <circle cx="16" cy="12" r="3" fill={color} />
            <circle cx="10" cy="16" r="3" fill={color} />
            <circle cx="14" cy="16" r="3" fill={color} />
            <circle cx="12" cy="12" r="2" fill="#FFD700" />
          </svg>
        )
      case 3:
        // Simple Flower
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="6" rx="3" ry="4" fill={color} />
            <ellipse cx="6" cy="10" rx="3" ry="4" fill={color} transform="rotate(-45 6 10)" />
            <ellipse cx="18" cy="10" rx="3" ry="4" fill={color} transform="rotate(45 18 10)" />
            <ellipse cx="8" cy="16" rx="3" ry="4" fill={color} transform="rotate(-20 8 16)" />
            <ellipse cx="16" cy="16" rx="3" ry="4" fill={color} transform="rotate(20 16 16)" />
            <circle cx="12" cy="12" r="3" fill="#FFD700" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute animate-flower-fall"
          style={{
            left: `${flower.left}%`,
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
          }}
        >
          {renderFlower(flower.type, flower.size)}
        </div>
      ))}
    </div>
  )
}
