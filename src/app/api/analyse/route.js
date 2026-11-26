/**
 * Server-side HuggingFace API route
 * 
 * Handles audio analysis via HuggingFace Whisper model.
 * Token is kept server-side only — never exposed to browser.
 * 
 * POST /api/analyse
 * Body: FormData with 'audio' File
 * Returns: { text: "transcription" } or { error: "message" }
 */

const HF_TOKEN = process.env.HF_TOKEN
const MODEL_ID = 'openai/whisper-large-v3'
const HF_URL = `https://router.huggingface.co/hf-inference/models/${MODEL_ID}`

export async function POST(request) {
  try {
    // Validate token exists
    if (!HF_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'HuggingFace token not configured on server' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Parse FormData
    const formData = await request.formData()
    const audioFile = formData.get('audio')

    if (!audioFile) {
      return new Response(
        JSON.stringify({ error: 'No audio file provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Convert File to ArrayBuffer
    const audioBuffer = await audioFile.arrayBuffer()

    // Call HuggingFace API with server-side token
    const response = await fetch(HF_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': audioFile.type || 'audio/wav',
      },
      body: audioBuffer,
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      const loading =
        typeof err.error === 'string' &&
        err.error.toLowerCase().includes('loading')

      const errorMsg = loading
        ? 'Model is warming up — try again in 30 seconds.'
        : err.error || `HTTP ${response.status}`

      return new Response(JSON.stringify({ error: errorMsg }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Return transcription result
    const data = await response.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[/api/analyse] Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
