export const metadata = {
  title: 'Contact | Dolphins Intuition',
  description:
    'Get in touch with the Dolphins Intuition project — field recordings, research collaboration, or general enquiries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ocean-black text-white">

      {/* ── Hero ── */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-ocean-black to-ocean-black opacity-80" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-teal-bio font-display text-sm tracking-widest uppercase mb-4">
            Contact
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
            Let's <span className="gradient-text">talk</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Field recordings, research collaboration, feedback on the demo, or just a
            question about cetacean AI — drop us a line.
          </p>
        </div>
      </section>

      {/* ── Contact options ── */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <div className="space-y-6">
          {[
            {
              icon: '◉',
              title: 'Field recordings',
              body: 'Do you have dolphin audio from field work — hydrophone recordings, drone audio, anything? We are actively looking for new data to run through the analysis pipeline. All contributions are credited and results shared back with you.',
              action: 'Send recordings',
              href: 'mailto:dolphins@chrisransford.com?subject=Field%20Recordings%20Contribution',
            },
            {
              icon: '◎',
              title: 'Research collaboration',
              body: 'Are you a researcher working on cetacean communication, acoustic AI, or related fields? We are interested in sharing tools, datasets, and findings with anyone doing serious work in this space.',
              action: 'Discuss collaboration',
              href: 'mailto:dolphins@chrisransford.com?subject=Research%20Collaboration',
            },
            {
              icon: '◈',
              title: 'Demo feedback',
              body: 'Did the demo produce something surprising — a useful result, a clear error, an unexpected output? Specific feedback about model behaviour is genuinely helpful for improving the pipeline.',
              action: 'Send feedback',
              href: 'mailto:dolphins@chrisransford.com?subject=Demo%20Feedback',
            },
            {
              icon: '◇',
              title: 'General enquiries',
              body: 'Anything else — press, partnerships, questions about the project, or just to say something interesting about dolphins.',
              action: 'Get in touch',
              href: 'mailto:dolphins@chrisransford.com?subject=Dolphins%20Intuition%20Enquiry',
            },
          ].map((item) => (
            <div key={item.title} className="glow-border rounded-2xl p-8 bg-ocean-deep flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-teal-bio text-xl">{item.icon}</span>
                  <h2 className="font-display text-xl font-semibold text-white">{item.title}</h2>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
              </div>
              <a
                href={item.href}
                className="shrink-0 px-6 py-2.5 border border-teal-bio/50 rounded-full text-teal-bio font-display text-sm tracking-wide hover:bg-teal-bio/10 transition-colors whitespace-nowrap"
              >
                {item.action} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── GitHub ── */}
      <section className="px-6 py-16 bg-ocean-deep">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/40 font-display text-xs uppercase tracking-widest mb-4">
            Open source
          </p>
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            The code is public
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            The site, analysis pipeline, and research tooling are all on GitHub under the
            DolphinsIntuition organisation. Issues, pull requests, and forks are welcome.
          </p>
          <a
            href="https://github.com/dolphinsintuition/DolphinsINTuition"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-white/20 rounded-full text-white/60 font-display text-sm tracking-wide hover:border-teal-bio/50 hover:text-teal-bio transition-colors"
          >
            View on GitHub →
          </a>
        </div>
      </section>

    </main>
  );
}
