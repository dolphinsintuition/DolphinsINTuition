'use client'

import { useState } from 'react'

// NOTE: the NEXT_PUBLIC_SUPABASE_URL/ANON_KEY env vars in Cloudflare Pages
// point at a stale/nonexistent project ref (qvnafubcoyqrycuomrzr — NXDOMAIN).
// The real project is nxfjoqoilmfljlmtjdde ("dolphinsintuition's Project",
// restored from paused 2026-07-31). Hardcoded here since these are public
// browser-safe publishable values (same trust level as NEXT_PUBLIC_* vars)
// and Cloudflare env vars couldn't be corrected without a fresh CF token.
const SUPABASE_URL = 'https://nxfjoqoilmfljlmtjdde.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_p5Lycaul_-c0QhektilJ7w_vQjRBQVI'

export default function NewsletterForm({ className = '' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage('Success! You are on the list.')
        setEmail('')
      } else if (res.status === 409) {
        setStatus('success')
        setMessage("You're already subscribed.")
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 w-full ${className}`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        disabled={status === 'loading' || status === 'success'}
        className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-teal-bio transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="px-6 py-3 bg-teal-bio text-ocean-black font-semibold rounded-lg hover:bg-teal-glow transition-colors font-display disabled:opacity-60 whitespace-nowrap"
      >
        {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
      </button>
      {message && (
        <p className={`text-sm sm:absolute sm:mt-14 ${status === 'error' ? 'text-red-400' : 'text-teal-bio'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
