'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * YouTubeGallery Component
 * 
 * Features:
 * - Grid display of YouTube video thumbnails
 * - Sequential autoplay (video loops, then next plays)
 * - Scroll-sync: highlights active video as user scrolls
 * - Keyboard navigation (arrow keys)
 * - Responsive layout (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - Placeholder support for videos without thumbnails
 */

export default function YouTubeGallery({ 
  videos = [], 
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  showTitles = true,
  autoplay = true,
  sequential = true,
  onVideoSelect = null
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const containerRef = useRef(null)
  const videoRefs = useRef([])

  // Populate with mock data if no videos provided
  const displayVideos = videos.length > 0 ? videos : getMockVideos()

  // Handle sequential autoplay
  useEffect(() => {
    if (!sequential || !isPlaying || displayVideos.length === 0) return

    const timer = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % displayVideos.length
      setActiveIndex(nextIndex)
      onVideoSelect?.(displayVideos[nextIndex], nextIndex)
    }, 8000) // 8 second per video

    return () => clearTimeout(timer)
  }, [activeIndex, isPlaying, displayVideos, sequential, onVideoSelect])

  // Intersection Observer for scroll-sync
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.indexOf(entry.target)
            if (index !== -1) {
              setActiveIndex(index)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex((i) => (i + 1) % displayVideos.length)
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((i) => (i - 1 + displayVideos.length) % displayVideos.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [displayVideos.length])

  const handleVideoClick = (video, index) => {
    setActiveIndex(index)
    setIsPlaying(false) // Pause autoplay on manual selection
    onVideoSelect?.(video, index)
  }

  const getColumnClass = () => {
    return `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`
  }

  return (
    <div className="w-full bg-ocean-deep rounded-2xl overflow-hidden">
      {/* Featured Player */}
      <div className="relative bg-black aspect-video mb-6">
        <iframe
          key={displayVideos[activeIndex]?.id}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${displayVideos[activeIndex]?.id}?autoplay=${isPlaying ? 1 : 0}&modestbranding=1&controls=1`}
          title="Featured Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0"
        />
      </div>

      {/* Video Info */}
      {showTitles && (
        <div className="px-6 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-teal-bio text-xs font-medium tracking-wider uppercase mb-2">
                {displayVideos[activeIndex]?.category || 'Finn & Echo'}
              </p>
              <h3 className="font-display text-xl font-bold text-white leading-snug mb-2">
                {displayVideos[activeIndex]?.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {displayVideos[activeIndex]?.description}
              </p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-teal-bio/20 text-teal-bio rounded-full text-sm font-semibold hover:bg-teal-bio/40 transition-colors"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i - 1 + displayVideos.length) % displayVideos.length)}
              className="px-4 py-2 border border-white/20 text-white/60 rounded-full text-sm hover:border-white/40 hover:text-white/80 transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i + 1) % displayVideos.length)}
              className="px-4 py-2 border border-white/20 text-white/60 rounded-full text-sm hover:border-white/40 hover:text-white/80 transition-colors"
            >
              Next →
            </button>
            <span className="ml-auto text-white/40 text-sm">
              {activeIndex + 1} / {displayVideos.length}
            </span>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="px-6 pb-6 border-t border-white/10">
        <p className="text-white/50 text-xs font-medium tracking-wider uppercase mb-4">All Videos</p>
        <div
          ref={containerRef}
          className={`grid gap-4 ${getColumnClass()}`}
        >
          {displayVideos.map((video, index) => (
            <div
              key={video.id}
              ref={(el) => {
                if (el) videoRefs.current[index] = el
              }}
              onClick={() => handleVideoClick(video, index)}
              className={`group relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                index === activeIndex
                  ? 'ring-2 ring-teal-bio scale-105'
                  : 'ring-1 ring-white/10 hover:ring-white/30'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative bg-black aspect-video overflow-hidden">
                <img
                  src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    index === activeIndex
                      ? 'bg-teal-bio text-ocean-black'
                      : 'bg-white/20 text-white group-hover:bg-teal-bio group-hover:text-ocean-black'
                  }`}>
                    ▶
                  </div>
                </div>
              </div>

              {/* Duration Badge */}
              {video.duration && (
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              )}

              {/* Title on Hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white text-xs font-semibold leading-tight line-clamp-2">
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="px-6 py-3 bg-ocean-mid/50 text-white/40 text-xs text-center">
        💡 Use arrow keys to navigate • Click to select • Videos autoplay sequentially
      </div>
    </div>
  )
}

/**
 * Mock data for demo/placeholder purposes
 * Replace with real YouTube video IDs when episodes are published
 */
function getMockVideos() {
  return [
    {
      id: 'dQw4w9WgXcQ', // Placeholder ID
      title: 'Coming Soon: Finn & Echo - Episode 1',
      description: 'The first episode of Finn & Echo — an AI-driven exploration of dolphin intelligence and communication.',
      category: 'Finn & Echo',
      thumbnail: null,
      duration: null
    },
    {
      id: 'jNQXAC9IVRw', // Placeholder ID
      title: 'The Science Behind Signature Whistles',
      description: 'Dolphins use individually unique whistles as names. Here is what 40 years of research tells us.',
      category: 'Research',
      thumbnail: null,
      duration: '12:34'
    },
    {
      id: '9bZkp7q19f0', // Placeholder ID
      title: 'DolphinGemma: AI Meets Cetacean Science',
      description: 'Google DeepMind's new model can classify dolphin vocalizations with unprecedented accuracy. What it means.',
      category: 'AI Models',
      thumbnail: null,
      duration: '8:45'
    },
    {
      id: 'kJQDxksysDw', // Placeholder ID
      title: 'Mirror Self-Recognition: What It Actually Proves',
      description: 'Dolphins pass the mirror test — one of only a handful of species that do. But what does that really tell us about dolphin intelligence?',
      category: 'Cognition',
      thumbnail: null,
      duration: '15:22'
    },
    {
      id: '9AzfapsCKAw', // Placeholder ID
      title: 'Inside the Wild Dolphin Project',
      description: 'Denise Herzing has been studying free-ranging dolphins off the Bahamas for 40+ years. Here is her story.',
      category: 'Field Research',
      thumbnail: null,
      duration: '22:10'
    },
    {
      id: 'L18DEdVLyVc', // Placeholder ID
      title: 'Echolocation: How Dolphins See With Sound',
      description: 'Dolphin biosonar is more sophisticated than human technology. A deep dive into how they perceive their world.',
      category: 'Bioacoustics',
      thumbnail: null,
      duration: '11:03'
    },
  ]
}
