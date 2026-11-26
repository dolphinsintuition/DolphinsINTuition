// POST /api/subscribe: newsletter signup (DIC-6599).
//
// This is a Cloudflare Pages Function. The site is a static export (`output: 'export'`), so a Next.js
// route under src/app/api is never served; files under functions/ are.
// Needs the secret KIT_API_KEY in the Pages project settings. Without it the form shows an error.

const KIT_URL = 'https://api.kit.com/v4/subscribers'

const reply = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export async function onRequestPost({ request, env }) {
  let email
  try {
    email = (await request.json()).email
  } catch {
    return reply(400, { error: 'Invalid request' })
  }
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return reply(400, { error: 'Invalid email address' })
  }
  if (!env.KIT_API_KEY) {
    console.error('subscribe: KIT_API_KEY is not set; the signup was NOT saved')
    return reply(500, { error: 'Signup is unavailable right now. Please try again later.' })
  }

  try {
    const res = await fetch(KIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Kit-Api-Key': env.KIT_API_KEY },
      body: JSON.stringify({ email_address: email.trim() }),
    })
    if (res.ok) return reply(200, { success: true, message: 'Success! You are on the list.' })
    // Status only: Kit's response body can repeat the address.
    console.error(`subscribe: Kit returned HTTP ${res.status}; the signup was NOT saved`)
  } catch (error) {
    console.error(`subscribe: could not reach Kit (${error.name}); the signup was NOT saved`)
  }
  return reply(502, { error: 'Subscription failed. Please try again.' })
}
