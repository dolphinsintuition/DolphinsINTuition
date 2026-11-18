'use client'

import { useState } from 'react'

export default function ProofOfWork() {
  const [expandedStep, setExpandedStep] = useState(null)

  // Core pipeline metrics — verified data
  const dataMetrics = [
    { label: 'Audio Clips', value: '10,517', unit: 'raw recordings' },
    { label: 'Hours', value: '7.93', unit: 'total duration' },
    { label: 'Mel Tensors', value: '5,403', unit: 'spectrogram features' },
    { label: 'Species', value: '23', unit: 'cetacean types' },
    { label: 'Call Types', value: '16', unit: 'vocalization patterns' },
    { label: 'Open Data', value: '100%', unit: 'shared openly' },
  ]

  // 6-step pipeline visualization
  const pipeline = [
    {
      step: 1,
      title: 'Raw Collection',
      description: 'Wild Dolphin Project field recordings + NOAA cetacean libraries. Verified source, full provenance.',
      details:
        '10,517 audio clips spanning 40+ years of field research. Each clip tagged with species, location, date, and recording conditions.',
    },
    {
      step: 2,
      title: 'Preprocessing',
      description: 'Noise filtering, format normalization, duration standardization.',
      details:
        'Audio sampled at 48 kHz, spectrograms computed with 2048-sample FFT windows (42.67ms hops). Silence removed. Quality checks applied.',
    },
    {
      step: 3,
      title: 'Feature Engineering',
      description: 'Mel-scale spectrograms, signal decomposition, acoustic feature extraction.',
      details:
        '5,403 Mel tensors computed. 128 Mel bins, 128 time frames per sample. Features feed directly into model encoders.',
    },
    {
      step: 4,
      title: 'Model Training',
      description: 'Dolph2Vec embeddings + DolphinGemma classification backbone.',
      details:
        'Self-supervised contrastive learning on Wild Dolphin Project data. Models fine-tuned for signature whistle detection and call-type classification.',
    },
    {
      step: 5,
      title: 'Validation',
      description: 'Peer review, test splits, cross-validation against field truth.',
      details:
        'Holdout test set verified against blind human annotations. F1 scores and precision/recall tracked per call type. Errors logged.',
    },
    {
      step: 6,
      title: 'Publication',
      description: 'Weights, code, datasets, and findings released openly.',
      details:
        'Model weights on HuggingFace. Training notebooks open-sourced. Analysis briefs published to DolphinsINTuition research hub. Reproducible.',
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
      {/* Header */}
      <div className="mb-16">
        <p className="text-teal-bio text-xs font-medium tracking-[0.2em] uppercase mb-2">
          Verified Pipeline
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          Proof of Work
        </h2>
        <p className="text-white/40 text-base leading-relaxed max-w-2xl">
          Our dataset, pipeline, and models are open to inspection. 10,517 clips,
          23 species, 16 call types, 100% shared. Here is what we have built.
        </p>
      </div>

      {/* Data metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
        {dataMetrics.map((metric, i) => (
          <div
            key={i}
            className="glow-border rounded-xl p-4 bg-ocean-deep/50 hover:bg-ocean-mid transition-colors"
          >
            <p className="text-white/40 text-xs font-medium tracking-wider uppercase mb-2">
              {metric.label}
            </p>
            <p className="font-display text-2xl md:text-3xl font-bold text-teal-bio mb-1">
              {metric.value}
            </p>
            <p className="text-white/30 text-xs">{metric.unit}</p>
          </div>
        ))}
      </div>

      {/* 6-step pipeline */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-6 bg-gradient-to-b from-teal-bio to-cyan-electric rounded-full" />
          <h3 className="font-display text-xl font-semibold text-white">
            6-Step Pipeline
          </h3>
        </div>

        <div className="space-y-3">
          {pipeline.map((p, i) => (
            <div
              key={i}
              className="glow-border rounded-lg bg-ocean-deep/30 hover:bg-ocean-mid/50 transition-colors overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedStep(expandedStep === i ? null : i)
                }
                className="w-full px-6 py-4 flex items-start gap-4 text-left hover:opacity-80 transition-opacity"
              >
                {/* Step circle */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-bio to-cyan-electric flex items-center justify-center">
                  <span className="font-display font-bold text-ocean-black text-sm">
                    {p.step}
                  </span>
                </div>

                {/* Text content */}
                <div className="flex-grow">
                  <h4 className="font-display font-semibold text-white mb-1">
                    {p.title}
                  </h4>
                  <p className="text-white/40 text-sm">{p.description}</p>
                </div>

                {/* Expand arrow */}
                <div
                  className={`flex-shrink-0 text-teal-bio transition-transform ${
                    expandedStep === i ? 'rotate-180' : ''
                  }`}
                >
                  ↓
                </div>
              </button>

              {/* Expanded content */}
              {expandedStep === i && (
                <div className="px-6 pb-4 border-t border-white/5 bg-ocean-deep/20">
                  <p className="text-white/60 text-sm leading-relaxed font-mono">
                    {p.details}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ocean gradient accent */}
      <div className="relative mt-16 p-6 rounded-2xl bg-gradient-to-r from-teal-bio/5 to-cyan-electric/5 border border-white/5">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-20 h-20 rounded-full blur-2xl bg-teal-bio" />
          <div className="absolute bottom-0 right-1/4 w-24 h-24 rounded-full blur-2xl bg-cyan-electric" />
        </div>
        <div className="relative">
          <p className="text-white/60 text-sm leading-relaxed mb-3">
            <strong className="text-teal-bio">Interaction, not translation:</strong>{' '}
            This pipeline finds patterns, clusters sounds, and trains classifiers. It does not
            claim to decode dolphin meaning. It is the honest frontier.
          </p>
          <p className="text-white/40 text-xs">
            All weights, datasets, and training notebooks are published openly. Reproduce,
            audit, and build on what we have done.
          </p>
        </div>
      </div>
    </section>
  )
}
