export const metadata = {
  title: 'Research Hub — Dolphins Intuition',
  description: 'Research briefs, key papers, datasets, and leading scientists in cetacean communication and AI. The most current view of what science knows about dolphin intelligence.',
}

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">

      {/* Header */}
      <p className="text-teal-bio text-sm tracking-widest uppercase mb-4">Research Hub</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
        What the science actually says.
      </h1>
      <p className="text-white/50 text-lg leading-relaxed mb-4 max-w-2xl">
        Dolphins Intuition tracks the frontier of cetacean communication research — AI models, acoustic analysis, cognition studies, and the scientists doing the real work. Updated continuously.
      </p>
      <p className="text-teal-bio/70 text-sm mb-16 italic">
        Our line: interaction and exchange, not translation. Everything here is held to that standard.
      </p>

      {/* Research Briefs */}
      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-white">Research Briefs</h2>
          <span className="text-white/30 text-sm">Updated fortnightly</span>
        </div>
        <div className="grid gap-5">
          {briefs.map((b, i) => (
            <div key={i} className="glow-border rounded-xl p-6 bg-ocean-deep">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs text-teal-bio uppercase tracking-wider">{b.tag}</span>
                  <h3 className="font-display font-semibold text-white text-lg mt-1">{b.title}</h3>
                </div>
                <span className="text-white/20 text-sm shrink-0 mt-1">{b.date}</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{b.summary}</p>
              <div className="flex flex-wrap gap-2">
                {b.tags.map((t, j) => (
                  <span key={j} className="text-xs px-2 py-1 rounded-full bg-teal-bio/10 text-teal-bio/70">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Papers */}
      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-white">Key Papers</h2>
          <span className="text-white/30 text-sm">Peer-reviewed only</span>
        </div>
        <div className="space-y-4">
          {papers.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block glow-border rounded-xl p-5 bg-ocean-deep hover:bg-ocean-mid transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-teal-bio uppercase tracking-wider mb-1">{p.tag}</p>
                  <h3 className="font-display font-semibold text-white group-hover:text-teal-bio transition-colors mb-1">{p.title}</h3>
                  <p className="text-white/40 text-sm">{p.authors} · {p.year}</p>
                </div>
                <span className="text-teal-bio/60 group-hover:text-teal-bio text-lg shrink-0 mt-1">↗</span>
              </div>
              {p.note && <p className="text-white/40 text-sm mt-3 leading-relaxed">{p.note}</p>}
            </a>
          ))}
        </div>
      </section>

      {/* Leading Scientists */}
      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-white">Scientists to Know</h2>
          <span className="text-white/30 text-sm">Active researchers</span>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {scientists.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block glow-border rounded-xl p-5 bg-ocean-deep hover:bg-ocean-mid transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-bio/20 flex items-center justify-center shrink-0 text-teal-bio font-bold text-sm">
                  {s.initials}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white group-hover:text-teal-bio transition-colors">{s.name}</h3>
                  <p className="text-white/40 text-xs mb-2">{s.affiliation}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{s.note}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Data Sources */}
      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-white">Data & Datasets</h2>
          <span className="text-white/30 text-sm">Open access</span>
        </div>
        <div className="space-y-4">
          {datasets.map((d, i) => (
            <a
              key={i}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block glow-border rounded-xl p-5 bg-ocean-deep hover:bg-ocean-mid transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-teal-bio uppercase tracking-wider mb-1">{d.tag}</p>
                  <h3 className="font-display font-semibold text-white group-hover:text-teal-bio transition-colors mb-1">{d.title}</h3>
                  <p className="text-white/40 text-sm">{d.description}</p>
                </div>
                <span className="text-teal-bio/60 group-hover:text-teal-bio text-lg shrink-0 mt-1">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Stay current CTA */}
      <div className="glow-border rounded-2xl p-8 bg-ocean-deep text-center">
        <p className="text-teal-bio text-sm tracking-widest uppercase mb-3">Stay Current</p>
        <h3 className="font-display text-2xl font-bold text-white mb-4">New briefs every two weeks.</h3>
        <p className="text-white/50 mb-6">No hype. Just honest science updates from the frontier of cetacean AI research.</p>
        <a
          href="/newsletter"
          className="inline-block px-6 py-3 rounded-full bg-teal-bio text-ocean-deep font-semibold text-sm hover:bg-teal-bio/90 transition-colors"
        >
          Get the research digest →
        </a>
      </div>

    </div>
  )
}

const briefs = [
  {
    tag: 'Research Brief · DIC-303',
    title: 'DolphinGemma: What the Model Actually Does',
    date: 'Sep 2026',
    summary: 'Google DeepMind released DolphinGemma in April 2025 — a language model trained on 40+ years of Wild Dolphin Project recordings. It classifies vocalisation types and predicts what sound comes next. It does not translate dolphin language. Here is exactly what it can and cannot do, and why the distinction matters.',
    tags: ['DolphinGemma', 'Machine Learning', 'Google DeepMind', 'Wild Dolphin Project'],
  },
  {
    tag: 'Research Brief · DIC-304',
    title: 'Signature Whistles: The Evidence for Dolphin Names',
    date: 'Sep 2026',
    summary: 'Dolphins develop unique signature whistles in the first year of life and retain them for decades. Other dolphins copy these whistles to address specific individuals — the only non-human animals known to use learned, individually-specific calls in this way. The Bruck (2013) 20-year memory study is the most striking evidence. Here is what it proves, and what it does not.',
    tags: ['Signature Whistles', 'Bioacoustics', 'Identity', 'Cognition'],
  },
  {
    tag: 'Research Brief · DIC-305',
    title: 'Mirror Self-Recognition: What It Does and Does Not Prove',
    date: 'Sep 2026',
    summary: 'Reiss & Marino (2001) showed two bottlenose dolphins recognising themselves in a mirror — only the fourth species confirmed to do so at the time. This is genuinely significant evidence of self-awareness. It is not evidence of language, sentience, or communication complexity. Here is the precise claim the study makes and how it fits into the broader picture.',
    tags: ['Cognition', 'Self-Awareness', 'Mirror Test', 'Reiss & Marino'],
  },
]

const papers = [
  {
    tag: 'Model · 2025',
    title: 'DolphinGemma: A Language Model for Dolphin Communication',
    authors: 'Google DeepMind & Wild Dolphin Project',
    year: '2025',
    url: 'https://huggingface.co/google/dolphin-gemma',
    note: 'The first large language model trained specifically on cetacean vocalisations. Classifies sound types and predicts acoustic sequences. Trained on 40+ years of annotated recordings.',
  },
  {
    tag: 'Paper · 2006',
    title: 'Bottlenose dolphin signature whistles: understanding individual recognition',
    authors: 'Janik, V.M. et al.',
    year: '2006',
    url: 'https://royalsocietypublishing.org/doi/10.1098/rspb.2006.3586',
    note: 'Definitive playback study establishing that dolphins respond specifically to their own signature whistle — the mechanism behind what functions as a name.',
  },
  {
    tag: 'Paper · 2013',
    title: 'Bottlenose dolphins remember the signature whistles of old friends after 20+ years',
    authors: 'Bruck, J.N.',
    year: '2013',
    url: 'https://royalsocietypublishing.org/doi/10.1098/rspb.2013.1057',
    note: 'The 20-year social memory study. Dolphins responded to the signature whistles of former companions after two decades of separation — the longest social memory ever demonstrated in a non-human animal.',
  },
  {
    tag: 'Paper · 2001',
    title: 'Mirror self-recognition in the bottlenose dolphin',
    authors: 'Reiss, D. & Marino, L.',
    year: '2001',
    url: 'https://www.pnas.org/doi/10.1073/pnas.101086398',
    note: 'Confirmed dolphins pass the mirror test — fourth species after humans, great apes, and elephants. Direct evidence of self-awareness.',
  },
  {
    tag: 'Paper · 1984',
    title: 'Comprehension of sentences by bottlenosed dolphins',
    authors: 'Herman, L.M., Richards, D.G. & Wolz, J.P.',
    year: '1984',
    url: 'https://link.springer.com/article/10.3758/BF03202005',
    note: 'Classic artificial grammar study. Dolphins Akeakamai and Phoenix comprehended an artificial language with grammatical rules — evidence of syntax sensitivity.',
  },
  {
    tag: 'Paper · 2013',
    title: 'Social learning of a novel foraging skill by wild bottlenose dolphins',
    authors: 'Mann, J. & Patterson, E.M.',
    year: '2013',
    url: 'https://royalsocietypublishing.org/doi/10.1098/rspb.2013.1709',
    note: 'Sponge-carrying behaviour in Shark Bay dolphins transmitted mother-to-offspring — a clear case of cultural transmission in the wild.',
  },
]

const scientists = [
  {
    initials: 'DH',
    name: 'Dr. Denise Herzing',
    affiliation: 'Wild Dolphin Project',
    url: 'https://www.wilddolphinproject.org',
    note: '40+ years studying free-ranging Atlantic spotted dolphins in the Bahamas. Creator of the CHAT device — first two-way acoustic exchange with wild dolphins (2013).',
  },
  {
    initials: 'DR',
    name: 'Dr. Diana Reiss',
    affiliation: 'Hunter College, CUNY',
    url: 'https://www.dianareiss.com',
    note: 'Mirror self-recognition pioneer. Advocate for dolphin personhood. Research spans vocalisation, cognition, and human-dolphin interaction.',
  },
  {
    initials: 'VJ',
    name: 'Dr. Vincent Janik',
    affiliation: 'University of St Andrews',
    url: 'https://synergy.st-andrews.ac.uk/janik/',
    note: 'Leading authority on signature whistle function, vocal learning in marine mammals, and acoustic communication across species.',
  },
  {
    initials: 'JB',
    name: 'Dr. Jason Bruck',
    affiliation: 'Stephen F. Austin State University',
    url: 'https://www.brucklab.com',
    note: 'Author of the landmark 20-year social memory study. Research focuses on dolphin individuality, memory, and acoustic recognition.',
  },
  {
    initials: 'DM',
    name: 'Dr. David Gruber',
    affiliation: 'CETI / CUNY',
    url: 'https://www.projectceti.org',
    note: 'Co-founder of Project CETI — applying ML and transformer models to sperm whale coda communication. The most advanced AI + cetacean project running.',
  },
  {
    initials: 'LH',
    name: 'Dr. Louis Herman',
    affiliation: 'University of Hawaii (legacy)',
    url: 'https://en.wikipedia.org/wiki/Louis_Herman',
    note: 'Pioneered artificial language studies with dolphins Akeakamai and Phoenix. Definitive evidence of syntax comprehension in cetaceans.',
  },
]

const datasets = [
  {
    tag: 'Dataset · Open Access',
    title: 'Wild Dolphin Project — Acoustic Archive',
    url: 'https://www.wilddolphinproject.org',
    description: '40+ years of underwater recordings of Atlantic spotted dolphins in the Bahamas. The dataset used to train DolphinGemma.',
  },
  {
    tag: 'Dataset · Open Access',
    title: 'Macaulay Library — Marine Mammal Acoustics',
    url: 'https://www.macaulaylibrary.org',
    description: 'Cornell Lab of Ornithology\'s archive. Largest audio and video archive of wildlife in the world. Includes extensive cetacean recordings.',
  },
  {
    tag: 'Model · Open Access',
    title: 'DolphinGemma on HuggingFace',
    url: 'https://huggingface.co/google/dolphin-gemma',
    description: 'Google DeepMind\'s open-weight model for cetacean vocalisation classification and acoustic prediction.',
  },
  {
    tag: 'Project · Active',
    title: 'Project CETI — Sperm Whale Coda Research',
    url: 'https://www.projectceti.org',
    description: 'Applying ML, transformers, and non-invasive bio-logging to decode sperm whale communication at scale. Most advanced AI + cetacean project running.',
  },
  {
    tag: 'Dataset · Open Access',
    title: 'MBARI — Monterey Bay Hydrophone Archive',
    url: 'https://www.mbari.org/technology/monterey-accelerated-research-system-mars/',
    description: 'Deep-sea hydrophone array off Monterey Bay. Continuous recordings available for research use. Captures dolphin and whale vocalisations in open ocean.',
  },
]
