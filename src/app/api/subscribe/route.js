// /api/subscribe — server-side newsletter subscription handler
// Integrates with Kit/ConvertKit V3 API for subscriber management + welcome sequence
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

    // Get Kit API key from server-side environment
    // This is NOT exposed to the browser
    const KIT_API_KEY = process.env.KIT_API_KEY

    if (!KIT_API_KEY) {
      console.error('Kit API key missing from environment')
      return Response.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // POST to Kit V3 API to add subscriber
    // Docs: https://app.kit.com/mcp
    // This endpoint automatically:
    // - Creates subscriber if new
    // - Updates if already exists
    // - Triggers welcome sequence (configured in Kit UI)
    const res = await fetch('https://api.kit.com/v3/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': KIT_API_KEY,
      },
      body: JSON.stringify({
        email_address: email,
        // Kit automations are triggered based on form ID or tag assignment
        // The welcome sequence is configured in Kit UI and fires on new subscriber
      }),
    })

    if (res.ok) {
      return Response.json(
        { success: true, message: 'Subscribed! Check your email for the welcome message.' },
        { status: 200 }
      )
    } else if (res.status === 409) {
      // Subscriber already exists in Kit
      return Response.json(
        { success: true, message: 'You\'re already on our list!' },
        { status: 200 }
      )
    } else {
      const errorData = await res.text()
      console.error(`Kit API error: ${res.status}`, errorData)
      return Response.json(
        { error: 'Subscription failed. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Subscribe API error:', error)
    return Response.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
