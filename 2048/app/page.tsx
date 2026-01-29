import { SpiderGame } from "@/components/spider-game"

export default function Home() {
  return (
    <main className="min-h-screen py-8 sm:py-12 relative overflow-hidden">
      {/* Background web pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Large web pattern */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((angle) => (
            <line
              key={`line-${angle}`}
              x1="50"
              y1="50"
              x2={50 + 100 * Math.cos((angle * Math.PI) / 180)}
              y2={50 + 100 * Math.sin((angle * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-foreground"
            />
          ))}
          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((r) => (
            <circle
              key={`circle-${r}`}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
              className="text-foreground"
            />
          ))}
        </svg>
      </div>

      {/* Corner accents */}
      <div className="fixed top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/20 to-transparent pointer-events-none" />

      <SpiderGame />
      
      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-muted-foreground">
        <p>Use arrow keys or swipe to play</p>
        <p className="mt-1">Inspired by the Spider-Verse</p>
      </footer>
    </main>
  )
}
