'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-white/5 bg-ocean-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <WaveformLogo />
          <span className="font-display font-semibold text-white tracking-tight">
            Dolphins<span className="gradient-text">Intuition</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <Link href="/about"    className="hover:text-teal-bio transition-colors">About</Link>
          <Link href="/research" className="hover:text-teal-bio transition-colors">Research</Link>
          <Link href="/demo"     className="hover:text-teal-bio transition-colors px-4 py-1.5 border border-teal-bio/40 rounded-full hover:border-teal-bio hover:text-teal-bio">
            Try Demo
          </Link>
        </div>

        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ocean-deep border-t border-white/5 px-6 py-4 flex flex-col gap-4 text-sm text-white/70">
          <Link href="/about"    onClick={() => setOpen(false)} className="hover:text-teal-bio">About</Link>
          <Link href="/research" onClick={() => setOpen(false)} className="hover:text-teal-bio">Research</Link>
          <Link href="/demo"     onClick={() => setOpen(false)} className="hover:text-teal-bio">Try Demo</Link>
        </div>
      )}
    </nav>
  )
}

function WaveformLogo() {
  const bars = [3, 7, 5, 9, 6, 10, 7, 4, 8, 5, 9, 6, 4]
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="opacity-90">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 2.2}
          y={(10 - h / 2)}
          width="1.4"
          height={h}
          rx="0.7"
          fill="url(#waveGrad)"
          style={{ animationDelay: `${i * 0.1}s` }}
          className="animate-wave-pulse"
        />
      ))}
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4b8" />
          <stop offset="100%" stopColor="#00b8d9" />
        </linearGradient>
      </defs>
    </svg>
  )
}
