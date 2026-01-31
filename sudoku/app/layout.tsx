import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Lavishly_Yours } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _lavishlyYours = Lavishly_Yours({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sudoku - A Beautiful Puzzle Game',
  description: 'Play Sudoku with a modern, beautiful interface. Features multiple difficulty levels, hints, notes mode, and more!',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}