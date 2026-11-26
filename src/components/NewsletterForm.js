// Newsletter signup (DIC-6599): a plain HTML post to our Kit form.
//
// The site is a static export, so it has no server route to call. Kit receives the email address,
// runs its own bot check and asks the visitor to confirm by email. No API key is involved.
const KIT_FORM_ACTION = 'https://app.kit.com/forms/9747205/subscriptions'

export default function NewsletterForm({ className = '' }) {
  return (
    <form
      action={KIT_FORM_ACTION}
      method="post"
      className={`flex flex-col sm:flex-row gap-3 w-full ${className}`}
    >
      <input
        type="email"
        name="email_address"
        required
        aria-label="Email Address"
        placeholder="Email Address"
        className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-teal-bio transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-teal-bio text-ocean-black font-semibold rounded-lg hover:bg-teal-glow transition-colors font-display whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  )
}
