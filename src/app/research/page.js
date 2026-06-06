export const metadata = {
  title: 'Research — Dolphins Intuition',
  description: 'Key papers, datasets, and resources on cetacean communication and DolphinGemma.',
}

export default function Research() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-teal-bio text-sm tracking-widest uppercase mb-4">Research</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
        The science behind the sound.
      </h1>
      <p className="text-white/50 text-lg leading-relaxed mb-14">
        Key papers, datasets, and resources that ground this project in real research.
      </p>

      <div className="space-y-6">
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
    </div>
  )
}

const papers = [
  {
    tag: 'Model',
    title: 'DolphinGemma: A Language Model for Dolphin Communication',
    authors: 'Google DeepMind & Wild Dolphin Project',
    year: '2025',
    url: 'https://huggingface.co/google/dolphin-gemma',
    note: 'The foundation model powering our demo. Trained on 40+ years of annotated recordings from the Wild Dolphin Project.',
  },
  {
    tag: 'Dataset',
    title: 'Wild Dolphin Project — Open Acoustic Dataset',
    authors: 'Wild Dolphin Project',
    year: 'Ongoing',
    url: 'https://www.wilddolphinproject.org',
    note: 'Four decades of underwater recordings of Atlantic spotted dolphins in the Bahamas.',
  },
  {
    tag: 'Paper',
    title: 'Bottlenose dolphin signature whistles: understanding the mechanism of individual recognition',
    authors: 'Janik, V.M. et al.',
    year: '2006',
    url: 'https://royalsocietypublishing.org/doi/10.1098/rspb.2006.3586',
    note: "Landmark paper establishing that dolphins use signature whistles as names — the first non-human animals shown to use learned, individually specific calls.",
  },
  {
    tag: 'Paper',
    title: 'Social learning of a novel foraging skill by wild bottlenose dolphins',
    authors: 'Mann, J. & Patterson, E.M.',
    year: '2013',
    url: 'https://royalsocietypublishing.org/doi/10.1098/rspb.2013.1709',
  },
  {
    tag: 'Resource',
    title: 'DolphinsIntuition on HuggingFace',
    authors: 'Dolphins Intuition',
    year: '2026',
    url: 'https://huggingface.co/dolphinsintuition',
    note: 'Our own model experiments, fine-tunes, and audio datasets — open access.',
  },
]
