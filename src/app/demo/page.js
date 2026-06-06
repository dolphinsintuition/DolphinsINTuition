'use client'
import { useState, useRef } from 'react'

const HF_TOKEN  = process.env.NEXT_PUBLIC_HF_TOKEN
const MODEL_ID  = 'openai/whisper-large-v3'
const HF_URL    = `https://router.huggingface.co/hf-inference/models/${MODEL_ID}`

export default function Demo() {
  const [file, setFile]         = useState(null)
  const [status, setStatus]     = useState('idle')
  const [result, setResult]     = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef(null)

  async function handleAnalyse() {
    if (!file) return
    setStatus('loading')
    setResult(null)
    setErrorMsg('')

    try {
      const audioBuffer = await file.arrayBuffer()

      const response = await fetch(HF_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': file.type || 'audio/wav',
        },
        body: audioBuffer,
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        const loading = typeof err.error === 'string' && err.error.toLowerCase().includes('loading')
        throw new Error(loading ? 'Model is warming up — try again in 30 seconds.' : (err.error || `HTTP ${response.status}`))
      }

      const data = await response.json()
      setResult(data)
      setStatus('done')
    } catch (e) {
      setErrorMsg(e.message)
      setStatus('error')
    }
  }

  const transcript = result?.text || (typeof result === 'string' ? result : null)

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <p className="text-teal-bio text-sm tracking-widest uppercase mb-4">Demo</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
        Upload a recording.
      </h1>
      <p className="text-white/50 mb-3 leading-relaxed">
        Submit a WAV or MP3 of dolphin vocalizations. Whisper transcribes the acoustic
        content — a foundation layer while we await DolphinGemma's public release.
        Results are AI output, not translations.
      </p>
      <div className="flex items-center gap-2 mb-10">
        <span className="text-xs text-teal-bio/60 border border-teal-bio/20 rounded-full px-3 py-1">
          Powered by Whisper large-v3
        </span>
        <span className="text-xs text-white/20 border border-white/10 rounded-full px-3 py-1">
          DolphinGemma — coming when released
        </span>
      </div>

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
            <p className="text-white/30 text-sm mt-1">WAV, MP3, FLAC — max 25 MB</p>
          </>
        )}
      </div>

      <button
        onClick={handleAnalyse}
        disabled={!file || status === 'loading'}
        className="w-full py-4 rounded-xl font-display font-semibold text-ocean-black bg-teal-bio hover:bg-teal-glow disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        {status === 'loading' ? 'Analysing…' : 'Analyse Audio'}
      </button>

      {status === 'loading' && (
        <div className="mt-8 glow-border rounded-xl p-6 bg-ocean-deep text-center">
          <div className="flex justify-center gap-1 mb-3">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="w-1 bg-teal-bio rounded-full animate-wave-pulse"
                style={{ height: `${12 + i * 4}px`, animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <p className="text-white/50 text-sm">Transcribing…<br/>First run may take 20–30 seconds (cold start).</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-8 border border-red-500/30 rounded-xl p-5 bg-red-500/5">
          <p className="text-red-400 font-medium mb-1">Analysis failed</p>
          <p className="text-red-300/60 text-sm">{errorMsg}</p>
        </div>
      )}

      {status === 'done' && result && (
        <div className="mt-8 glow-border rounded-xl p-6 bg-ocean-deep">
          <p className="text-teal-bio text-xs uppercase tracking-widest mb-1">Whisper Transcription</p>
          <p className="text-white/30 text-xs mb-4">AI output — not a translation</p>
          {transcript ? (
            <p className="text-white/80 text-base leading-relaxed">{transcript}</p>
          ) : (
            <pre className="text-white/80 text-sm whitespace-pre-wrap font-mono leading-relaxed overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      )}

      <p className="text-white/20 text-xs mt-8 text-center">
        Using{' '}
        <a href="https://huggingface.co/openai/whisper-large-v3" target="_blank" rel="noopener" className="underline hover:text-white/40">
          openai/whisper-large-v3
        </a>
        {' '}via HuggingFace · Will upgrade to DolphinGemma on public release.
      </p>
    </div>
  )
}
