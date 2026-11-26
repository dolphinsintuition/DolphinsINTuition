// /api/subscribe — server-side newsletter subscription handler
// Credentials kept server-side only; no exposure to client

export async function POST(request) {
  try {
    const { email } = await request.json()

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get Supabase URL and key from server-side env vars
    // These are NOT exposed to the browser
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nxfjoqoilmfljlmtjdde.supabase.co'
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error('Supabase credentials missing from environment')
      return Response.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // POST to Supabase from the server (not the browser)
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
      return Response.json(
        { success: true, message: 'Subscribed successfully' },
        { status: 200 }
      )
    } else if (res.status === 409) {
      // Duplicate email
      return Response.json(
        { success: true, message: 'Already subscribed' },
        { status: 200 }
      )
    } else {
      console.error(`Supabase error: ${res.status}`, await res.text())
      return Response.json(
        { error: 'Subscription failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Subscribe API error:', error)
    return Response.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
