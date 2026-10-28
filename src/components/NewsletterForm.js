'use client'

import { useState } from 'react'

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
      // Call server-side API route instead of Supabase directly
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Success! You are on the list.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
      console.error('Newsletter subscription error:', error)
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
