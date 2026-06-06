import Link from 'next/link'

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
            Listening at the<br />
            <span className="gradient-text glow-teal">edge of language.</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            We use DolphinGemma and cutting-edge AI to decode dolphin vocalizations —
            exploring one of nature's most complex communication systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/demo"
              className="px-8 py-3.5 bg-teal-bio text-ocean-black font-semibold rounded-full hover:bg-teal-glow transition-colors font-display"
            >
              Try the Demo
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 border border-white/20 text-white/70 rounded-full hover:border-teal-bio hover:text-teal-bio transition-colors font-display"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-white/5 bg-ocean-deep/50">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="glow-border rounded-2xl p-6 bg-ocean-deep hover:bg-ocean-mid transition-colors">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-display font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          Upload a dolphin recording.<br />
          <span className="gradient-text">See what the AI hears.</span>
        </h2>
        <p className="text-white/40 mb-8 max-w-xl mx-auto">
          Our DolphinGemma-powered demo analyses acoustic patterns in real time.
          No account required.
        </p>
        <Link
          href="/demo"
          className="inline-block px-10 py-4 bg-gradient-to-r from-teal-bio to-cyan-electric text-ocean-black font-bold rounded-full font-display text-lg hover:opacity-90 transition-opacity"
        >
          Open Demo →
        </Link>
      </section>
    </>
  )
}

const features = [
  {
    icon: '🐬',
    title: 'DolphinGemma Model',
    desc: "Google DeepMind's open model trained on Wild Dolphin Project data — the first AI purpose-built for cetacean vocalisation analysis.",
  },
  {
    icon: '🔊',
    title: 'Acoustic Analysis',
    desc: 'Upload WAV or MP3 recordings of dolphin clicks, whistles, and burst pulses. Get structured AI output within seconds.',
  },
  {
    icon: '🧠',
    title: 'Open Research',
    desc: 'All findings are open. We publish datasets, prompt logs, and model outputs to advance collective understanding.',
  },
]

function OceanBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-bio/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-electric/4 blur-[100px]" />
      {/* Waveform decoration */}
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-10" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z" fill="url(#oceanGrad)" />
        <defs>
          <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00d4b8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00b8d9" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
