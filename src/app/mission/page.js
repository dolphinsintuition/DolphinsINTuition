export const metadata = {
  title: 'Our Mission | Dolphins Intuition',
  description:
    'Why we built Dolphins Intuition — the long-term vision for AI-assisted cetacean communication research and what we hope to contribute.',
};

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-ocean-black text-white">

      {/* ── Hero ── */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-ocean-black to-ocean-black opacity-80" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-teal-bio font-display text-sm tracking-widest uppercase mb-4">
            Mission
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
            Listening at the{' '}
            <span className="gradient-text">edge of language</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            We are building tools to explore whether dolphin communication is more
            structured than we currently understand — and making that research
            accessible to everyone, not just marine biologists.
          </p>
        </div>
      </section>

      {/* ── Why ── */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-px bg-teal-bio" />
          <span className="text-teal-bio font-display text-sm tracking-widest uppercase">
            01 — Why
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 glow-teal">
          The question worth asking
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-white/70 leading-relaxed mb-5">
              Dolphins are among the most cognitively sophisticated animals on Earth.
              They have large brains relative to body size, form long-lasting social
              bonds, teach skills to their young, mourn their dead, and coordinate
              complex cooperative behaviours. They also produce a rich repertoire of
              structured sounds — whistles, clicks, burst-pulses — that vary
              systematically with social context.
            </p>
            <p className="text-white/70 leading-relaxed">
              The scientific community is clear: we do not know what dolphins are saying.
              But the evidence that they are saying <em>something structured</em> is
              compelling enough that it deserves serious, well-resourced investigation.
            </p>
          </div>
          <div>
            <p className="text-white/70 leading-relaxed mb-5">
              For forty years the limiting factor has been analysis capacity. Researchers
              could record more data than they could ever listen to. AI changes that
              calculus. Models like DolphinGemma can process years of acoustic archives
              in hours — surfacing patterns no human expert could find manually.
            </p>
            <p className="text-white/70 leading-relaxed">
              Dolphins Intuition exists to build at that intersection: rigorous science,
              modern AI tooling, and an open platform that brings this work to people
              who care about it — not just academic journals.
            </p>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="px-6 py-20 bg-ocean-deep">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-teal-bio" />
            <span className="text-teal-bio font-display text-sm tracking-widest uppercase">
              02 — Principles
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 glow-teal">
            How we work
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '◉',
                title: 'Rigour over hype',
                body: 'We will not claim dolphins have human language. We will not exaggerate model capabilities. Every AI output is labelled as interpretation, not translation. The science does not need embellishment — the reality is remarkable enough.',
              },
              {
                icon: '◎',
                title: 'Open findings',
                body: 'Our research logs, model outputs, and audio analysis results are published openly. If we find something interesting, we describe exactly how we found it so others can reproduce, challenge, or extend it.',
              },
              {
                icon: '◈',
                title: 'Tools over papers',
                body: 'We build things: the demo, the analysis pipeline, the dataset tooling. A working tool that lets anyone submit a recording and receive structured analysis is more valuable than a paywalled academic paper most people will never read.',
              },
              {
                icon: '◇',
                title: 'Human-scale accessibility',
                body: 'Cetacean science has a jargon problem. We write for intelligent, curious non-specialists — the same people who read science journalism at its best. Understanding the research should not require a PhD.',
              },
            ].map((p) => (
              <div key={p.title} className="glow-border rounded-2xl p-6 bg-ocean-black">
                <div className="text-teal-bio text-2xl mb-4">{p.icon}</div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-px bg-teal-bio" />
          <span className="text-teal-bio font-display text-sm tracking-widest uppercase">
            03 — Roadmap
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 glow-teal">
          Where we are headed
        </h2>
        <div className="space-y-6">
          {[
            {
              phase: 'Phase 1 — Live',
              label: 'Complete',
              color: 'text-teal-bio',
              items: [
                'DolphinGemma acoustic analysis demo (Whisper large-v3 + HuggingFace inference)',
                'Science explainer: what the research actually says',
                'Research log: annotated field notes and AI analysis outputs',
                'Open platform on Cloudflare Pages',
              ],
            },
            {
              phase: 'Phase 2 — In Progress',
              label: 'Current',
              color: 'text-yellow-400',
              items: [
                'Agent-managed content pipeline: AI agent posts research log entries autonomously',
                'Mission and contact infrastructure',
                'CI/CD: GitHub Actions → auto-deploy on every push',
                'HuggingFace model integration improvements',
              ],
            },
            {
              phase: 'Phase 3 — Planned',
              label: 'Next',
              color: 'text-white/40',
              items: [
                'Community audio submissions: field researchers can contribute recordings',
                'Comparative analysis: cross-species vocalisation structure',
                'Public dataset: curated, annotated dolphin audio with model outputs',
                'Integration with Project CETI and Wild Dolphin Project archives',
              ],
            },
          ].map((phase) => (
            <div key={phase.phase} className="glow-border rounded-2xl p-8 bg-ocean-deep">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-white">{phase.phase}</h3>
                <span className={`font-display text-xs tracking-widest uppercase ${phase.color}`}>
                  {phase.label}
                </span>
              </div>
              <ul className="space-y-3">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-teal-bio mt-0.5 text-sm">→</span>
                    <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 bg-ocean-deep">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Interested in contributing?
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Whether you have field recordings, want to help with analysis, or just want
            to follow the research — we would like to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 border border-teal-bio/60 rounded-full text-teal-bio font-display text-sm tracking-wide hover:bg-teal-bio/10 transition-colors"
          >
            Get in touch →
          </a>
        </div>
      </section>

    </main>
  );
}
