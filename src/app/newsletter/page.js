import NewsletterForm from '../../components/NewsletterForm'

export const metadata = {
  title: 'Newsletter',
  description: 'Subscribe to Cetacean Intelligence Weekly — dolphin communication research, delivered to your inbox.',
}

export default function Newsletter() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center min-h-[70vh] flex flex-col items-center justify-center">
      <p className="text-teal-bio text-sm font-medium tracking-[0.2em] uppercase mb-6">
        Cetacean Intelligence Weekly
      </p>
      <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
        Join the <span className="gradient-text glow-teal">Newsletter</span>
      </h1>
      <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
        Dolphin communication research, DolphinGemma updates, and new findings —
        straight to your inbox. No spam, unsubscribe anytime.
      </p>
      <div className="w-full max-w-md">
        <NewsletterForm />
      </div>
    </section>
  )
}
