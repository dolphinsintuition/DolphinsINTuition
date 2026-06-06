export const metadata = {
  title: 'The Science | Dolphin InTuition',
  description:
    'What do we know about dolphin communication? From signature whistles to AI-powered acoustic analysis — the science behind the project.',
};

export default function SciencePage() {
  return (
    <main className="min-h-screen bg-ocean-black text-white">

      {/* ── Hero ── */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-ocean-black to-ocean-black opacity-80" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-teal-bio font-display text-sm tracking-widest uppercase mb-4">
            The Science
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
            What do we know about{' '}
            <span className="gradient-text">dolphin communication?</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            Forty years of field research. Decades of cognitive experiments. And now —
            AI tools powerful enough to find patterns in vocalisation data that no human
            ear could detect. Here is what the science actually says.
          </p>
        </div>
      </section>

      {/* ── Section 1: Signature Whistles ── */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-px bg-teal-bio" />
          <span className="text-teal-bio font-display text-sm tracking-widest uppercase">
            01 — Identity
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 glow-teal">
          Signature Whistles — Dolphins Have Names
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-white/70 leading-relaxed mb-4">
              Every bottlenose dolphin develops a unique signature whistle within the
              first few months of life. This whistle functions as an individual
              identifier — effectively a name. Dolphins use their own signature to
              announce themselves, and they respond specifically when they hear their
              own whistle played back.
            </p>
            <p className="text-white/70 leading-relaxed">
              More remarkably, dolphins copy each other's signature whistles when
              separated, apparently as a way of calling to a specific individual — not
              just vocalising into the void. This is referential communication: a sound
              that stands for a specific entity.
            </p>
          </div>
          <div>
            <p className="text-white/70 leading-relaxed mb-4">
              In 2013, Jason Bruck at the University of Chicago demonstrated that
              bottlenose dolphins recognise the signature whistles of former companions
              after more than 20 years of separation — the longest social memory ever
              demonstrated in a non-human animal.
            </p>
            <p className="text-white/70 leading-relaxed">
              These are not simple learned responses. The specificity, retention, and
              cross-individual copying of signature whistles suggests a level of social
              cognition that rivals great apes.
            </p>
          </div>
        </div>
        <div className="glow-border rounded-2xl p-6 bg-ocean-deep">
          <p className="text-teal-bio font-display text-sm uppercase tracking-widest mb-2">
            Key finding
          </p>
          <p className="text-white/80 italic">
            "Dolphins not only have names — they use each other's names. That is a very
            short list of animals."
          </p>
          <p className="text-white/40 text-sm mt-2">
            — Based on work by Stephanie King & Vincent Janik, University of St Andrews (2013)
          </p>
        </div>
      </section>

      {/* ── Section 2: Cognitive Evidence ── */}
      <section className="px-6 py-20 bg-ocean-deep">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-teal-bio" />
            <span className="text-teal-bio font-display text-sm tracking-widest uppercase">
              02 — Cognition
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 glow-teal">
            The Cognitive Evidence
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Mirror Self-Recognition',
                year: '2001',
                researchers: 'Reiss & Marino',
                body: 'Atlantic bottlenose dolphins pass the mirror test — recognising their own reflection as themselves rather than another animal. Only humans, great apes, elephants, and magpies have reliably demonstrated this.',
              },
              {
                title: 'Syntax Comprehension',
                year: '1984',
                researchers: 'Herman, Richards & Wolz',
                body: 'Dolphins Akeakamai and Phoenix learned an artificial gestural language with defined grammar rules. They correctly interpreted novel sentences — demonstrating sensitivity to word order and syntactic structure.',
              },
              {
                title: 'Social Memory',
                year: '2013',
                researchers: 'Jason Bruck',
                body: '20+ years of companion recognition via signature whistles — the longest social memory ever demonstrated in a non-human animal, surpassing chimpanzees.',
              },
              {
                title: 'Tool Use & Culture',
                year: '1997–present',
                researchers: 'Mann, Krützen et al.',
                body: 'Bottlenose dolphins in Shark Bay use marine sponges as foraging tools. The behaviour is culturally transmitted through maternal lines — learned, not instinctual.',
              },
              {
                title: 'Referential Gestures',
                year: '2011',
                researchers: 'Xitco, Gory & Kuczaj',
                body: 'Dolphins spontaneously direct human attention toward objects using gaze and body orientation — triadic attention-sharing analogous to pointing, a key marker of theory of mind.',
              },
              {
                title: 'Vocal Learning',
                year: 'Ongoing',
                researchers: 'Multiple labs',
                body: 'Dolphins are one of a small number of mammals capable of vocal learning — producing novel sounds through imitation. This places them in an exclusive group alongside humans, elephants, and some birds.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="glow-border rounded-2xl p-6 bg-ocean-black hover:bg-ocean-mid transition-colors duration-200"
              >
                <h3 className="font-display text-lg font-semibold text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-teal-bio text-xs font-display tracking-widest uppercase mb-3">
                  {card.year} · {card.researchers}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Key Projects ── */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-px bg-teal-bio" />
          <span className="text-teal-bio font-display text-sm tracking-widest uppercase">
            03 — Research
          </span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 glow-teal">
          The Projects Pushing the Frontier
        </h2>
        <div className="space-y-8">
          {[
            {
              name: 'Wild Dolphin Project',
              abbr: 'WDP',
              lead: 'Dr. Denise Herzing',
              since: '1985',
              location: 'Little Bahama Bank, Atlantic Ocean',
              body: "The longest-running study of free-ranging dolphins in the world. Dr. Herzing has studied the same community of Atlantic spotted dolphins for over 40 years — following individuals across their entire lifetimes. The WDP dataset is one of the most valuable acoustic archives in cetacean science. The project also developed CHAT (Cetacean Hearing and Telemetry) — a wearable underwater computer designed for real-time two-way communication with wild dolphins.",
              note: 'Species studied: Atlantic spotted dolphin (Stenella frontalis)',
            },
            {
              name: 'Project CETI',
              abbr: 'CETI',
              lead: 'David Gruber, Pratyusha Sharma, Tom Mustill et al.',
              since: '2020',
              location: 'Dominica, Eastern Caribbean',
              body: 'The Cetacean Translation Initiative applies transformer-based machine learning to sperm whale click communications called codas. CETI has deployed underwater microphone arrays off Dominica to record thousands of hours of sperm whale social interactions. Their 2024 paper in Nature Communications identified previously unknown structural complexity in coda sequences. The project is explicit: they have not "translated" whale communication — they are mapping its structure.',
              note: 'Species studied: Sperm whale (Physeter macrocephalus)',
            },
            {
              name: 'Herman Laboratory',
              abbr: 'KBMML',
              lead: 'Dr. Louis Herman (1930–2023)',
              since: '1970s',
              location: 'Kewalo Basin Marine Mammal Laboratory, Hawaii',
              body: "The foundational experimental work on dolphin cognition. Herman's laboratory produced the definitive evidence that dolphins comprehend artificial language with grammatical structure. His subjects Akeakamai and Phoenix demonstrated sensitivity to word order, semantic content, and novel sentence construction. This work established that dolphin intelligence is not just social and emotional — it includes abstract representational capacity.",
              note: 'Species studied: Bottlenose dolphin (Tursiops truncatus)',
            },
          ].map((proj) => (
            <div key={proj.abbr} className="glow-border rounded-2xl p-8 bg-ocean-deep">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {proj.name}
                  </h3>
                  <p className="text-teal-bio text-sm font-display tracking-widest uppercase mt-1">
                    {proj.lead} · Since {proj.since}
                  </p>
                </div>
                <span className="text-white/20 font-display text-4xl font-bold">
                  {proj.abbr}
                </span>
              </div>
              <p className="text-white/40 text-xs mb-4">{proj.location}</p>
              <p className="text-white/70 leading-relaxed mb-4">{proj.body}</p>
              <div className="border-t border-white/5 pt-4">
                <p className="text-white/30 text-xs italic">{proj.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: What AI Is Changing ── */}
      <section className="px-6 py-20 bg-ocean-deep">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-teal-bio" />
            <span className="text-teal-bio font-display text-sm tracking-widest uppercase">
              04 — AI
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 glow-teal">
            What AI Is Changing
          </h2>
          <p className="text-white/70 leading-relaxed mb-12 text-lg">
            For decades the bottleneck was not recordings — researchers have thousands of
            hours of them. The bottleneck was analysis. Human experts could listen,
            categorise, and annotate only so fast. That is now changing.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                title: 'Large-Scale Acoustic Analysis',
                body: 'ML models can process years of acoustic recordings in hours — clustering vocalisations, detecting rare call types, and surfacing structural patterns that manual analysis would never find.',
              },
              {
                title: 'Sequence Modelling',
                body: 'Transformer architectures trained on vocalisation sequences can predict what comes next, detect anomalies, and identify higher-order structure — the same approach that powers large language models.',
              },
              {
                title: 'Real-Time Interaction',
                body: 'Faster inference means underwater devices can now classify incoming vocalisations in near real-time and generate appropriate playback responses — moving from passive recording toward active exchange.',
              },
              {
                title: 'DolphinGemma',
                body: 'Google DeepMind and Georgia Tech trained a Gemma-based model on 40 years of Wild Dolphin Project data. The first LLM built specifically for cetacean communication research — and the upstream AI for the next generation of CHAT devices.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glow-border rounded-2xl p-6 bg-ocean-black hover:bg-ocean-mid transition-colors duration-200"
              >
                <h3 className="font-display text-lg font-semibold text-teal-bio mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Honest caveat */}
          <div className="rounded-2xl border border-white/10 p-8 bg-ocean-black">
            <p className="text-white/40 font-display text-xs uppercase tracking-widest mb-3">
              What this is not
            </p>
            <p className="text-white/70 leading-relaxed">
              None of this amounts to translation. We are mapping structure, not meaning.
              The honest position is that we do not know what dolphins are saying to each
              other — and we may never know in any human sense of "knowing." What we can
              say is that their communication is structured, learned, referential, and
              socially complex. That is already extraordinary. The science does not need
              embellishment.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
