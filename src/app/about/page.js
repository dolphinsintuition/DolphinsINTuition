export const metadata = {
  title: 'About — Dolphins Intuition',
  description: 'About the Dolphins Intuition project and the DolphinGemma model.',
}

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-teal-bio text-sm tracking-widest uppercase mb-4">About</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
        Why dolphin language?
      </h1>
      <p className="text-white/50 text-lg leading-relaxed mb-12">
        Dolphins have large brains, long lifespans, complex social structures, and a
        communication system built on whistles, clicks, and burst-pulse sounds.
        They name themselves. They coordinate hunts. They grieve.
        We don't know what they're saying — yet.
      </p>

      <div className="space-y-10">
        {sections.map((s, i) => (
          <div key={i} className="border-l-2 border-teal-bio/30 pl-6">
            <h2 className="font-display text-xl font-semibold text-white mb-2">{s.title}</h2>
            <p className="text-white/50 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const sections = [
  {
    title: 'What is DolphinGemma?',
    body: "DolphinGemma is a language model developed by Google DeepMind and the Wild Dolphin Project, trained on decades of annotated dolphin vocalisation recordings. It's the first open model specifically designed to identify acoustic units — the building blocks of dolphin communication — from raw audio.",
  },
  {
    title: 'What we do',
    body: "Dolphins Intuition is an independent research and exploration platform. We build tools on top of DolphinGemma, collect field recordings, and publish open findings. Our demo lets anyone submit audio and receive structured AI analysis — making this research accessible without a marine biology background.",
  },
  {
    title: 'Rigour over hype',
    body: "We don't claim dolphins have human-like language. We do claim the data is interesting, the models are improving, and the question is worth taking seriously. Every output from our demo is labelled as AI interpretation — not translation.",
  },
  {
    title: 'Who built this?',
    body: "Dolphins Intuition is a one-person project by Chris Ransford, built with the DolphinsIntuition HuggingFace account and an AI agent fleet (OpenClaw26). The site and tooling are fully open source on GitHub.",
  },
]
