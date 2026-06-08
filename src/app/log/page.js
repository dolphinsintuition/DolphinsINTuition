import Link from 'next/link'

export const metadata = {
  title: 'Research Log | Dolphin InTuition',
  description: 'The raw work — what we tried, what we found, what it means. A running lab notebook for people following this project from zero.',
}

const entries = [
  {
    id: '001',
    date: 'June 8, 2026',
    title: 'What Whisper Hears When It Listens to Dolphins',
    summary: 'We ran 7 real dolphin recordings through Whisper large-v3. The results were wrong in exactly the right ways.',
    tags: ['Audio Analysis', 'Whisper', 'First Experiment'],
    status: 'complete',
    content: {
      why: `We have a demo page that lets visitors upload dolphin audio and get AI analysis. Before we can claim it works, we need to know what it actually does with real dolphin recordings. So we pulled 7 files from scientific repositories — Zenodo, mostly — and fed them through our Whisper backend one by one.

This is the first time we have run any dolphin audio through our own infrastructure. Entry 001.`,

      what: [
        { file: 'soundbible-dolphins-underwater.mp3', species: 'Bottlenose dolphin', source: 'SoundBible', size: '126 KB', type: 'Social vocalisations underwater' },
        { file: 'soundbible-dolphins-clicks.mp3',     species: 'Bottlenose dolphin', source: 'SoundBible', size: '69 KB',  type: 'Click burst' },
        { file: 'zenodo-dolphin-pops-A.wav',          species: 'Allied male bottlenose', source: 'Zenodo 4943486', size: '965 KB', type: 'Burst-pulse coordination call' },
        { file: 'zenodo-dolphin-pops-B.wav',          species: 'Allied male bottlenose', source: 'Zenodo 4943486', size: '1.4 MB', type: 'Burst-pulse coordination call' },
        { file: 'zenodo-lowfreq-above__48khz.wav',    species: 'Bottlenose dolphin', source: 'Zenodo 5138356', size: '419 KB', type: 'Echolocation clicks >48kHz' },
        { file: 'zenodo-lowfreq-above_24khz.wav',     species: 'Bottlenose dolphin', source: 'Zenodo 5138356', size: '1.1 MB', type: 'Broadband clicks >24kHz' },
        { file: 'zenodo-heavisides-dolphin.wav',      species: "Heaviside's dolphin", source: 'Zenodo 4967891', size: '5.9 MB', type: 'Relaxed acoustic behaviour' },
      ],

      results: [
        { file: 'Dolphins underwater', output: '"you"' },
        { file: 'Dolphin clicks',      output: '"Mwah!"' },
        { file: 'Allied male pops A',  output: '"Thank you."' },
        { file: 'Allied male pops B',  output: '"All right."' },
        { file: 'Clicks >48kHz',       output: '"you"' },
        { file: 'Broadband clicks',    output: '"Thank you."' },
        { file: "Heaviside's dolphin", output: '"you"' },
      ],

      interpretation: [
        {
          label: '"you" — 3 files',
          text: `Dolphin whistles and sustained vocalisations carry strong harmonic energy around 1kHz — the same frequency range as the long vowel /uː/ in human speech. Whisper is a human speech model. It hears tone, finds the closest phoneme in its vocabulary, and outputs the vowel that fits. This is correct behaviour from a model doing its job. It just wasn't trained for this job.`,
        },
        {
          label: '"Mwah!" — clicks',
          text: `Echolocation clicks are percussive: brief, broadband energy bursts with no tonal structure. In human phoneme space, this maps cleanly to labial consonants — the sounds made when lips come together (/m/, /w/, /b/). The model is actually responding to real acoustic structure here. Clicks sound like consonants because both are brief transient events. Wrong species, right instinct.`,
        },
        {
          label: '"Thank you." / "All right." — allied male pops',
          text: `This is the most interesting result. The burst-pulse "pop" calls used by allied male bottlenose dolphins during cooperative behaviour have a two-beat rhythmic structure — a short initial pop followed by a longer burst. Whisper hears a two-syllable prosodic pattern and outputs brief social acknowledgements. That's not random. Both dolphin burst-pulse pops and human phrases like "thank you" serve real-time social coordination functions. The temporal similarity likely reflects shared pragmatic constraints on alliance maintenance signals across species. Whisper stumbled onto something real, by accident.`,
        },
      ],

      conclusion: `Whisper is useless as a dolphin communication tool. That was expected — it was trained on human speech and has never encountered a dolphin in its training data. But the outputs are not random noise. Each one is a coherent response to real acoustic features in the recordings: frequency profiles, temporal patterns, energy distributions.

This is precisely the problem DolphinGemma is designed to solve. Instead of forcing dolphin vocalisations through human phoneme detectors, it learns dolphin-specific acoustic tokens from 40 years of annotated field recordings. The gap between what Whisper hears and what DolphinGemma eventually identifies will be the clearest possible demonstration of why purpose-built models matter.

We'll run this exact same experiment again when DolphinGemma becomes publicly available. That comparison will be the centrepiece of this research log.`,

      next: `Repeat with DolphinGemma when Google releases public weights. Compare outputs side by side. Write it up here.`,
    },
  },
]

export default function LogPage() {
  const entry = entries[0]

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">

      {/* Header */}
      <p className="text-teal-bio text-sm tracking-widest uppercase mb-4">Research Log</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
        The raw work.
      </h1>
      <p className="text-white/50 text-lg leading-relaxed mb-16">
        What we tried, what we found, what it means. Written for people following
        this project from the beginning — not the polished version, the real one.
      </p>

      {/* Entry */}
      <article>

        {/* Entry header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="shrink-0 w-14 h-14 rounded-xl bg-ocean-deep glow-border flex items-center justify-center">
            <span className="font-display text-teal-bio font-bold text-sm">{entry.id}</span>
          </div>
          <div>
            <p className="text-white/30 text-sm mb-1">{entry.date}</p>
            <h2 className="font-display text-2xl font-bold text-white">{entry.title}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {entry.tags.map(t => (
                <span key={t} className="text-xs text-teal-bio/70 border border-teal-bio/20 rounded-full px-3 py-0.5">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Why */}
        <section className="mb-10">
          <h3 className="font-display text-sm uppercase tracking-widest text-teal-bio mb-4">Why we did this</h3>
          <div className="text-white/70 leading-relaxed whitespace-pre-line">{entry.content.why}</div>
        </section>

        {/* What we tested */}
        <section className="mb-10">
          <h3 className="font-display text-sm uppercase tracking-widest text-teal-bio mb-4">The files</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/30 text-left">
                  <th className="pb-3 pr-4 font-normal">Species</th>
                  <th className="pb-3 pr-4 font-normal">Type</th>
                  <th className="pb-3 pr-4 font-normal">Source</th>
                  <th className="pb-3 font-normal">Size</th>
                </tr>
              </thead>
              <tbody>
                {entry.content.what.map((f, i) => (
                  <tr key={i} className="border-b border-white/5 text-white/60">
                    <td className="py-3 pr-4">{f.species}</td>
                    <td className="py-3 pr-4">{f.type}</td>
                    <td className="py-3 pr-4 text-white/30 text-xs">{f.source}</td>
                    <td className="py-3 text-white/30 text-xs">{f.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Results */}
        <section className="mb-10">
          <h3 className="font-display text-sm uppercase tracking-widest text-teal-bio mb-4">What Whisper said</h3>
          <div className="glow-border rounded-2xl overflow-hidden">
            {entry.content.results.map((r, i) => (
              <div key={i} className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? 'bg-ocean-deep' : 'bg-ocean-black'}`}>
                <span className="text-white/50 text-sm">{r.file}</span>
                <span className="font-display text-teal-bio font-semibold">{r.output}</span>
              </div>
            ))}
          </div>
          <p className="text-white/25 text-xs mt-3 italic">
            Model: openai/whisper-large-v3 · AI output — not a translation
          </p>
        </section>

        {/* Interpretation */}
        <section className="mb-10">
          <h3 className="font-display text-sm uppercase tracking-widest text-teal-bio mb-4">What it means</h3>
          <div className="space-y-6">
            {entry.content.interpretation.map((item, i) => (
              <div key={i} className="border-l-2 border-teal-bio/30 pl-5">
                <p className="font-display text-white font-semibold mb-2">{item.label}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-10">
          <h3 className="font-display text-sm uppercase tracking-widest text-teal-bio mb-4">The takeaway</h3>
          <div className="rounded-2xl bg-ocean-deep glow-border p-8">
            <p className="text-white/70 leading-relaxed whitespace-pre-line">{entry.content.conclusion}</p>
          </div>
        </section>

        {/* Next */}
        <section className="border-t border-white/5 pt-8">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Next step</p>
          <p className="text-white/50 text-sm">{entry.content.next}</p>
        </section>

      </article>

      {/* More coming */}
      <div className="mt-20 text-center">
        <p className="text-white/20 text-sm">More entries as the work progresses.</p>
        <p className="text-white/10 text-xs mt-1">
          Following along?{' '}
          <Link href="/contact" className="underline hover:text-white/30">Get in touch.</Link>
        </p>
      </div>

    </div>
  )
}
