import Link from 'next/link'

export default function CharacterIntro() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="mb-12">
        <p className="text-teal-bio text-xs font-medium tracking-[0.2em] uppercase mb-2">🎭 Meet the Characters</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Finn & Echo</h2>
        <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl">
          Two AI-driven characters guiding viewers into dolphin intelligence and what interaction — not translation — actually means.
        </p>
      </div>

      {/* Two-Column Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* FINN — Left Brain / Logic */}
        <div className="group relative">
          <div className="glow-border rounded-2xl p-8 bg-ocean-deep hover:bg-ocean-mid transition-colors duration-300 h-full flex flex-col">
            {/* Character Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="text-4xl">🐬</div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Finn</h3>
              </div>
              <p className="text-teal-bio text-xs font-medium tracking-wider uppercase">Left Brain — Wonder & Logic</p>
            </div>

            {/* Character Description */}
            <div className="space-y-4 flex-1 mb-6">
              <p className="text-white/70 leading-relaxed">
                Finn approaches dolphin intelligence as a puzzle to solve. Curious about the mechanics — how do they produce those clicks? What patterns are hidden in the bioacoustics? What do the AI models actually show us?
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                Left-brain orientation: pattern recognition, data analysis, structured thinking. Finn guides the technical side — models, signal processing, the measurable parts of communication.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">Strengths</p>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Breaks down complexity into clear sequences</li>
                <li>• Tracks the science and the evidence</li>
                <li>• Explains AI models in plain language</li>
                <li>• Identifies what we know vs. what we speculate</li>
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-teal-bio/30 text-teal-bio hover:bg-teal-bio/10 transition-colors font-semibold text-sm font-display group/btn"
            >
              Explore with Finn →
              <span className="group-hover/btn:translate-x-1 transition-transform">🔬</span>
            </Link>
          </div>
        </div>

        {/* ECHO — Right Brain / Expression */}
        <div className="group relative">
          <div className="glow-border rounded-2xl p-8 bg-ocean-deep hover:bg-ocean-mid transition-colors duration-300 h-full flex flex-col">
            {/* Character Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="text-4xl">🌊</div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Echo</h3>
              </div>
              <p className="text-cyan-electric text-xs font-medium tracking-wider uppercase">Right Brain — Emotion & Expression</p>
            </div>

            {/* Character Description */}
            <div className="space-y-4 flex-1 mb-6">
              <p className="text-white/70 leading-relaxed">
                Echo feels the resonance of dolphin intelligence — the deep social bonds, the joy, the play, the mystery we cannot yet measure. She brings emotion and wonder to the data.
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                Right-brain orientation: narrative, feeling, interconnection. Echo guides the human experience — what does it MEAN that dolphins are this intelligent? What does interaction feel like?
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">Strengths</p>
              <ul className="text-white/60 text-sm space-y-1">
                <li>• Connects the science to human meaning</li>
                <li>• Honors the wonder and the unknowns</li>
                <li>• Asks the bigger philosophical questions</li>
                <li>• Reminds us why this matters</li>
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-electric/30 text-cyan-electric hover:bg-cyan-electric/10 transition-colors font-semibold text-sm font-display group/btn"
            >
              Journey with Echo →
              <span className="group-hover/btn:translate-x-1 transition-transform">💙</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider + Philosophy */}
      <div className="mt-20 pt-12 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/40 text-sm leading-relaxed mb-4">
            Finn and Echo are not a translation system. They are guides — one through the logic, one through the feeling.
            Together they represent the two ways we understand: the measurable and the meaningful.
          </p>
          <p className="text-teal-bio text-xs font-medium tracking-[0.2em] uppercase">
            Interaction, not translation.
          </p>
        </div>
      </div>
    </section>
  )
}
