'use client'
import { useState, useRef } from 'react'

const HF_TOKEN = process.env.NEXT_PUBLIC_HF_TOKEN
const MODEL_ID = 'google/dolphin-gemma-9b-v1'

export default function Demo() {
  const [file, setFile]         = useState(null)
  const [status, setStatus]     = useState('idle')   // idle | loading | done | error
  const [result, setResult]     = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef(null)

  async function handleAnalyse() {
    if (!file) return
    setStatus('loading')
    setResult(null)
    setErrorMsg('')

    try {
      const arrayBuffer = await file.arrayBuffer()
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

      const response = await fetch(
        `https://api-inference.huggingface.co/models/${MODEL_ID}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: base64,
            parameters: { max_new_tokens: 512 },
          }),
        }
      )

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
      setStatus('done')
    } catch (e) {
      setErrorMsg(e.message)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <p className="text-teal-bio text-sm tracking-widest uppercase mb-4">Demo</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
        Upload a recording.
      </h1>
      <p className="text-white/50 mb-10 leading-relaxed">
        Submit a WAV or MP3 of dolphin vocalizations. DolphinGemma will identify
        acoustic units and return a structured analysis. Results are AI interpretations —
        not translations.
      </p>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors mb-6
          ${file ? 'border-teal-bio/60 bg-teal-bio/5' : 'border-white/10 hover:border-teal-bio/40 bg-ocean-deep'}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={e => { setFile(e.target.files[0]); setStatus('idle') }}
        />
        {file ? (
          <>
            <p className="text-teal-bio font-medium">{file.name}</p>
            <p className="text-white/30 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB · Click to change</p>
          </>
        ) : (
          <>
            <p className="text-4xl mb-3">🎵</p>
            <p className="text-white/60">Click to select an audio file</p>
            <p className="text-white/30 text-sm mt-1">WAV, MP3, FLAC supported</p>
          </>
        )}
      </div>

      <button
        onClick={handleAnalyse}
        disabled={!file || status === 'loading'}
        className="w-full py-4 rounded-xl font-display font-semibold text-ocean-black bg-teal-bio hover:bg-teal-glow disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        {status === 'loading' ? 'Analysing…' : 'Analyse with DolphinGemma'}
      </button>

      {/* Loading state */}
      {status === 'loading' && (
        <div className="mt-8 glow-border rounded-xl p-6 bg-ocean-deep text-center">
          <div className="flex justify-center gap-1 mb-3">
            {[0,1,2,3,4].map(i => (
              <div
                key={i}
                className="w-1 bg-teal-bio rounded-full animate-wave-pulse"
                style={{ height: `${12 + i * 4}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <p className="text-white/50 text-sm">Model is loading and processing…<br/>First run may take 20–30 seconds.</p>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="mt-8 border border-red-500/30 rounded-xl p-5 bg-red-500/5">
          <p className="text-red-400 font-medium mb-1">Analysis failed</p>
          <p className="text-red-300/60 text-sm">{errorMsg}</p>
          <p className="text-white/30 text-xs mt-2">
            Note: The DolphinGemma model may still be loading on HuggingFace free tier (cold start).
            Try again in ~60 seconds.
          </p>
        </div>
      )}

      {/* Result */}
      {status === 'done' && result && (
        <div className="mt-8 glow-border rounded-xl p-6 bg-ocean-deep">
          <p className="text-teal-bio text-xs uppercase tracking-widest mb-3">DolphinGemma Output</p>
          <pre className="text-white/80 text-sm whitespace-pre-wrap font-mono leading-relaxed overflow-auto">
            {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <p className="text-white/20 text-xs mt-8 text-center">
        Powered by{' '}
        <a href="https://huggingface.co/google/dolphin-gemma-9b-v1" target="_blank" rel="noopener" className="underline hover:text-white/40">
          DolphinGemma
        </a>
        {' '}via HuggingFace Inference API · Results are AI interpretations only.
      </p>
    </div>
  )
}
