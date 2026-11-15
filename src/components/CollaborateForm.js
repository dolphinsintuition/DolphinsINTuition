'use client'

import { useState } from 'react'

export default function CollaborateForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    role: '',
    researchArea: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    // Client-side validation
    if (!formData.name || !formData.email || !formData.institution || !formData.researchArea) {
      setStatus('error')
      setMessage('Please fill in all required fields.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    if (status === 'loading') return
    
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/collaborate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Thank you! We'll review your submission and be in touch.')
        setFormData({
          name: '',
          email: '',
          institution: '',
          role: '',
          researchArea: '',
          message: '',
        })
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
      console.error('Collaborate form error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Name <span className="text-teal-bio">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-teal-bio transition-colors disabled:opacity-60"
          placeholder="Your name"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          Email <span className="text-teal-bio">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-teal-bio transition-colors disabled:opacity-60"
          placeholder="your@institution.edu"
          required
        />
      </div>

      {/* Institution */}
      <div>
        <label htmlFor="institution" className="block text-sm font-medium text-white mb-2">
          Institution / Organization <span className="text-teal-bio">*</span>
        </label>
        <input
          type="text"
          id="institution"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-teal-bio transition-colors disabled:opacity-60"
          placeholder="University, research lab, organization"
          required
        />
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
          Your Role / Title
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-teal-bio transition-colors disabled:opacity-60"
          placeholder="e.g., Researcher, PI, Graduate Student"
        />
      </div>

      {/* Research Area */}
      <div>
        <label htmlFor="researchArea" className="block text-sm font-medium text-white mb-2">
          Research Area / Interest <span className="text-teal-bio">*</span>
        </label>
        <input
          type="text"
          id="researchArea"
          name="researchArea"
          value={formData.researchArea}
          onChange={handleChange}
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-teal-bio transition-colors disabled:opacity-60"
          placeholder="e.g., Cetacean communication, Bioacoustics, AI"
          required
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-teal-bio transition-colors disabled:opacity-60 resize-none"
          placeholder="Tell us about your research and collaboration interests..."
          rows="5"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full px-6 py-3 bg-teal-bio text-ocean-black font-semibold rounded-lg hover:bg-teal-glow transition-colors font-display disabled:opacity-60"
      >
        {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Submitted' : 'Submit Collaboration Inquiry'}
      </button>

      {/* Status Message */}
      {message && (
        <p className={`text-sm text-center ${status === 'error' ? 'text-red-400' : 'text-teal-bio'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
