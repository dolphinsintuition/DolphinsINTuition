// /api/collaborate — server-side collaboration inquiry handler
// Credentials kept server-side only; no exposure to client

export async function POST(request) {
  try {
    const { name, email, institution, role, researchArea, message } = await request.json()

    // Validate required fields
    if (!name || !email || !institution || !researchArea) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get Supabase URL and key from server-side env vars
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
    const res = await fetch(`${SUPABASE_URL}/rest/v1/collaborate_inquiries`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        name,
        email,
        institution,
        role: role || null,
        research_area: researchArea,
        message: message || null,
        created_at: new Date().toISOString(),
      }),
    })

    if (res.ok) {
      return Response.json(
        { success: true, message: "Thank you! We've received your collaboration inquiry and will be in touch." },
        { status: 200 }
      )
    } else {
      const errorText = await res.text()
      console.error(`Supabase error: ${res.status}`, errorText)
      return Response.json(
        { error: 'Submission failed. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Collaborate API error:', error)
    return Response.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
