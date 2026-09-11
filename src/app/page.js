import Link from 'next/link'
import NewsletterForm from '../components/NewsletterForm'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <OceanBackground />
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-teal-bio text-sm font-medium tracking-[0.2em] uppercase mb-6 animate-fade-up">
            AI × Cetacean Communication Research
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            What are dolphins<br />
            <span className="gradient-text glow-teal">trying to tell us?</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            We track the science of cetacean communication — from signature whistles
            and burst-pulse clicks to the latest AI models like DolphinGemma —
            and publish what we find, openly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/research"
              className="px-8 py-3.5 bg-teal-bio text-ocean-black font-semibold rounded-full hover:bg-teal-glow transition-colors font-display"
            >
              Explore the Research
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 border border-white/20 text-white/70 rounded-full hover:border-teal-bio hover:text-teal-bio transition-colors font-display"
            >
              Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter signup — Cetacean Intelligence Weekly */}
      <section className="max-w-md mx-auto px-6 -mt-4 mb-16 relative z-10">
        <p className="text-white/50 text-sm mb-3 text-center">
          Weekly dolphin science — research updates, AI advances, field notes.
        </p>
        <NewsletterForm />
      </section>

      {/* Three pillars */}
      <section className="border-y border-white/5 bg-ocean-deep/50">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {pillars.map((p, i) => (
            <div key={i} className="glow-border rounded-2xl p-6 bg-ocean-deep hover:bg-ocean-mid transition-colors">
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-display font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured research briefs */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-teal-bio text-xs font-medium tracking-[0.2em] uppercase mb-2">Latest from the lab</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Research Briefs</h2>
          </div>
          <Link
            href="/research"
            className="text-teal-bio text-sm hover:underline font-display hidden md:block"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {briefs.map((b, i) => (
            <Link key={i} href={b.href} className="group block glow-border rounded-2xl p-6 bg-ocean-deep hover:bg-ocean-mid transition-colors">
              <p className="text-teal-bio text-xs font-medium tracking-wider uppercase mb-3">{b.tag}</p>
              <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-teal-bio transition-colors leading-snug">{b.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{b.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          Interaction, not translation.<br />
          <span className="gradient-text">That is the honest frontier.</span>
        </h2>
        <p className="text-white/40 mb-8 max-w-2xl mx-auto">
          We don't claim to decode what dolphins say. We study the patterns,
          track the science, and build the tools that make genuine two-way
          interaction — someday — plausible. Follow the research.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/research"
            className="inline-block px-10 py-4 bg-gradient-to-r from-teal-bio to-cyan-electric text-ocean-black font-bold rounded-full font-display text-lg hover:opacity-90 transition-opacity"
          >
            Read the Research →
          </Link>
          <Link
            href="/about"
            className="inline-block px-10 py-4 border border-white/20 text-white/70 rounded-full font-display text-lg hover:border-teal-bio hover:text-teal-bio transition-colors"
          >
            About the Project
          </Link>
        </div>
      </section>
    </>
  )
}

const pillars = [
  {
    icon: '🐬',
    title: 'DolphinGemma & AI Models',
    desc: "Google DeepMind's open model — trained on 40 years of Wild Dolphin Project field data — is the most significant AI advance in cetacean research. We track its development and what it can actually do.",
  },
  {
    icon: '🔬',
    title: 'Peer-Reviewed Science',
    desc: 'Signature whistles, burst-pulse clicks, mirror self-recognition, cultural transmission. We read the papers and publish plain-English briefs so the science stays accessible.',
  },
  {
    icon: '🤝',
    title: 'Open Findings',
    desc: 'Our analyses, prompt logs, and model outputs are published openly. If you are a researcher or institution with data, we want to collaborate.',
  },
]

const briefs = [
  {
    tag: 'AI Models',
    title: 'DolphinGemma: What the Model Actually Does',
    summary: 'Google DeepMind released DolphinGemma in April 2025. Here is what it can classify, what it cannot, and what it means for the field.',
    href: '/research',
  },
  {
    tag: 'Bioacoustics',
    title: 'Signature Whistles: The Evidence for Dolphin Names',
    summary: 'Decades of research confirm dolphins use individually unique whistles as identity signals. What the science shows — and where it stops.',
    href: '/research',
  },
  {
    tag: 'Cognition',
    title: 'Mirror Self-Recognition: What It Does and Does Not Prove',
    summary: "Dolphins pass the mirror test. That is remarkable — and it's also frequently overstated. A careful reading of Reiss & Marino 2001.",
    href: '/research',
  },
]

function OceanBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Deep Ocean Blue ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(0, 229, 255, 0.05)' }} />
      {/* Tropical Turquoise secondary glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(26, 154, 176, 0.04)' }} />
      {/* Waveform decoration */}
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-10" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z" fill="url(#oceanGrad)" />
        <defs>
          <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="0">
            {/* Crystal Blue → Tropical Turquoise */}
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1A9AB0" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
